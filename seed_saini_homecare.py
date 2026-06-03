from __future__ import annotations

import json
import os
import re
import shutil
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List


DB_PATH = Path(os.getenv("SAINI_DB_PATH", "saini_homecare.db"))


def normalize_slug(value: str) -> str:
    """Convert title or slug into a clean URL-friendly slug."""
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def create_backup() -> None:
    """Create a backup before updating an existing database."""
    if not DB_PATH.exists():
        return

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = DB_PATH.with_suffix(f".backup_{timestamp}.db")
    shutil.copy2(DB_PATH, backup_path)
    print(f"Backup created: {backup_path}")


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def setup_database() -> None:
    """Create tables only when they do not already exist."""
    connection = get_connection()

    try:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS categories (
                slug TEXT PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                description TEXT NOT NULL,
                icon TEXT NOT NULL,
                display_order INTEGER NOT NULL DEFAULT 0,
                active INTEGER NOT NULL DEFAULT 1,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS services (
                slug TEXT PRIMARY KEY,
                category TEXT NOT NULL,
                title TEXT NOT NULL UNIQUE,
                image TEXT NOT NULL,
                icon TEXT NOT NULL,
                price_text TEXT NOT NULL,
                base_price INTEGER,
                duration TEXT NOT NULL,
                short_description TEXT NOT NULL,
                detailed_description TEXT NOT NULL,
                whats_included_json TEXT NOT NULL,
                add_ons_json TEXT NOT NULL,
                exclusions_json TEXT NOT NULL,
                pricing_disclaimer TEXT NOT NULL,
                cta_text TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1,
                featured INTEGER NOT NULL DEFAULT 0,
                display_order INTEGER NOT NULL DEFAULT 0,
                verified_rating REAL,
                reviews_count INTEGER NOT NULL DEFAULT 0,
                is_suggested INTEGER NOT NULL DEFAULT 0,
                metadata_json TEXT NOT NULL DEFAULT '{}',
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS platform_settings (
                setting_key TEXT PRIMARY KEY,
                setting_json TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS seed_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_part TEXT NOT NULL,
                inserted_or_updated_records INTEGER NOT NULL,
                run_at TEXT NOT NULL
            );
            """
        )

        connection.commit()
        print("Database setup completed successfully.")

    finally:
        connection.close()


def validate_category(category: Dict[str, Any]) -> None:
    required_fields = ["slug", "name", "description", "icon", "display_order"]

    for field in required_fields:
        if field not in category or category[field] in ("", None):
            raise ValueError(
                f"Category validation failed: missing field '{field}'"
            )

    if normalize_slug(category["slug"]) != category["slug"]:
        raise ValueError(
            f"Category slug is not valid: {category['slug']}"
        )


def validate_service(service: Dict[str, Any]) -> None:
    required_fields = [
        "slug",
        "category",
        "title",
        "image",
        "icon",
        "price_text",
        "duration",
        "short_description",
        "detailed_description",
        "whats_included",
        "add_ons",
        "exclusions",
        "pricing_disclaimer",
        "cta_text",
    ]

    for field in required_fields:
        if field not in service:
            raise ValueError(
                f"{service.get('slug', 'unknown-service')}: missing field '{field}'"
            )

    if normalize_slug(service["slug"]) != service["slug"]:
        raise ValueError(
            f"{service['slug']}: slug format is invalid"
        )

    if not service["image"].startswith("/images/"):
        raise ValueError(
            f"{service['slug']}: image path must start with /images/"
        )

    if service.get("base_price") is not None and service["base_price"] < 0:
        raise ValueError(
            f"{service['slug']}: base price cannot be negative"
        )

    if not service["whats_included"]:
        raise ValueError(
            f"{service['slug']}: at least one included item is required"
        )

    rating = service.get("verified_rating")
    reviews = service.get("reviews_count", 0)

    if rating is not None and not 0 <= rating <= 5:
        raise ValueError(
            f"{service['slug']}: rating must be between 0 and 5"
        )

    if reviews < 0:
        raise ValueError(
            f"{service['slug']}: review count cannot be negative"
        )

    if reviews > 0 and rating is None:
        raise ValueError(
            f"{service['slug']}: reviews exist but verified rating is missing"
        )

    if rating is not None and reviews == 0:
        raise ValueError(
            f"{service['slug']}: rating exists but verified reviews are missing"
        )

    if (
        service.get("metadata", {}).get("requires_authorization")
        and not service.get("metadata", {}).get("authorized")
        and service.get("active", False)
    ):
        raise ValueError(
            f"{service['slug']}: safety-sensitive service cannot be active"
        )

    include_items = service["whats_included"]
    if len(include_items) != len(set(include_items)):
        raise ValueError(
            f"{service['slug']}: duplicate included item detected"
        )

    addon_names = [item["name"] for item in service["add_ons"]]
    if len(addon_names) != len(set(addon_names)):
        raise ValueError(
            f"{service['slug']}: duplicate add-on detected"
        )


def upsert_categories(categories: List[Dict[str, Any]]) -> None:
    """Insert new categories or update matching categories safely."""
    seen_slugs = set()
    seen_names = set()

    for category in categories:
        validate_category(category)

        if category["slug"] in seen_slugs:
            raise ValueError(
                f"Duplicate category slug in current batch: {category['slug']}"
            )

        if category["name"] in seen_names:
            raise ValueError(
                f"Duplicate category name in current batch: {category['name']}"
            )

        seen_slugs.add(category["slug"])
        seen_names.add(category["name"])

    connection = get_connection()
    now = datetime.now().isoformat(timespec="seconds")

    try:
        with connection:
            for category in categories:
                connection.execute(
                    """
                    INSERT INTO categories (
                        slug, name, description, icon,
                        display_order, active, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(slug) DO UPDATE SET
                        name = excluded.name,
                        description = excluded.description,
                        icon = excluded.icon,
                        display_order = excluded.display_order,
                        active = excluded.active,
                        updated_at = excluded.updated_at
                    """,
                    (
                        category["slug"],
                        category["name"],
                        category["description"],
                        category["icon"],
                        category["display_order"],
                        int(category.get("active", True)),
                        now,
                    ),
                )

        print(f"Categories inserted or updated: {len(categories)}")

    finally:
        connection.close()


def upsert_services(
    services: List[Dict[str, Any]],
    source_part: str,
) -> None:
    """
    Insert new services or update matching services.

    Duplicate slug or duplicate title records are blocked.
    Old records are not deleted automatically.
    """
    seen_slugs = set()
    seen_titles = set()

    for service in services:
        validate_service(service)

        if service["slug"] in seen_slugs:
            raise ValueError(
                f"Duplicate service slug in current batch: {service['slug']}"
            )

        if service["title"] in seen_titles:
            raise ValueError(
                f"Duplicate service title in current batch: {service['title']}"
            )

        seen_slugs.add(service["slug"])
        seen_titles.add(service["title"])

    connection = get_connection()
    now = datetime.now().isoformat(timespec="seconds")

    try:
        with connection:
            for service in services:
                existing_title = connection.execute(
                    """
                    SELECT slug
                    FROM services
                    WHERE title = ? AND slug != ?
                    """,
                    (service["title"], service["slug"]),
                ).fetchone()

                if existing_title:
                    raise ValueError(
                        f"Duplicate title blocked: '{service['title']}' "
                        f"already exists with slug '{existing_title['slug']}'"
                    )

                connection.execute(
                    """
                    INSERT INTO services (
                        slug,
                        category,
                        title,
                        image,
                        icon,
                        price_text,
                        base_price,
                        duration,
                        short_description,
                        detailed_description,
                        whats_included_json,
                        add_ons_json,
                        exclusions_json,
                        pricing_disclaimer,
                        cta_text,
                        active,
                        featured,
                        display_order,
                        verified_rating,
                        reviews_count,
                        is_suggested,
                        metadata_json,
                        updated_at
                    )
                    VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )
                    ON CONFLICT(slug) DO UPDATE SET
                        category = excluded.category,
                        title = excluded.title,
                        image = excluded.image,
                        icon = excluded.icon,
                        price_text = excluded.price_text,
                        base_price = excluded.base_price,
                        duration = excluded.duration,
                        short_description = excluded.short_description,
                        detailed_description = excluded.detailed_description,
                        whats_included_json = excluded.whats_included_json,
                        add_ons_json = excluded.add_ons_json,
                        exclusions_json = excluded.exclusions_json,
                        pricing_disclaimer = excluded.pricing_disclaimer,
                        cta_text = excluded.cta_text,
                        active = excluded.active,
                        featured = excluded.featured,
                        display_order = excluded.display_order,
                        verified_rating = excluded.verified_rating,
                        reviews_count = excluded.reviews_count,
                        is_suggested = excluded.is_suggested,
                        metadata_json = excluded.metadata_json,
                        updated_at = excluded.updated_at
                    """,
                    (
                        service["slug"],
                        service["category"],
                        service["title"],
                        service["image"],
                        service["icon"],
                        service["price_text"],
                        service.get("base_price"),
                        service["duration"],
                        service["short_description"],
                        service["detailed_description"],
                        json.dumps(service["whats_included"], ensure_ascii=False),
                        json.dumps(service["add_ons"], ensure_ascii=False),
                        json.dumps(service["exclusions"], ensure_ascii=False),
                        service["pricing_disclaimer"],
                        service["cta_text"],
                        int(service.get("active", True)),
                        int(service.get("featured", False)),
                        service.get("display_order", 0),
                        service.get("verified_rating"),
                        service.get("reviews_count", 0),
                        int(service.get("is_suggested", False)),
                        json.dumps(
                            service.get("metadata", {}),
                            ensure_ascii=False,
                        ),
                        now,
                    ),
                )

            connection.execute(
                """
                INSERT INTO seed_logs (
                    source_part,
                    inserted_or_updated_records,
                    run_at
                )
                VALUES (?, ?, ?)
                """,
                (source_part, len(services), now),
            )

        print(
            f"Services inserted or updated safely: {len(services)} "
            f"from {source_part}"
        )

    finally:
        connection.close()


def verify_database() -> None:
    """Run final checks to confirm duplicate records were not inserted."""
    connection = get_connection()

    try:
        duplicate_slugs = connection.execute(
            """
            SELECT slug, COUNT(*) AS count
            FROM services
            GROUP BY slug
            HAVING COUNT(*) > 1
            """
        ).fetchall()

        duplicate_titles = connection.execute(
            """
            SELECT title, COUNT(*) AS count
            FROM services
            GROUP BY title
            HAVING COUNT(*) > 1
            """
        ).fetchall()

        total_services = connection.execute(
            "SELECT COUNT(*) AS count FROM services"
        ).fetchone()["count"]

        if duplicate_slugs or duplicate_titles:
            raise RuntimeError(
                "Database verification failed: duplicate services detected"
            )

        print("Database verification passed.")
        print(f"Current total services: {total_services}")
        print("Duplicate slugs: 0")
        print("Duplicate titles: 0")

    finally:
        connection.close()


if __name__ == "__main__":
    create_backup()
    setup_database()
    verify_database()

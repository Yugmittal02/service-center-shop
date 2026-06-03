import json
from datetime import datetime

from seed_common import (
    get_connection,
    upsert_categories,
    verify_database,
)


CATEGORIES = [
    {
        "slug": "ac-services",
        "name": "AC Services",
        "description": (
            "AC installation, routine servicing, deep cleaning, "
            "repair and seasonal maintenance."
        ),
        "icon": "snowflake",
        "display_order": 1,
        "active": True,
    },
    {
        "slug": "appliance-repair",
        "name": "Appliance Repair",
        "description": (
            "Repair and maintenance support for essential "
            "home appliances."
        ),
        "icon": "wrench",
        "display_order": 2,
        "active": True,
    },
    {
        "slug": "geyser-services",
        "name": "Geyser Services",
        "description": (
            "Geyser installation, inspection and repair support."
        ),
        "icon": "flame",
        "display_order": 3,
        "active": True,
    },
    {
        "slug": "ro-water-purifier",
        "name": "RO & Water Purifier",
        "description": (
            "RO installation, basic servicing and filter-support services."
        ),
        "icon": "droplet",
        "display_order": 4,
        "active": False,
    },
    {
        "slug": "electrical-services",
        "name": "Electrical Services",
        "description": (
            "Electrical fitting, repair, wiring and basic safety checks."
        ),
        "icon": "zap",
        "display_order": 5,
        "active": True,
    },
    {
        "slug": "safety-infrastructure",
        "name": "Safety & Infrastructure",
        "description": (
            "Site-based inspection services for safety-sensitive work."
        ),
        "icon": "shield",
        "display_order": 6,
        "active": False,
    },
    {
        "slug": "commercial-services",
        "name": "Commercial Services",
        "description": (
            "Inspection and maintenance support for shops "
            "and small businesses."
        ),
        "icon": "building",
        "display_order": 7,
        "active": False,
    },
    {
        "slug": "amc-plans",
        "name": "AMC Plans",
        "description": (
            "Preventive-maintenance plans for selected appliances."
        ),
        "icon": "calendar-check",
        "display_order": 8,
        "active": False,
    },
]


WEBSITE_SETTINGS = {
    "brand_name": "Saini HomeCare",
    "hero": {
        "heading": "Trusted Home Services at Your Doorstep",
        "subheading": (
            "Book reliable AC, appliance and electrical services "
            "with clear estimates before work begins."
        ),
        "primary_cta": "Book a Service",
        "secondary_cta": "WhatsApp Us",
        "search_placeholder": (
            "Search AC service, refrigerator repair, electrician..."
        ),
    },
    "homepage_sections": [
        "Featured Services",
        "Browse by Category",
        "How It Works",
        "Why Choose Us",
        "Need Help Choosing a Service?",
        "Transparent Pricing",
        "Frequently Asked Questions",
        "Customer Support",
    ],
    "trust_badges": [
        "Clear estimate before work begins",
        "Doorstep service",
        "Multiple home-service categories",
        "Easy booking through website, call or WhatsApp",
        "Additional charges confirmed before work starts",
    ],
    "why_choose_us": [
        {
            "title": "Transparent Pricing",
            "description": (
                "Final labour and material estimates are shared "
                "before additional work begins."
            ),
        },
        {
            "title": "Doorstep Support",
            "description": (
                "Book convenient home-service visits according "
                "to technician availability."
            ),
        },
        {
            "title": "Multiple Services",
            "description": (
                "Find AC, appliance and electrical support "
                "in one place."
            ),
        },
        {
            "title": "Easy Booking",
            "description": (
                "Book through the website, phone call or WhatsApp."
            ),
        },
    ],
    "how_it_works": [
        {
            "step": 1,
            "title": "Choose a Service",
            "description": "Select the service that matches your requirement.",
        },
        {
            "step": 2,
            "title": "Share Your Details",
            "description": (
                "Enter your address, preferred time and issue details."
            ),
        },
        {
            "step": 3,
            "title": "Receive Confirmation",
            "description": (
                "Our team reviews your request and confirms the visit."
            ),
        },
        {
            "step": 4,
            "title": "Approve the Estimate",
            "description": (
                "Additional repair or material cost is shared before work begins."
            ),
        },
    ],
    "booking_flow": {
        "steps": [
            "Select Service",
            "Enter Address",
            "Choose Preferred Slot",
            "Confirm Details",
            "Receive Confirmation",
        ],
        "required_fields": [
            "customer_name",
            "mobile_number",
            "service_slug",
            "address",
            "preferred_date",
            "preferred_time_slot",
        ],
        "optional_fields": [
            "alternate_mobile_number",
            "issue_description",
            "image_upload",
            "coupon_code",
        ],
        "booking_statuses": [
            "pending",
            "confirmed",
            "technician_assigned",
            "technician_on_the_way",
            "arrived",
            "in_progress",
            "completed",
            "cancelled",
        ],
    },
    "support_channels": [
        "Website Booking",
        "Phone Call",
        "WhatsApp",
    ],
    "pricing_disclaimer": (
        "Displayed price basic labour charge ke liye hai. "
        "Spare parts, materials, additional work and complex repairs "
        "are charged separately after customer approval."
    ),
    "footer_disclaimer": (
        "Saini HomeCare provides repair, installation and maintenance "
        "support through available technicians. Final pricing may vary "
        "according to appliance condition, spare-parts requirement, "
        "material usage, location and work complexity. Any additional "
        "cost will be communicated before work begins."
    ),
    "legal_pages_required": [
        "Privacy Policy",
        "Terms & Conditions",
        "Cancellation Policy",
        "Refund Policy",
        "Contact Us",
    ],
}


def upsert_platform_setting(
    setting_key: str,
    setting_value: dict,
) -> None:
    connection = get_connection()
    now = datetime.now().isoformat(timespec="seconds")

    try:
        with connection:
            connection.execute(
                """
                INSERT INTO platform_settings (
                    setting_key,
                    setting_json,
                    updated_at
                )
                VALUES (?, ?, ?)
                ON CONFLICT(setting_key) DO UPDATE SET
                    setting_json = excluded.setting_json,
                    updated_at = excluded.updated_at
                """,
                (
                    setting_key,
                    json.dumps(
                        setting_value,
                        ensure_ascii=False,
                    ),
                    now,
                ),
            )

        print(
            f"Platform setting inserted or updated safely: "
            f"{setting_key}"
        )

    finally:
        connection.close()


if __name__ == "__main__":
    upsert_categories(CATEGORIES)

    upsert_platform_setting(
        setting_key="website_settings",
        setting_value=WEBSITE_SETTINGS,
    )

    verify_database()

    print("Part 9 completed successfully.")

import json
from datetime import datetime

from seed_common import (
    get_connection,
    verify_database,
)


ADMIN_SETTINGS = {
    "admin_panel": {
        "panel_name": "Saini HomeCare Admin",
        "layout": "responsive-dashboard",
        "mobile_friendly": True,
        "use_card_layout": True,
        "mobile_grid": "2-columns-where-suitable",
        "confirm_before_delete": True,
        "prefer_soft_disable": True,
    },

    "tabs": [
        {
            "key": "dashboard",
            "label": "Dashboard",
            "icon": "layout-dashboard",
            "enabled": True,
            "display_order": 1,
        },
        {
            "key": "bookings",
            "label": "Bookings",
            "icon": "calendar-check",
            "enabled": True,
            "display_order": 2,
        },
        {
            "key": "customers",
            "label": "Customers",
            "icon": "users",
            "enabled": True,
            "display_order": 3,
        },
        {
            "key": "technicians",
            "label": "Technicians",
            "icon": "user-cog",
            "enabled": True,
            "display_order": 4,
        },
        {
            "key": "services",
            "label": "Services",
            "icon": "wrench",
            "enabled": True,
            "display_order": 5,
        },
        {
            "key": "categories",
            "label": "Categories",
            "icon": "grid",
            "enabled": True,
            "display_order": 6,
        },
        {
            "key": "service_areas",
            "label": "Service Areas",
            "icon": "map-pin",
            "enabled": True,
            "display_order": 7,
        },
        {
            "key": "pricing_rules",
            "label": "Pricing Rules",
            "icon": "indian-rupee",
            "enabled": True,
            "display_order": 8,
        },
        {
            "key": "payments",
            "label": "Payments",
            "icon": "wallet",
            "enabled": True,
            "display_order": 9,
        },
        {
            "key": "offers",
            "label": "Coupons & Offers",
            "icon": "badge-percent",
            "enabled": True,
            "display_order": 10,
        },
        {
            "key": "reviews",
            "label": "Reviews",
            "icon": "star",
            "enabled": True,
            "display_order": 11,
        },
        {
            "key": "complaints",
            "label": "Complaints",
            "icon": "message-circle-warning",
            "enabled": True,
            "display_order": 12,
        },
        {
            "key": "notifications",
            "label": "Notifications",
            "icon": "bell",
            "enabled": True,
            "display_order": 13,
        },
        {
            "key": "website_content",
            "label": "Website Content",
            "icon": "panel-top",
            "enabled": True,
            "display_order": 14,
        },
        {
            "key": "reports",
            "label": "Reports",
            "icon": "chart-no-axes-combined",
            "enabled": True,
            "display_order": 15,
        },
        {
            "key": "audit_logs",
            "label": "Audit Logs",
            "icon": "history",
            "enabled": True,
            "display_order": 16,
        },
        {
            "key": "settings",
            "label": "Settings",
            "icon": "settings",
            "enabled": True,
            "display_order": 17,
        },
    ],

    "dashboard_metrics": [
        {
            "key": "total_bookings",
            "label": "Total Bookings",
            "icon": "calendar-check",
            "enabled": True,
        },
        {
            "key": "today_bookings",
            "label": "Today's Bookings",
            "icon": "calendar-days",
            "enabled": True,
        },
        {
            "key": "pending_bookings",
            "label": "Pending Bookings",
            "icon": "clock",
            "enabled": True,
        },
        {
            "key": "confirmed_bookings",
            "label": "Confirmed Bookings",
            "icon": "circle-check",
            "enabled": True,
        },
        {
            "key": "completed_bookings",
            "label": "Completed Bookings",
            "icon": "badge-check",
            "enabled": True,
        },
        {
            "key": "cancelled_bookings",
            "label": "Cancelled Bookings",
            "icon": "circle-x",
            "enabled": True,
        },
        {
            "key": "total_customers",
            "label": "Total Customers",
            "icon": "users",
            "enabled": True,
        },
        {
            "key": "active_technicians",
            "label": "Active Technicians",
            "icon": "user-check",
            "enabled": True,
        },
        {
            "key": "total_revenue",
            "label": "Total Revenue",
            "icon": "indian-rupee",
            "enabled": True,
        },
        {
            "key": "pending_payments",
            "label": "Pending Payments",
            "icon": "wallet-cards",
            "enabled": True,
        },
        {
            "key": "open_complaints",
            "label": "Open Complaints",
            "icon": "message-circle-warning",
            "enabled": True,
        },
        {
            "key": "top_services",
            "label": "Top Services",
            "icon": "trending-up",
            "enabled": True,
        },
    ],

    "booking_management": {
        "statuses": [
            "pending",
            "confirmed",
            "technician_assigned",
            "technician_on_the_way",
            "arrived",
            "in_progress",
            "completed",
            "cancelled",
        ],

        "allowed_status_transitions": {
            "pending": [
                "confirmed",
                "cancelled",
            ],
            "confirmed": [
                "technician_assigned",
                "cancelled",
            ],
            "technician_assigned": [
                "technician_on_the_way",
                "cancelled",
            ],
            "technician_on_the_way": [
                "arrived",
                "cancelled",
            ],
            "arrived": [
                "in_progress",
                "cancelled",
            ],
            "in_progress": [
                "completed",
            ],
            "completed": [],
            "cancelled": [],
        },

        "required_fields": [
            "booking_id",
            "customer_name",
            "mobile_number",
            "service_slug",
            "address",
            "preferred_date",
            "preferred_time_slot",
            "status",
            "created_at",
        ],

        "optional_fields": [
            "alternate_mobile_number",
            "issue_description",
            "problem_image",
            "assigned_technician_id",
            "labour_charge",
            "parts_charge",
            "material_charge",
            "discount_amount",
            "payment_status",
            "payment_mode",
            "internal_notes",
            "customer_notes",
        ],

        "pricing_breakdown_fields": [
            "labour_charge",
            "parts_charge",
            "material_charge",
            "transportation_charge",
            "discount_amount",
            "final_amount",
        ],

        "rules": [
            "Final amount must not be negative.",
            "Additional repair cost must be approved before work begins.",
            "Parts and material charges must be stored separately from labour charge.",
            "Completed bookings cannot be edited without admin permission.",
            "Cancelled bookings must include a cancellation reason.",
            "Every booking status change must be logged.",
        ],
    },

    "service_management": {
        "required_fields": [
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
            "pricing_disclaimer",
            "cta_text",
            "active",
            "featured",
            "display_order",
        ],

        "optional_fields": [
            "base_price",
            "add_ons",
            "exclusions",
            "service_areas",
            "verified_rating",
            "reviews_count",
            "is_suggested",
            "metadata",
        ],

        "rules": [
            "Do not allow duplicate service slug.",
            "Do not allow duplicate service title.",
            "Do not allow negative pricing.",
            "Do not publish fake ratings or fake review counts.",
            "Use actual verified customer reviews only.",
            "Keep additional parts and materials separate from labour pricing.",
            "Use soft-disable instead of permanent deletion wherever possible.",
            "Require confirmation before activating suggested services.",
            "Require authorization before activating safety-sensitive services.",
        ],
    },

    "roles_and_permissions": {
        "admin": {
            "label": "Admin",
            "permissions": [
                "full_access",
            ],
        },

        "manager": {
            "label": "Manager",
            "permissions": [
                "view_dashboard",
                "view_bookings",
                "create_booking",
                "update_booking",
                "assign_technician",
                "view_customers",
                "manage_services",
                "view_reports",
                "manage_complaints",
            ],
        },

        "technician": {
            "label": "Technician",
            "permissions": [
                "view_own_assigned_jobs",
                "update_own_assigned_job_status",
                "view_customer_details_after_assignment",
                "add_service_notes",
                "view_own_earnings",
            ],
        },

        "customer": {
            "label": "Customer",
            "permissions": [
                "create_booking",
                "view_own_bookings",
                "cancel_eligible_own_booking",
                "manage_own_profile",
                "submit_verified_review",
                "create_complaint",
            ],
        },
    },

    "security_rules": [
        "Enforce role permissions on the backend, not only in the frontend.",
        "A customer must only access their own booking records.",
        "A technician must only access jobs assigned to them.",
        "Require authentication for admin and technician portals.",
        "Validate all user input on the backend.",
        "Rate-limit login, booking, review and complaint submissions.",
        "Do not expose API keys or secrets in frontend code.",
        "Log sensitive admin actions safely.",
        "Use soft-disable instead of deleting important records.",
    ],

    "recommended_filters": {
        "bookings": [
            "status",
            "service",
            "preferred_date",
            "assigned_technician",
            "payment_status",
            "customer_mobile",
        ],
        "services": [
            "category",
            "active",
            "featured",
            "suggested",
        ],
        "customers": [
            "name",
            "mobile_number",
            "booking_count",
        ],
        "technicians": [
            "name",
            "mobile_number",
            "availability",
            "active",
        ],
    },
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
    upsert_platform_setting(
        setting_key="admin_settings",
        setting_value=ADMIN_SETTINGS,
    )

    verify_database()

    print("Part 10 completed successfully.")

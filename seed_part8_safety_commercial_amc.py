from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed information initial inspection ke liye hai. Final labour charge, "
    "material cost, spare parts, accessories, civil work aur additional requirements "
    "site inspection ke baad separately confirm ki jayengi. Work customer approval "
    "ke baad hi start hoga."
)


SAFETY_COMMERCIAL_AMC_SERVICES = [
    {
        "slug": "chemical-earthing-inspection",
        "category": "Safety & Infrastructure",
        "title": "Chemical Earthing Inspection",
        "image": "/images/service_earthing.png",
        "icon": "shield-zap",
        "price_text": "Site inspection required",
        "base_price": None,
        "duration": "Depends on site requirements",
        "short_description": (
            "Site inspection and quotation for residential "
            "or commercial chemical-earthing requirements."
        ),
        "detailed_description": (
            "Book a site inspection for chemical-earthing requirements. "
            "The technician reviews the existing electrical setup, property type "
            "and safety requirements before sharing a labour and material quotation."
        ),
        "whats_included": [
            "Site inspection",
            "Existing earthing setup review",
            "Basic safety assessment",
            "Requirement discussion",
            "Material requirement list",
            "Labour quotation before work begins",
        ],
        "add_ons": [
            {
                "name": "Chemical-earthing installation",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Electrical-safety inspection",
                "price_text": "On demand",
            },
            {
                "name": "Additional earthing point",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Earthing material",
            "Installation labour unless quoted",
            "Civil work",
            "Industrial-scale work unless separately confirmed",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Request Site Inspection",
        "active": False,
        "featured": False,
        "display_order": 28,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate only after confirming technician expertise, "
                "pricing policy and service areas."
            )
        },
    },
    {
        "slug": "lpg-piping-inspection",
        "category": "Safety & Infrastructure",
        "title": "LPG Piping Inspection",
        "image": "/images/service_lpg.png",
        "icon": "flame",
        "price_text": "Site inspection required",
        "base_price": None,
        "duration": "Depends on site requirements",
        "short_description": (
            "LPG-piping requirement assessment by trained "
            "and authorized personnel only."
        ),
        "detailed_description": (
            "LPG piping is a safety-sensitive service. Keep this module inactive "
            "until trained and authorized personnel are available. A site inspection "
            "and separate quotation are required before any work begins."
        ),
        "whats_included": [
            "Site inspection",
            "Requirement assessment",
            "Basic safety review",
            "Installation feasibility discussion",
            "Quotation before work begins",
        ],
        "add_ons": [
            {
                "name": "Authorized LPG-piping installation",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Additional piping material",
                "price_text": "Material charge extra",
            },
        ],
        "exclusions": [
            "Unauthorized LPG modification",
            "Material cost",
            "Installation labour unless quoted",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Request LPG Piping Inspection",
        "active": False,
        "featured": False,
        "display_order": 29,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "requires_authorization": True,
            "authorized": False,
            "safety_note": (
                "Never activate this service unless trained and authorized "
                "personnel are available."
            ),
        },
    },
    {
        "slug": "commercial-refrigeration-inspection",
        "category": "Commercial Services",
        "title": "Commercial Refrigeration Inspection",
        "image": "/images/service_commercial_refrigeration.png",
        "icon": "building",
        "price_text": "Site inspection required",
        "base_price": None,
        "duration": "Depends on equipment and work scope",
        "short_description": (
            "Inspection and quotation for commercial refrigeration "
            "systems used by shops and businesses."
        ),
        "detailed_description": (
            "Suitable for shops, restaurants, bakeries and small commercial spaces. "
            "The technician inspects the equipment and shares a maintenance or repair "
            "quotation according to the actual requirement."
        ),
        "whats_included": [
            "Commercial-site visit",
            "Basic refrigeration-system inspection",
            "Cooling-performance review",
            "Visible-leakage inspection",
            "Requirement assessment",
            "Repair or maintenance quotation",
        ],
        "add_ons": [
            {
                "name": "Preventive-maintenance plan",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Gas charging",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Spare-parts replacement",
                "price_text": "Parts charge extra",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Major commercial overhaul",
            "Gas charging unless quoted",
            "Transportation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Request Site Inspection",
        "active": False,
        "featured": False,
        "display_order": 30,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming commercial-service scope "
                "and technician availability."
            )
        },
    },
    {
        "slug": "home-appliance-amc-consultation",
        "category": "AMC Plans",
        "title": "Home Appliance AMC Consultation",
        "image": "/images/service_home_amc.png",
        "icon": "calendar-check",
        "price_text": "Plan quotation after requirement review",
        "base_price": None,
        "duration": "15–30 minutes consultation",
        "short_description": (
            "Create a preventive-maintenance plan "
            "for selected home appliances."
        ),
        "detailed_description": (
            "Suitable for households that want scheduled maintenance and priority "
            "support for selected appliances. The team reviews your appliances "
            "and recommends a suitable annual-maintenance plan."
        ),
        "whats_included": [
            "Requirement discussion",
            "Selected-appliance list review",
            "Maintenance-frequency recommendation",
            "Plan-coverage explanation",
            "AMC quotation",
        ],
        "add_ons": [
            {
                "name": "Priority visit support",
                "price_text": "According to selected plan",
            },
            {
                "name": "Scheduled service reminders",
                "price_text": "According to selected plan",
            },
            {
                "name": "Additional appliance coverage",
                "price_text": "According to selected plan",
            },
        ],
        "exclusions": [
            "Repair labour unless included in the plan",
            "Spare parts",
            "Material cost",
            "Emergency visit unless included in the plan",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book AMC Consultation",
        "active": False,
        "featured": False,
        "display_order": 31,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate only after finalizing AMC packages, coverage rules "
                "and renewal policy."
            )
        },
    },
]


if __name__ == "__main__":
    upsert_services(
        services=SAFETY_COMMERCIAL_AMC_SERVICES,
        source_part="part-8-safety-commercial-amc-services",
    )

    verify_database()

    print("Part 8 completed successfully.")

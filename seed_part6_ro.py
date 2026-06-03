from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Filters, membrane, "
    "pipes, pump, electrical accessories aur additional materials ka charge "
    "inspection ke baad separately confirm kiya jayega. Technician work start "
    "karne se pehle final estimate share karega."
)


RO_SERVICES = [
    {
        "slug": "ro-water-purifier-service",
        "category": "RO & Water Purifier",
        "title": "RO / Water Purifier Service",
        "image": "/images/service_ro.png",
        "icon": "droplet",
        "price_text": "Starts at ₹499",
        "base_price": 499,
        "duration": "45–90 minutes",
        "short_description": (
            "Basic RO servicing, filter inspection, leakage check "
            "and water-flow testing."
        ),
        "detailed_description": (
            "Book a technician for routine RO or water-purifier servicing. "
            "The technician performs a basic inspection, checks visible leakage, "
            "reviews water flow and explains any filter, membrane or spare-part "
            "replacement requirement before starting additional work."
        ),
        "whats_included": [
            "Basic water-purifier inspection",
            "Visible-leakage check",
            "Basic cleaning support",
            "Water-flow inspection",
            "Existing pipe-connection check",
            "Filter-condition inspection",
            "Maintenance recommendation",
        ],
        "add_ons": [
            {
                "name": "Filter replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Membrane replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Pump inspection or replacement",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "External pre-filter installation",
                "price_text": "Material charge extra",
            },
        ],
        "exclusions": [
            "New filters",
            "RO membrane",
            "Pump replacement",
            "New pipes",
            "External plumbing changes",
            "Electrical-point installation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book RO Service",
        "active": False,
        "featured": False,
        "display_order": 19,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming technician availability, "
                "service areas and filter-replacement pricing."
            )
        },
    },
    {
        "slug": "ro-installation",
        "category": "RO & Water Purifier",
        "title": "RO Installation",
        "image": "/images/service_ro_installation.png",
        "icon": "droplet",
        "price_text": "Starts at ₹799",
        "base_price": 799,
        "duration": "60–120 minutes",
        "short_description": (
            "RO installation support with mounting, connection checks "
            "and basic functionality testing."
        ),
        "detailed_description": (
            "Book installation support for a new or relocated RO water purifier. "
            "The technician checks the existing water inlet, drainage setup and "
            "electrical point before installation. Any new plumbing work or material "
            "requirement will be quoted separately."
        ),
        "whats_included": [
            "RO mounting support",
            "Existing water-inlet connection check",
            "Existing drainage connection check",
            "Existing electrical-point check",
            "Basic inlet and outlet setup",
            "Water-flow testing",
            "Basic functionality test",
        ],
        "add_ons": [
            {
                "name": "Pipe extension",
                "price_text": "Material charge extra",
            },
            {
                "name": "New water-inlet point",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Drain-pipe extension",
                "price_text": "Material charge extra",
            },
            {
                "name": "External pre-filter installation",
                "price_text": "Material charge extra",
            },
            {
                "name": "RO relocation",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "New plumbing point",
            "New electrical point",
            "Pipes and fittings",
            "Civil work",
            "RO machine",
            "Filter replacement",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book RO Installation",
        "active": False,
        "featured": False,
        "display_order": 20,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming installation pricing "
                "and technician availability."
            )
        },
    },
]


if __name__ == "__main__":
    upsert_services(
        services=RO_SERVICES,
        source_part="part-6-ro-water-purifier-services",
    )

    verify_database()

    print("Part 6 completed successfully.")

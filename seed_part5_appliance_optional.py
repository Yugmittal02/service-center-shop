from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Spare parts, "
    "additional materials aur major repair ka charge inspection ke baad "
    "separately confirm kiya jayega. Technician work start karne se pehle "
    "final estimate share karega."
)


OPTIONAL_APPLIANCE_SERVICES = [
    {
        "slug": "washing-machine-installation",
        "category": "Appliance Repair",
        "title": "Washing Machine Installation",
        "image": "/images/service_washing_installation.png",
        "icon": "washing-machine",
        "price_text": "Starts at ₹499",
        "base_price": 499,
        "duration": "45–90 minutes",
        "short_description": (
            "Washing-machine setup, inlet connection check "
            "and basic functionality testing."
        ),
        "detailed_description": (
            "Book installation support for a new or relocated washing machine. "
            "The technician checks the existing inlet, drainage and power setup "
            "before performing a basic test run."
        ),
        "whats_included": [
            "Machine placement support",
            "Existing inlet-pipe connection check",
            "Existing drainage connection check",
            "Existing electrical-point check",
            "Basic test run",
        ],
        "add_ons": [
            {
                "name": "Inlet-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Drain-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Washing-machine stand installation",
                "price_text": "On demand",
            },
            {
                "name": "New plumbing point",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "New plumbing point",
            "New electrical point",
            "Pipes and accessories",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Washing Machine Installation",
        "active": False,
        "featured": False,
        "display_order": 15,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming installation pricing and service availability."
            )
        },
    },
    {
        "slug": "microwave-repair",
        "category": "Appliance Repair",
        "title": "Microwave Repair",
        "image": "/images/service_microwave.png",
        "icon": "microwave",
        "price_text": "Technician visit starts at ₹399",
        "base_price": 399,
        "duration": "45–90 minutes",
        "short_description": (
            "Inspection and repair support for common microwave "
            "heating or power-related issues."
        ),
        "detailed_description": (
            "Book a technician for microwave problems such as heating faults, "
            "power issues or unusual operation. The final repair estimate "
            "will be shared after inspection."
        ),
        "whats_included": [
            "Technician visit",
            "Basic microwave inspection",
            "Power-related issue assessment",
            "Heating-performance check",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Minor repair labour",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Part replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Workshop repair",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Major component replacement",
            "Workshop transportation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Microwave Repair",
        "active": False,
        "featured": False,
        "display_order": 16,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate only if trained microwave-repair support is available."
            )
        },
    },
    {
        "slug": "deep-freezer-repair",
        "category": "Appliance Repair",
        "title": "Deep Freezer Repair",
        "image": "/images/service_deep_freezer.png",
        "icon": "snowflake",
        "price_text": "Technician visit starts at ₹499",
        "base_price": 499,
        "duration": "60–120 minutes",
        "short_description": (
            "Inspection and repair support for common deep-freezer "
            "cooling and performance issues."
        ),
        "detailed_description": (
            "Book a technician for low cooling, visible leakage, thermostat-related "
            "issues or unusual operation in a deep freezer. Repair charges will be "
            "confirmed after inspection."
        ),
        "whats_included": [
            "Technician visit",
            "Basic deep-freezer inspection",
            "Cooling-performance check",
            "Visible-leakage check",
            "Basic electrical inspection",
            "Repair quotation",
        ],
        "add_ons": [
            {
                "name": "Minor repair labour",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Gas charging",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Thermostat replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Compressor-related work",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Compressor replacement",
            "Major commercial overhaul",
            "Workshop transportation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Deep Freezer Repair",
        "active": False,
        "featured": False,
        "display_order": 17,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming residential and commercial service scope."
            )
        },
    },
    {
        "slug": "water-cooler-repair",
        "category": "Appliance Repair",
        "title": "Water Cooler Repair",
        "image": "/images/service_water_cooler.png",
        "icon": "droplet",
        "price_text": "Technician visit starts at ₹499",
        "base_price": 499,
        "duration": "60–120 minutes",
        "short_description": (
            "Water-cooler inspection and repair support for common "
            "cooling or leakage problems."
        ),
        "detailed_description": (
            "Book a technician for water-cooler cooling issues, visible leakage "
            "or basic electrical faults. Suitable for homes, offices and small "
            "commercial spaces after technician confirmation."
        ),
        "whats_included": [
            "Technician visit",
            "Basic cooling-performance check",
            "Visible-leakage inspection",
            "Basic electrical inspection",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Minor repair labour",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Gas charging",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Part replacement",
                "price_text": "Parts charge extra",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Major commercial overhaul",
            "Workshop transportation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Water Cooler Repair",
        "active": False,
        "featured": False,
        "display_order": 18,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate only after confirming technician availability."
            )
        },
    },
]


if __name__ == "__main__":
    upsert_services(
        services=OPTIONAL_APPLIANCE_SERVICES,
        source_part="part-5-optional-appliance-services",
    )

    verify_database()

    print("Part 5 completed successfully.")

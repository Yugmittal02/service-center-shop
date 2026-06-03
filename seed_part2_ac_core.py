from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Spare parts, "
    "additional materials, extra piping, accessories, difficult-height work "
    "aur major repair ka charge inspection ke baad separately confirm kiya jayega. "
    "Technician work start karne se pehle final estimate share karega."
)


AC_SERVICES = [
    {
        "slug": "ac-installation",
        "category": "AC Services",
        "title": "AC Installation",
        "image": "/images/service_ac_installation.png",
        "icon": "snowflake",
        "price_text": "Starts at ₹1,449",
        "base_price": 1449,
        "duration": "1.5–2.5 hours",
        "short_description": (
            "Professional AC installation with proper fitting, "
            "connection checks and cooling-performance testing."
        ),
        "detailed_description": (
            "Get your AC installed safely by a trained technician. "
            "Standard installation labour, indoor-unit mounting, accessible "
            "outdoor-unit placement, drainage connection and basic performance "
            "testing are included. Additional materials are quoted before work begins."
        ),
        "whats_included": [
            "Standard AC installation labour",
            "Indoor-unit mounting",
            "Outdoor-unit placement at an accessible location",
            "Existing copper-pipe connection check",
            "Drainage-pipe connection",
            "Basic electrical connection check",
            "Cooling-performance test",
        ],
        "add_ons": [
            {
                "name": "AC uninstallation",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
            {
                "name": "Copper-pipe extension",
                "price_text": "Price per foot",
            },
            {
                "name": "Drain-pipe extension",
                "price_text": "Price per foot",
            },
            {
                "name": "Outdoor-unit wall bracket",
                "price_text": "Price according to size",
            },
            {
                "name": "Core cutting or difficult-height work",
                "price_text": "On inspection",
            },
        ],
        "exclusions": [
            "New copper pipe",
            "Wall bracket",
            "Electrical material",
            "Core cutting",
            "Scaffolding or difficult-height work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book AC Installation",
        "active": True,
        "featured": True,
        "display_order": 1,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "ac-general-service",
        "category": "AC Services",
        "title": "AC General Service",
        "image": "/images/service_ac.png",
        "icon": "snowflake",
        "price_text": "Starts at ₹699",
        "base_price": 699,
        "duration": "45–75 minutes per AC",
        "short_description": (
            "Routine AC cleaning and performance check for better cooling "
            "and smoother operation."
        ),
        "detailed_description": (
            "Maintain your AC with regular servicing. The technician cleans "
            "essential components, checks drainage and tests basic cooling performance. "
            "This service is suitable for seasonal maintenance."
        ),
        "whats_included": [
            "AC filter cleaning",
            "Basic indoor-unit cleaning",
            "Outdoor-unit visual inspection",
            "Drainage-line check",
            "Cooling-performance test",
            "Basic noise and vibration check",
        ],
        "add_ons": [
            {
                "name": "2 AC general services",
                "price_text": "₹1,299",
                "base_price": 1299,
            },
            {
                "name": "3 AC general services",
                "price_text": "₹1,799",
                "base_price": 1799,
            },
            {
                "name": "4 AC general services",
                "price_text": "₹2,499",
                "base_price": 2499,
            },
            {
                "name": "5 AC general services",
                "price_text": "₹2,999",
                "base_price": 2999,
            },
            {
                "name": "AC deep cleaning",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
        ],
        "exclusions": [
            "Gas charging",
            "Major repair work",
            "Spare parts",
            "Installation or uninstallation",
            "Copper-pipe work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book AC Service",
        "active": True,
        "featured": True,
        "display_order": 2,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "ac-deep-cleaning",
        "category": "AC Services",
        "title": "AC Deep Cleaning Service",
        "image": "/images/service_ac_deep_clean.png",
        "icon": "sparkles",
        "price_text": "Starts at ₹699",
        "base_price": 699,
        "duration": "60–90 minutes",
        "short_description": (
            "Detailed AC cleaning for improved hygiene, airflow "
            "and cooling performance."
        ),
        "detailed_description": (
            "AC deep cleaning is suitable when regular filter cleaning is not enough. "
            "The technician cleans accessible indoor components, checks drainage "
            "and performs a basic cooling test after service."
        ),
        "whats_included": [
            "Filter cleaning",
            "Accessible indoor-unit component cleaning",
            "Cooling-coil surface cleaning",
            "Drain-pan cleaning",
            "Drainage-line inspection",
            "Airflow test",
            "Cooling-performance test",
        ],
        "add_ons": [
            {
                "name": "Outdoor-unit deep cleaning",
                "price_text": "On inspection",
            },
            {
                "name": "Triple-layer protective coating",
                "price_text": "Starts at ₹799",
                "base_price": 799,
            },
            {
                "name": "Gas-pressure check",
                "price_text": "On demand",
            },
        ],
        "exclusions": [
            "Gas charging",
            "Major repair work",
            "Spare parts",
            "Difficult-height work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Deep Cleaning",
        "active": True,
        "featured": True,
        "display_order": 3,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "ac-repair-diagnosis",
        "category": "AC Services",
        "title": "AC Repair & Diagnosis",
        "image": "/images/service_ac_repair.png",
        "icon": "wrench",
        "price_text": "Starts at ₹1,499",
        "base_price": 1499,
        "duration": "1–2 hours",
        "short_description": (
            "Diagnosis and repair labour for common AC cooling, "
            "noise and drainage issues."
        ),
        "detailed_description": (
            "Book an AC technician for low cooling, unusual noise, drainage issues "
            "and other common faults. Spare-parts requirements and additional charges "
            "are explained before replacement."
        ),
        "whats_included": [
            "AC issue diagnosis",
            "Cooling-performance check",
            "Drainage inspection",
            "Noise and vibration check",
            "Basic repair labour",
            "Minor adjustment work",
            "Final testing after repair",
        ],
        "add_ons": [
            {
                "name": "AC deep cleaning",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
            {
                "name": "Gas charging",
                "price_text": "Starts at ₹3,199",
                "base_price": 3199,
            },
            {
                "name": "Capacitor replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Sensor replacement",
                "price_text": "Parts charge extra",
            },
        ],
        "exclusions": [
            "Major spare parts",
            "Compressor replacement",
            "Copper pipe",
            "Gas charging",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book AC Repair",
        "active": True,
        "featured": True,
        "display_order": 4,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "ac-gas-charging",
        "category": "AC Services",
        "title": "AC Gas Charging",
        "image": "/images/service_ac_gas.png",
        "icon": "thermometer",
        "price_text": "Starts at ₹3,199",
        "base_price": 3199,
        "duration": "1–2 hours",
        "short_description": (
            "Gas-pressure check, basic leak inspection and refrigerant "
            "recharge after technician assessment."
        ),
        "detailed_description": (
            "If your AC is not cooling properly, low refrigerant may be one possible reason. "
            "The technician checks pressure, inspects visible leakage and confirms "
            "the recharge requirement before starting work."
        ),
        "whats_included": [
            "Gas-pressure check",
            "Basic visible-leak inspection",
            "Refrigerant requirement confirmation",
            "Gas charging for eligible AC type",
            "Cooling-performance test",
            "Final pressure check",
        ],
        "add_ons": [
            {
                "name": "Leakage repair",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Copper-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Valve replacement",
                "price_text": "Parts charge extra",
            },
        ],
        "exclusions": [
            "Major leakage repair",
            "Copper-pipe replacement",
            "Compressor-related faults",
            "Electrical repair",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Gas Charging",
        "active": True,
        "featured": False,
        "display_order": 5,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {
            "pricing_note": (
                "Final price depends on AC tonnage, refrigerant type "
                "and leakage condition."
            )
        },
    },
    {
        "slug": "ac-uninstallation",
        "category": "AC Services",
        "title": "AC Uninstallation",
        "image": "/images/service_ac_uninstallation.png",
        "icon": "package-minus",
        "price_text": "Starts at ₹699",
        "base_price": 699,
        "duration": "45–90 minutes",
        "short_description": (
            "Safe removal of indoor and outdoor AC units "
            "with basic connection handling."
        ),
        "detailed_description": (
            "Book a technician to safely remove your AC before shifting, "
            "replacement or relocation. Difficult-height access and additional "
            "material handling are quoted separately."
        ),
        "whats_included": [
            "Indoor-unit removal",
            "Outdoor-unit removal from an accessible location",
            "Basic connection handling",
            "Removal completion check",
        ],
        "add_ons": [
            {
                "name": "Difficult-height work",
                "price_text": "On inspection",
            },
            {
                "name": "Packing support",
                "price_text": "On demand",
            },
            {
                "name": "AC relocation consultation",
                "price_text": "On demand",
            },
        ],
        "exclusions": [
            "Scaffolding",
            "Transportation",
            "Wall repair",
            "Difficult-height work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Service",
        "active": True,
        "featured": False,
        "display_order": 6,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
]


if __name__ == "__main__":
    upsert_services(
        services=AC_SERVICES,
        source_part="part-2-ac-core-services",
    )

    verify_database()

    print("Part 2 completed successfully.")

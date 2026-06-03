from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Spare parts, "
    "additional materials, extra piping, accessories, difficult-height work "
    "aur major repair ka charge inspection ke baad separately confirm kiya jayega. "
    "Technician work start karne se pehle final estimate share karega."
)


AC_EXTRA_SERVICES = [
    {
        "slug": "ac-complete-repair-combo",
        "category": "AC Services",
        "title": "AC Complete Repair Combo",
        "image": "/images/service_ac_repair_combo.png",
        "icon": "shield-tools",
        "price_text": "Combo starts at ₹5,599",
        "base_price": 5599,
        "duration": "2–3 hours",
        "short_description": (
            "Complete AC care package with repair labour, deep cleaning, "
            "protective coating and gas charging."
        ),
        "detailed_description": (
            "This combo is suitable for ACs that require complete maintenance "
            "and performance improvement. The technician checks the AC condition "
            "before starting and explains any additional spare-parts or material charges."
        ),
        "whats_included": [
            "AC issue diagnosis",
            "Basic repair labour",
            "Indoor-unit deep cleaning",
            "Outdoor-unit cleaning",
            "Filter cleaning",
            "Drainage-line inspection",
            "Triple-layer protective coating on eligible components",
            "Gas-pressure check",
            "Gas charging subject to AC model and refrigerant type",
            "Cooling-performance test",
            "Final service report",
        ],
        "add_ons": [
            {
                "name": "Copper-pipe replacement",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Drain-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Electrical wiring repair",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Capacitor replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Sensor replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Compressor-related work",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Major spare parts",
            "Compressor replacement",
            "New copper piping",
            "Electrical accessories",
            "Difficult-height work",
            "Commercial AC systems unless separately confirmed",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Complete AC Care",
        "active": True,
        "featured": True,
        "display_order": 7,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {
            "pricing_note": (
                "Combo price applies to eligible AC units after technician inspection."
            )
        },
    },
    {
        "slug": "triple-layer-protective-coating",
        "category": "AC Services",
        "title": "Triple-Layer Protective Coating",
        "image": "/images/service_ac_coating.png",
        "icon": "shield",
        "price_text": "Starts at ₹799",
        "base_price": 799,
        "duration": "45–75 minutes",
        "short_description": (
            "Optional preventive-maintenance coating for eligible AC components "
            "after inspection and cleaning."
        ),
        "detailed_description": (
            "This optional service adds a protective-maintenance coating to eligible "
            "AC components after surface preparation. The technician checks whether "
            "the coating is suitable for your AC before application."
        ),
        "whats_included": [
            "AC-component inspection",
            "Surface-preparation check",
            "Basic cleaning before application",
            "Protective-coating application on eligible components",
            "Final visual inspection",
            "Maintenance recommendation",
        ],
        "add_ons": [
            {
                "name": "AC general service",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
            {
                "name": "AC deep cleaning",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
            {
                "name": "Outdoor-unit cleaning",
                "price_text": "On inspection",
            },
            {
                "name": "Gas-pressure check",
                "price_text": "On demand",
            },
        ],
        "exclusions": [
            "Repair labour",
            "Spare parts",
            "Gas charging",
            "Major component repair",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Add Protective Coating",
        "active": True,
        "featured": False,
        "display_order": 8,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {
            "marketing_note": (
                "Do not publish unsupported claims such as guaranteed electricity "
                "saving or permanent rust prevention."
            )
        },
    },
    {
        "slug": "ac-relocation",
        "category": "AC Services",
        "title": "AC Relocation",
        "image": "/images/service_ac_relocation.png",
        "icon": "move",
        "price_text": "Quotation after inspection",
        "base_price": None,
        "duration": "Depends on location and work scope",
        "short_description": (
            "AC removal and reinstallation support when shifting to another "
            "room or property."
        ),
        "detailed_description": (
            "Relocation requirements vary according to installation access, "
            "distance, piping length and mounting conditions. A technician will "
            "inspect the requirement and share a clear estimate before work begins."
        ),
        "whats_included": [
            "Relocation requirement assessment",
            "Existing AC setup inspection",
            "Installation-location review",
            "Material requirement list",
            "Labour quotation before work begins",
        ],
        "add_ons": [
            {
                "name": "New copper pipe",
                "price_text": "Price per foot",
            },
            {
                "name": "Drain-pipe extension",
                "price_text": "Price per foot",
            },
            {
                "name": "Outdoor-unit bracket",
                "price_text": "Price according to size",
            },
            {
                "name": "Transportation support",
                "price_text": "On demand",
            },
            {
                "name": "Difficult-height installation",
                "price_text": "On inspection",
            },
        ],
        "exclusions": [
            "Transportation unless quoted",
            "New piping material",
            "Wall repair",
            "Civil work",
            "Scaffolding",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Request Callback",
        "active": False,
        "featured": False,
        "display_order": 9,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Keep inactive until the business confirms relocation pricing "
                "and service-area rules."
            )
        },
    },
    {
        "slug": "ac-water-leakage-repair",
        "category": "AC Services",
        "title": "AC Water Leakage Repair",
        "image": "/images/service_ac_water_leakage.png",
        "icon": "droplets",
        "price_text": "Starts at ₹699",
        "base_price": 699,
        "duration": "45–90 minutes",
        "short_description": (
            "Inspection and repair support for common AC water-leakage "
            "and drainage issues."
        ),
        "detailed_description": (
            "Book a technician when water is dripping from your AC. "
            "The technician checks drainage blockage, visible leakage points "
            "and basic indoor-unit conditions before recommending repair work."
        ),
        "whats_included": [
            "Water-leakage inspection",
            "Drainage-line check",
            "Drain-pan inspection",
            "Basic blockage-clearing labour",
            "Accessible drain-pipe inspection",
            "Final drainage test",
        ],
        "add_ons": [
            {
                "name": "Drain-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "AC deep cleaning",
                "price_text": "Starts at ₹699",
                "base_price": 699,
            },
            {
                "name": "Indoor-unit repair",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "New drain pipe",
            "Civil work",
            "Major internal repair",
            "Difficult-height work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book AC Leakage Repair",
        "active": False,
        "featured": False,
        "display_order": 10,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate only after confirming that this service is offered separately."
            )
        },
    },
]


if __name__ == "__main__":
    upsert_services(
        services=AC_EXTRA_SERVICES,
        source_part="part-3-ac-extra-services",
    )

    verify_database()

    print("Part 3 completed successfully.")

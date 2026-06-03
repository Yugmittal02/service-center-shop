from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Spare parts, "
    "additional materials aur major repair ka charge inspection ke baad "
    "separately confirm kiya jayega. Technician work start karne se pehle "
    "final estimate share karega."
)


CORE_APPLIANCE_SERVICES = [
    {
        "slug": "refrigerator-repair",
        "category": "Appliance Repair",
        "title": "Refrigerator Repair",
        "image": "/images/service_fridge.png",
        "icon": "refrigerator",
        "price_text": "Technician visit starts at ₹399",
        "base_price": 399,
        "duration": "45–90 minutes",
        "short_description": (
            "Inspection and repair support for refrigerator cooling, "
            "noise and thermostat-related issues."
        ),
        "detailed_description": (
            "Book a trained technician for common refrigerator problems "
            "such as low cooling, unusual noise, visible leakage or thermostat issues. "
            "Repair labour and spare-parts cost will be confirmed after inspection."
        ),
        "whats_included": [
            "Technician home visit",
            "Basic refrigerator inspection",
            "Cooling-performance check",
            "Visible-leakage check",
            "Basic electrical connection inspection",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Minor repair labour",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Thermostat replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Gas charging",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Compressor-related work",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Compressor replacement",
            "Major workshop repair",
            "Transportation for workshop repair",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Refrigerator Repair",
        "active": True,
        "featured": True,
        "display_order": 11,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "washing-machine-service-repair",
        "category": "Appliance Repair",
        "title": "Washing Machine Service & Repair",
        "image": "/images/service_washing.png",
        "icon": "washing-machine",
        "price_text": "Starts at ₹1,199",
        "base_price": 1199,
        "duration": "1–2 hours",
        "short_description": (
            "Inspection and repair support for drainage, spin-cycle, "
            "noise and performance-related problems."
        ),
        "detailed_description": (
            "Get professional help for common washing-machine problems, "
            "including drainage issues, unusual noise, spin-cycle faults "
            "and basic motor inspection. Additional parts are quoted separately."
        ),
        "whats_included": [
            "Washing-machine inspection",
            "Basic issue diagnosis",
            "Drainage check",
            "Water-inlet check",
            "Spin-cycle testing",
            "Basic electrical connection check",
            "Minor repair labour",
            "Performance test after service",
        ],
        "add_ons": [
            {
                "name": "Deep drum cleaning",
                "price_text": "On demand",
            },
            {
                "name": "Inlet-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Drain-pipe replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Motor repair",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Control-panel repair",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "Motor replacement",
            "PCB or control-panel replacement",
            "Workshop transportation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Washing Machine Service",
        "active": True,
        "featured": True,
        "display_order": 12,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "geyser-installation",
        "category": "Geyser Services",
        "title": "Geyser Installation",
        "image": "/images/service_geyser.png",
        "icon": "flame",
        "price_text": "Starts at ₹1,199",
        "base_price": 1199,
        "duration": "1–2 hours",
        "short_description": (
            "Professional geyser installation with standard fitting, "
            "connection checks and functionality testing."
        ),
        "detailed_description": (
            "Get your geyser installed by a trained technician. "
            "The service includes standard mounting support, existing inlet "
            "and outlet connection checks, a safety inspection and basic testing."
        ),
        "whats_included": [
            "Standard geyser installation labour",
            "Wall-mounting support",
            "Existing inlet and outlet connection check",
            "Existing electrical-point safety check",
            "Water-flow check",
            "Leakage inspection",
            "Basic functionality test",
        ],
        "add_ons": [
            {
                "name": "Geyser uninstallation",
                "price_text": "On demand",
            },
            {
                "name": "New inlet and outlet pipes",
                "price_text": "Material charge extra",
            },
            {
                "name": "Safety valve",
                "price_text": "Material charge extra",
            },
            {
                "name": "New electrical point",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "New pipes",
            "Electrical material",
            "Safety valve",
            "Civil work",
            "New electrical point",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Geyser Installation",
        "active": True,
        "featured": True,
        "display_order": 13,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "geyser-repair",
        "category": "Geyser Services",
        "title": "Geyser Repair",
        "image": "/images/service_geyser_repair.png",
        "icon": "flame",
        "price_text": "Technician visit starts at ₹399",
        "base_price": 399,
        "duration": "45–90 minutes",
        "short_description": (
            "Inspection and repair support for geyser heating, "
            "leakage and power-related issues."
        ),
        "detailed_description": (
            "Book a technician for common geyser issues such as low heating, "
            "water leakage or basic electrical faults. Spare-parts and major repair "
            "charges will be confirmed after inspection."
        ),
        "whats_included": [
            "Technician home visit",
            "Basic geyser inspection",
            "Heating-performance check",
            "Visible-leakage check",
            "Basic electrical connection inspection",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Thermostat replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Heating-element replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Safety-valve replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Electrical-point repair",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "New wiring",
            "Civil work",
            "New plumbing connection",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Geyser Repair",
        "active": True,
        "featured": False,
        "display_order": 14,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
]


if __name__ == "__main__":
    upsert_services(
        services=CORE_APPLIANCE_SERVICES,
        source_part="part-4-core-appliance-services",
    )

    verify_database()

    print("Part 4 completed successfully.")

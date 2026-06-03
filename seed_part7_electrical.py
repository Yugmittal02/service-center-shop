from seed_common import upsert_services, verify_database


DISCLAIMER = (
    "Displayed price basic labour charge ke liye hai. Switches, sockets, "
    "wire, cable, MCB, light fittings aur other electrical material ka charge "
    "inspection ke baad separately confirm kiya jayega. Technician work start "
    "karne se pehle final estimate share karega."
)


ELECTRICAL_SERVICES = [
    {
        "slug": "electrical-wiring-services",
        "category": "Electrical Services",
        "title": "Electrical & Wiring Services",
        "image": "/images/service_electrical.png",
        "icon": "zap",
        "price_text": "Starts at ₹999",
        "base_price": 999,
        "duration": "Depends on work scope",
        "short_description": (
            "Electrical repair, fitting, wiring and safety-check "
            "services for homes and businesses."
        ),
        "detailed_description": (
            "Book a trained electrician for wiring, fittings, switchboard work "
            "and general electrical-maintenance requirements. The technician "
            "inspects the site, explains the work scope and shares a material "
            "list and labour estimate before starting."
        ),
        "whats_included": [
            "Site inspection",
            "Issue diagnosis",
            "Requirement assessment",
            "Labour estimate",
            "Material requirement list",
            "Basic safety check",
        ],
        "add_ons": [
            {
                "name": "Switchboard repair",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Light fitting installation",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Fan installation",
                "price_text": "Starts at ₹299",
                "base_price": 299,
            },
            {
                "name": "MCB replacement",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "New electrical point",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Switches and sockets",
            "Wire and cable",
            "MCB material",
            "Light fittings",
            "Civil work",
            "Heavy industrial work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Electrical Service",
        "active": True,
        "featured": True,
        "display_order": 21,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "electrician-visit",
        "category": "Electrical Services",
        "title": "Electrician Visit",
        "image": "/images/service_electrician_visit.png",
        "icon": "zap",
        "price_text": "Starts at ₹399",
        "base_price": 399,
        "duration": "30–60 minutes",
        "short_description": (
            "Book an electrician for on-site diagnosis "
            "and a transparent work estimate."
        ),
        "detailed_description": (
            "Suitable when the exact electrical issue is unclear or multiple "
            "tasks need inspection. The electrician visits, diagnoses the problem, "
            "prepares a material list and shares a clear labour estimate."
        ),
        "whats_included": [
            "Electrician home visit",
            "Basic issue diagnosis",
            "Work-scope discussion",
            "Material requirement list",
            "Labour estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Repair work",
                "price_text": "According to scope",
            },
            {
                "name": "Material supply",
                "price_text": "Material charge extra",
            },
            {
                "name": "Same-day priority visit",
                "price_text": "On demand",
            },
        ],
        "exclusions": [
            "Repair labour unless approved",
            "Electrical material",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Electrician Visit",
        "active": True,
        "featured": False,
        "display_order": 22,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": False,
        "metadata": {},
    },
    {
        "slug": "fan-installation",
        "category": "Electrical Services",
        "title": "Fan Installation",
        "image": "/images/service_fan.png",
        "icon": "fan",
        "price_text": "Starts at ₹299",
        "base_price": 299,
        "duration": "30–60 minutes",
        "short_description": (
            "Ceiling, wall or exhaust-fan fitting "
            "with connection check and basic testing."
        ),
        "detailed_description": (
            "Book basic fan installation support. The technician mounts "
            "the fan, checks connections and performs a basic test. "
            "Accessories and new wiring are charged separately."
        ),
        "whats_included": [
            "Fan installation labour",
            "Mounting and fitting check",
            "Electrical connection check",
            "Basic functionality test",
        ],
        "add_ons": [
            {
                "name": "New wiring",
                "price_text": "Material charge extra",
            },
            {
                "name": "Regulator replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Old fan removal",
                "price_text": "On demand",
            },
        ],
        "exclusions": [
            "Fan",
            "Regulator",
            "Wiring material",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Fan Installation",
        "active": False,
        "featured": False,
        "display_order": 23,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming pricing and technician availability."
            )
        },
    },
    {
        "slug": "fan-repair",
        "category": "Electrical Services",
        "title": "Fan Repair",
        "image": "/images/service_fan_repair.png",
        "icon": "fan",
        "price_text": "Starts at ₹299",
        "base_price": 299,
        "duration": "30–90 minutes",
        "short_description": (
            "Basic fan inspection and repair support for speed, "
            "noise or connection issues."
        ),
        "detailed_description": (
            "Book diagnosis and repair support for common ceiling, wall "
            "or exhaust-fan problems such as low speed, unusual noise "
            "or connection faults."
        ),
        "whats_included": [
            "Basic fan diagnosis",
            "Connection check",
            "Noise and movement inspection",
            "Speed-performance check",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Regulator replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Capacitor replacement",
                "price_text": "Parts charge extra",
            },
            {
                "name": "Winding repair",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Spare parts",
            "New wiring",
            "Motor replacement",
            "New fan",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Fan Repair",
        "active": False,
        "featured": False,
        "display_order": 24,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming repair scope and pricing."
            )
        },
    },
    {
        "slug": "switchboard-repair",
        "category": "Electrical Services",
        "title": "Switchboard Repair",
        "image": "/images/service_switchboard.png",
        "icon": "toggle-left",
        "price_text": "Starts at ₹299",
        "base_price": 299,
        "duration": "30–90 minutes",
        "short_description": (
            "Switch, socket and basic switchboard inspection "
            "or replacement support."
        ),
        "detailed_description": (
            "Book an electrician for switchboard diagnosis, minor repair "
            "and replacement support. Material requirements are listed "
            "and quoted before replacement."
        ),
        "whats_included": [
            "Issue diagnosis",
            "Safety inspection",
            "Minor repair labour",
            "Material requirement list",
            "Repair estimate before work begins",
        ],
        "add_ons": [
            {
                "name": "Switch replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "Socket replacement",
                "price_text": "Material charge extra",
            },
            {
                "name": "MCB installation",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "New switchboard",
                "price_text": "Material charge extra",
            },
        ],
        "exclusions": [
            "Switches",
            "Sockets",
            "MCB",
            "New wiring",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Switchboard Repair",
        "active": False,
        "featured": False,
        "display_order": 25,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming pricing and material-supply scope."
            )
        },
    },
    {
        "slug": "light-fitting-installation",
        "category": "Electrical Services",
        "title": "Light Fitting Installation",
        "image": "/images/service_light_fitting.png",
        "icon": "lightbulb",
        "price_text": "Starts at ₹199",
        "base_price": 199,
        "duration": "30–60 minutes",
        "short_description": (
            "Basic light, holder or fixture fitting "
            "with connection testing."
        ),
        "detailed_description": (
            "Book fitting support for accessible residential light points. "
            "The technician checks the existing electrical point, fits the fixture "
            "and performs a basic connection test."
        ),
        "whats_included": [
            "Basic fitting labour",
            "Existing electrical-point check",
            "Connection test",
            "Fixture mounting support",
        ],
        "add_ons": [
            {
                "name": "New electrical point",
                "price_text": "Quotation after inspection",
            },
            {
                "name": "Wiring material",
                "price_text": "Material charge extra",
            },
            {
                "name": "Multiple fixture installation",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "Light fixture",
            "New wiring",
            "Civil work",
            "Decorative or chandelier installation",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book Light Fitting",
        "active": False,
        "featured": False,
        "display_order": 26,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming pricing and service scope."
            )
        },
    },
    {
        "slug": "mcb-replacement",
        "category": "Electrical Services",
        "title": "MCB Replacement",
        "image": "/images/service_mcb.png",
        "icon": "shield-zap",
        "price_text": "Starts at ₹399",
        "base_price": 399,
        "duration": "30–90 minutes",
        "short_description": (
            "MCB inspection and replacement labour "
            "after basic safety assessment."
        ),
        "detailed_description": (
            "Book an electrician to inspect the circuit and replace an eligible MCB. "
            "The technician performs a basic safety check, confirms the MCB rating "
            "and quotes the material cost before replacement."
        ),
        "whats_included": [
            "Basic circuit inspection",
            "Safety check",
            "MCB replacement labour",
            "Basic testing after replacement",
            "Material requirement confirmation",
        ],
        "add_ons": [
            {
                "name": "MCB supply",
                "price_text": "Material charge extra",
            },
            {
                "name": "Distribution-board inspection",
                "price_text": "On demand",
            },
            {
                "name": "Rewiring support",
                "price_text": "Quotation after inspection",
            },
        ],
        "exclusions": [
            "MCB material",
            "Distribution-board replacement",
            "Rewiring",
            "Civil work",
        ],
        "pricing_disclaimer": DISCLAIMER,
        "cta_text": "Book MCB Replacement",
        "active": False,
        "featured": False,
        "display_order": 27,
        "verified_rating": None,
        "reviews_count": 0,
        "is_suggested": True,
        "metadata": {
            "activation_note": (
                "Activate after confirming MCB-supply scope and pricing."
            )
        },
    },
]


if __name__ == "__main__":
    upsert_services(
        services=ELECTRICAL_SERVICES,
        source_part="part-7-electrical-services",
    )

    verify_database()

    print("Part 7 completed successfully.")

import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import GuidelineCategory, LegalDocument

def populate_guidelines():
    print("Populating Guidelines Data...")

    # 1. Safety Rules
    guideline_categories = [
        {
            "title": "General Safety",
            "icon": "Shield",
            "items": [
                "All participants must sign a waiver before entry",
                "Children under 12 must be supervised by an adult",
                "Remove shoes, sharp objects, and jewelry before entering",
                "No food or drinks allowed in play areas",
                "Follow all staff instructions at all times",
                "Maximum capacity limits must be observed"
            ],
            "order": 1
        },
        {
            "title": "Health Requirements",
            "icon": "AlertTriangle",
            "items": [
                "Participants must be in good health",
                "Not recommended for pregnant women",
                "Heart conditions or recent surgeries require medical clearance",
                "Inform staff of any medical conditions",
                "First aid available on-site",
                "Emergency procedures clearly posted"
            ],
            "order": 2
        },
        {
            "title": "Behavior Guidelines",
            "icon": "Users",
            "items": [
                "Respect other participants and staff",
                "No rough play or pushing",
                "One person per slide at a time",
                "No climbing on safety nets",
                "Follow age and height restrictions",
                "Report any injuries or concerns immediately"
            ],
            "order": 3
        }
    ]

    for data in guideline_categories:
        category, created = GuidelineCategory.objects.get_or_create(
            title=data["title"],
            defaults={
                "items": data["items"],
                "icon": data["icon"],
                "order": data["order"],
                "active": True
            }
        )
        if created:
            print(f"Created category: {category.title}")
        else:
            category.items = data["items"]
            category.icon = data["icon"]
            category.order = data["order"]
            category.save()
            print(f"Updated category: {category.title}")

    # 2. Terms & Conditions
    terms_sections = [
        {"title": "1. Acceptance of Terms", "content": "By entering Ninja Inflatable Park, you agree to comply with these terms and conditions."},
        {"title": "2. Liability Waiver", "content": "All participants must sign a liability waiver. Parents/guardians must sign for minors."},
        {"title": "3. Safety Rules", "content": "- Follow all posted safety guidelines\n- Obey staff instructions at all times\n- Use equipment as intended\n- Report unsafe conditions immediately"},
        {"title": "4. Age Restrictions", "content": "- Children under 3 years: Not permitted\n- Ages 3-12: Adult supervision required\n- Ages 13+: May participate independently"},
        {"title": "5. Health & Fitness", "content": "Participants should be in good health. Not recommended for those with:\n- Heart conditions\n- Recent surgeries\n- Pregnancy\n- Severe mobility issues"},
        {"title": "6. Refund Policy", "content": "- Full refund if cancelled 24 hours in advance\n- 50% refund if cancelled 12-24 hours in advance\n- No refund for same-day cancellations\n- Weather-related closures: Full refund or reschedule"},
        {"title": "7. Photography & Video", "content": "We may take photos/videos for promotional purposes. Notify staff if you object."},
        {"title": "8. Lost & Found", "content": "Not responsible for lost or stolen items. Lockers available for rent."},
        {"title": "9. Right to Refuse Entry", "content": "We reserve the right to refuse entry or remove anyone violating these terms."},
        {"title": "10. Changes to Terms", "content": "Terms may be updated. Check website for latest version."}
    ]

    LegalDocument.objects.update_or_create(
        document_type="TERMS",
        defaults={
            "title": "Terms & Conditions",
            "intro": "Please read these terms and conditions carefully before participating in any activities.",
            "sections": terms_sections,
            "active": True
        }
    )
    print("Updated Terms & Conditions")

    # 3. Liability Waiver
    waiver_sections = [
        {"title": "Assumption of Risk", "content": "I acknowledge that participating in activities at Ninja Inflatable Park involves inherent risks including but not limited to:\n- Physical injury\n- Sprains, strains, or fractures\n- Collisions with other participants or equipment\n- Falls from heights"},
        {"title": "Release of Liability", "content": "I hereby release, waive, discharge, and covenant not to sue Ninja Inflatable Park, its owners, employees, and agents from any and all liability for any loss, damage, or injury that may occur."},
        {"title": "Medical Authorization", "content": "I authorize Ninja Inflatable Park staff to seek emergency medical treatment if necessary."},
        {"title": "Photo/Video Release", "content": "I grant permission for photos/videos taken during my visit to be used for promotional purposes."},
        {"title": "Acknowledgment", "content": "I have read this waiver, fully understand its terms, and sign it freely and voluntarily."},
        {"title": "Required Information", "content": "- Full Name\n- Date of Birth\n- Emergency Contact\n- Phone Number\n- Signature\n- Date\n\nFor minors, parent/guardian must sign."}
    ]

    LegalDocument.objects.update_or_create(
        document_type="WAIVER",
        defaults={
            "title": "Liability Waiver",
            "intro": "All participants must sign this waiver before entering the park.",
            "sections": waiver_sections,
            "active": True
        }
    )
    print("Updated Liability Waiver")
    print("Done!")

if __name__ == "__main__":
    populate_guidelines()

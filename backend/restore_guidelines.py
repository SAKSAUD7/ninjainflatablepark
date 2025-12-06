
import os
import django
import sys

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import GuidelineCategory, LegalDocument, PageSection

def restore_guidelines():
    print("Restoring Guidelines Content...")

    # 1. Guidelines Categories
    categories = [
        {
            "title": "General Safety",
            "icon": "Shield",
            "items": [
                "Follow all instructions from Court Marshals",
                "One person per trampoline at a time",
                "No double bouncing or rough play",
                "Always land on two feet or your back",
                "No running on the pads",
                "Empty pockets before jumping"
            ],
            "order": 1
        },
        {
            "title": "Dress Code",
            "icon": "Users",
            "items": [
                "Ninja Grip Socks are MANDATORY",
                "Remove all jewelry and loose objects",
                "Empty pockets completely",
                "No belt buckles or clothing studs",
                "Long hair must be tied back",
                "Remove glasses if possible"
            ],
            "order": 2
        },
        {
            "title": "Health Restrictions",
            "icon": "AlertTriangle",
            "items": [
                "Do not jump if pregnant",
                "Do not jump with health limitations",
                "Do not jump under influence of alcohol/drugs",
                "Weight limit: 120kg",
                "Waiver must be signed by all jumpers",
                "Report any accidents immediately"
            ],
            "order": 3
        },
        {
            "title": "Kids Zone Rules",
            "icon": "Users",
            "items": [
                "Strictly for ages 7 and under",
                "Adult supervision required at all times",
                "No big kids allowed in this zone",
                "Gentle play only",
                "One child per slide lane",
                "No climbing up the slides"
            ],
            "order": 4
        },
        {
            "title": "Spectator Policy",
            "icon": "Shield",
            "items": [
                "Spectators must stay in designated areas",
                "Do not enter the inflatable arenas",
                "No food or drink on the course",
                "Keep clear of landing zones",
                "Follow marshal instructions",
                "Respect all participants"
            ],
            "order": 5
        },
        {
            "title": "Equipment Safety",
            "icon": "Shield",
            "items": [
                "Empty pockets before jumping",
                "No keys, phones, or sharp objects",
                "Remove heavy jewelry/watches",
                "Do not chew gum or eat while jumping",
                "Secure glasses/goggles",
                "Grip socks intact and clean"
            ],
            "order": 6
        }
    ]

    print(f"Creating {len(categories)} guideline categories...")
    GuidelineCategory.objects.all().delete()
    for cat in categories:
        GuidelineCategory.objects.create(
            title=cat['title'],
            icon=cat['icon'],
            items=cat['items'],
            order=cat['order'],
            active=True
        )

    # 2. Legal Documents (Terms & Waiver)
    # Storing full text in 'intro' since 'content' field is missing and we want a simple block of text.
    legal_docs = [
        {
            "document_type": "TERMS",
            "title": "Terms & Conditions",
            "intro": """1. PARTIES & BOOKINGS
- All bookings are subject to availability.
- A 50% deposit is required to secure party bookings.
- Remaining balance must be paid before the event starts.
- Cancellations made 7 days prior receive a full refund.

2. PARK RULES
- Grip socks are mandatory for all participants.
- Management reserves the right to refuse entry.
- Participants must sign a waiver before entering course.
- Alcohol and drugs are strictly prohibited.

3. LIABILITY
- Jumpers participate at their own risk.
- Ninja Inflatable Park is not liable for injuries caused by rule violations.
- Personal belongings are the responsibility of the owner.
""",
            "sections": []
        },
        {
            "document_type": "WAIVER",
            "title": "Participant Waiver",
            "intro": """RELEASE OF LIABILITY, WAIVER OF CLAIMS, ASSUMPTION OF RISKS AND INDEMNITY AGREEMENT

By signing this document, you waive certain legal rights, including the right to sue.

1. ASSUMPTION OF RISK
I am aware that trampoline and inflatable park activities involve risks, dangers, and hazards including, but not limited to: slips and falls, collisions with other participants, and landing wrong.

2. RELEASE OF LIABILITY
I agree to waive any and all claims that I have or may in the future have against Ninja Inflatable Park and to release them from any and all liability for any loss, damage, expense or injury including death that I may suffer.

3. MEDICAL CONDITION
I confirm that I am physically fit and have no medical condition that would prevent full participation in these activities.
""",
            "sections": []
        },
        {
            "document_type": "PRIVACY",
            "title": "Privacy Policy",
            "intro": """Please review our Privacy Policy.

1. DATA COLLECTION
We collect personal information such as name, email, and phone number when you book online or sign a waiver. This is required for safety and liability purposes.

2. DATA USAGE
We use your data to process bookings, manage waivers, and send important service updates. We do not sell your personal data to third parties.

3. DATA SECURITY
We use industry-standard security measures to protect your personal information. Your payment details are processed securely by our payment partners and are not stored on our servers.

4. PHOTOGRAPHY
By entering the park, you consent to being photographed or filmed for security and promotional purposes.
""",
            "sections": []
        }
    ]

    print(f"Creating {len(legal_docs)} legal documents...")
    LegalDocument.objects.all().delete()
    for doc in legal_docs:
        LegalDocument.objects.create(
            document_type=doc['document_type'],
            title=doc['title'],
            intro=doc['intro'],
            sections=doc['sections'],
            active=True
        )

    # 3. Hero Section for Guidelines
    print("Creating Guidelines Hero...")
    PageSection.objects.update_or_create(
        page='guidelines',
        section_key='hero',
        defaults={
            'title': 'Safety Guidelines',
            'subtitle': 'Your safety is our priority. Please review the rules before you jump.',
            'image_url': '/images/gallery-2.jpg',
            'active': True
        }
    )

    print("Success! Guidelines content restored.")

if __name__ == '__main__':
    restore_guidelines()

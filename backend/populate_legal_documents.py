#!/usr/bin/env python
"""
Populate all legal documents for Guidelines page
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import LegalDocument, GuidelineCategory

def populate_legal_documents():
    """Populate all legal documents"""
    print("\n📄 Populating Legal Documents...")
    
    documents = [
        {
            'document_type': 'TERMS',
            'title': 'Terms & Conditions',
            'intro': 'Please read these terms and conditions carefully before using Ninja Inflatable Park.',
            'sections': [
                {
                    'title': 'Acceptance of Terms',
                    'content': 'By entering Ninja Inflatable Park, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our facilities.'
                },
                {
                    'title': 'Age Requirements',
                    'content': 'Participants must be at least 1 year old. Children under 12 must be accompanied by an adult (18+) who remains on the premises. Separate zones are designated for different age groups to ensure safety.'
                },
                {
                    'title': 'Health & Safety',
                    'content': 'Participants must be in good health and free from any medical conditions that could be aggravated by physical activity. Pregnant women, individuals with heart conditions, back problems, or recent injuries should not participate. If you have any medical concerns, please consult your doctor before visiting.'
                },
                {
                    'title': 'Rules & Regulations',
                    'content': 'All participants must follow park rules and staff instructions at all times. Failure to comply may result in immediate removal from the park without refund. Grip socks are mandatory for all participants and can be purchased at the facility.'
                },
                {
                    'title': 'Liability',
                    'content': 'Ninja Inflatable Park takes every precaution to ensure safety, but participation in activities is at your own risk. By entering the park, you acknowledge that inflatable activities carry inherent risks and agree to waive any claims against the park for injuries sustained during normal use.'
                },
                {
                    'title': 'Booking & Payments',
                    'content': 'All bookings must be paid in advance. Cancellations made 24 hours before the session are eligible for a full refund. Late cancellations or no-shows are non-refundable. We reserve the right to cancel sessions due to maintenance or safety concerns with full refunds provided.'
                },
                {
                    'title': 'Photography & Media',
                    'content': 'By entering the park, you consent to being photographed or recorded for promotional purposes. If you do not wish to be included in promotional materials, please inform staff upon entry.'
                },
                {
                    'title': 'Personal Belongings',
                    'content': 'Ninja Inflatable Park is not responsible for lost, stolen, or damaged personal belongings. Lockers are available for rent. We recommend leaving valuables at home.'
                },
                {
                    'title': 'Right to Refuse Entry',
                    'content': 'We reserve the right to refuse entry or remove any person from the premises who appears intoxicated, under the influence of drugs, or behaves in a manner deemed unsafe or inappropriate.'
                },
                {
                    'title': 'Changes to Terms',
                    'content': 'These terms and conditions may be updated from time to time. Continued use of our facilities constitutes acceptance of any changes.'
                }
            ],
            'active': True
        },
        {
            'document_type': 'WAIVER',
            'title': 'Participant Waiver & Release of Liability',
            'intro': 'This waiver must be signed by all participants (or their legal guardian if under 18) before entry.',
            'sections': [
                {
                    'title': 'Assumption of Risk',
                    'content': 'I acknowledge that participation in inflatable park activities involves inherent risks including but not limited to: falls, collisions, sprains, fractures, and other injuries. I voluntarily assume all risks associated with participation.'
                },
                {
                    'title': 'Health Declaration',
                    'content': 'I certify that I (or the minor participant) am in good physical condition and have no medical conditions that would prevent safe participation. I agree to immediately inform staff of any health issues that arise during my visit.'
                },
                {
                    'title': 'Release of Liability',
                    'content': 'I hereby release, waive, discharge, and covenant not to sue Ninja Inflatable Park, its owners, employees, and agents from any and all liability, claims, demands, or causes of action arising from participation in park activities, including those caused by negligence.'
                },
                {
                    'title': 'Medical Treatment Authorization',
                    'content': 'In the event of injury, I authorize Ninja Inflatable Park staff to provide first aid and, if necessary, arrange for emergency medical treatment. I agree to be responsible for any medical expenses incurred.'
                },
                {
                    'title': 'Rules Compliance',
                    'content': 'I agree to follow all posted rules, safety guidelines, and instructions from park staff. I understand that failure to comply may result in immediate removal from the facility without refund.'
                },
                {
                    'title': 'Parental Consent (For Minors)',
                    'content': 'As the parent or legal guardian, I consent to the minor\'s participation and agree to all terms on their behalf. I understand that I am responsible for supervising the minor and ensuring their compliance with all rules.'
                },
                {
                    'title': 'Photo/Video Consent',
                    'content': 'I grant permission for Ninja Inflatable Park to use photographs or videos taken during my visit for promotional purposes without compensation.'
                },
                {
                    'title': 'Acknowledgment',
                    'content': 'I have read this waiver carefully, understand its contents, and sign it voluntarily. I acknowledge that this is a legal document that affects my legal rights.'
                }
            ],
            'active': True
        },
        {
            'document_type': 'PRIVACY',
            'title': 'Privacy Policy',
            'intro': 'Ninja Inflatable Park is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.',
            'sections': [
                {
                    'title': 'Information We Collect',
                    'content': 'We collect personal information including name, email, phone number, date of birth, and emergency contact details when you book sessions or sign waivers. We also collect payment information for transactions and may use cookies on our website to improve user experience.'
                },
                {
                    'title': 'How We Use Your Information',
                    'content': 'Your information is used to: process bookings and payments, communicate about your reservations, send promotional offers (with your consent), maintain safety records and waivers, improve our services, and comply with legal obligations.'
                },
                {
                    'title': 'Data Security',
                    'content': 'We implement industry-standard security measures to protect your personal information. Payment data is processed through secure, PCI-compliant payment gateways. However, no method of transmission over the internet is 100% secure.'
                },
                {
                    'title': 'Information Sharing',
                    'content': 'We do not sell or rent your personal information to third parties. We may share information with: payment processors for transactions, emergency services if required for safety, legal authorities when required by law, and service providers who assist in our operations (under strict confidentiality agreements).'
                },
                {
                    'title': 'Data Retention',
                    'content': 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Waiver forms are kept for 7 years as required by law.'
                },
                {
                    'title': 'Your Rights',
                    'content': 'You have the right to: access your personal data, request corrections to inaccurate information, request deletion of your data (subject to legal requirements), opt-out of marketing communications, and withdraw consent for data processing.'
                },
                {
                    'title': 'Cookies & Tracking',
                    'content': 'Our website uses cookies to enhance user experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.'
                },
                {
                    'title': 'Children\'s Privacy',
                    'content': 'We collect minimal information from children under 13, only as necessary for safety and booking purposes, always with parental consent. Parents have the right to review and request deletion of their child\'s information.'
                },
                {
                    'title': 'Changes to Privacy Policy',
                    'content': 'We may update this privacy policy periodically. Significant changes will be communicated via email or website notice. Continued use of our services constitutes acceptance of the updated policy.'
                },
                {
                    'title': 'Contact Us',
                    'content': 'For privacy-related questions or to exercise your rights, contact us at: Email: privacy@ninjapark.com, Phone: +91 98454 71611, Address: Gopalan Innovation Mall, Bangalore'
                }
            ],
            'active': True
        },
        {
            'document_type': 'WAIVER_TERMS',
            'title': 'Waiver Terms & Conditions',
            'intro': 'Additional terms specific to the waiver agreement.',
            'sections': [
                {
                    'title': 'Waiver Validity',
                    'content': 'This waiver is valid for one calendar year from the date of signing. Participants must sign a new waiver annually or if there are significant changes to health status.'
                },
                {
                    'title': 'Electronic Signatures',
                    'content': 'Electronic signatures are legally binding and have the same effect as handwritten signatures. By signing electronically, you confirm your identity and intent to be bound by this agreement.'
                },
                {
                    'title': 'Waiver Requirements',
                    'content': 'All participants must have a signed waiver on file before entry. No exceptions will be made. Waivers can be completed online in advance or at the facility before your session.'
                },
                {
                    'title': 'Guardian Responsibility',
                    'content': 'Parents or legal guardians must sign waivers for all participants under 18 years of age. The guardian signing the waiver must be present during the minor\'s visit.'
                },
                {
                    'title': 'Waiver Storage',
                    'content': 'Signed waivers are stored securely in our system for 7 years as required by law. You may request a copy of your signed waiver at any time.'
                }
            ],
            'active': True
        },
        {
            'document_type': 'DETAILED_RULES',
            'title': 'Detailed Park Rules',
            'intro': 'Comprehensive rules and regulations for all participants.',
            'sections': [
                {
                    'title': 'Entry Requirements',
                    'content': 'Valid booking confirmation required. Grip socks mandatory (available for purchase). Waiver must be signed before entry. Arrive 15 minutes before session start time. Late arrivals may result in reduced session time.'
                },
                {
                    'title': 'Dress Code',
                    'content': 'Wear comfortable athletic clothing. Remove all jewelry, watches, glasses, and sharp objects. Tie long hair back. No shoes allowed in play areas (grip socks only). No loose clothing that could catch on equipment.'
                },
                {
                    'title': 'Prohibited Items',
                    'content': 'Food and drinks (except water in sealed bottles). Chewing gum. Electronic devices in play areas. Sharp objects of any kind. Bags or backpacks (use lockers). Outside equipment or toys.'
                },
                {
                    'title': 'Behavior Rules',
                    'content': 'Follow all staff instructions immediately. No pushing, shoving, or rough play. One person on slides at a time. No running in non-play areas. No climbing on safety barriers. Respect other participants. No inappropriate language or behavior.'
                },
                {
                    'title': 'Safety Zones',
                    'content': 'Toddler Zone (1-7 years): Dedicated area for young children. Main Zones (8+ years): Age-appropriate challenges. Respect zone boundaries. Do not enter zones not suitable for your age/size.'
                },
                {
                    'title': 'Supervision Requirements',
                    'content': 'Children under 12 must have adult supervision. Supervising adults must remain on premises. One adult can supervise maximum 4 children. Adults must be able to respond quickly in emergencies.'
                },
                {
                    'title': 'Health & Hygiene',
                    'content': 'Wash hands before entering play areas. Use hand sanitizer stations provided. Cover coughs and sneezes. Do not participate if feeling unwell. Inform staff immediately of any accidents or spills.'
                },
                {
                    'title': 'Emergency Procedures',
                    'content': 'In case of emergency, follow staff instructions. Know the location of emergency exits. First aid available on-site. Emergency contact numbers posted throughout facility. Do not leave premises without informing staff in emergencies.'
                },
                {
                    'title': 'Capacity Limits',
                    'content': 'Maximum capacity enforced for safety. Wait your turn if an area is full. Time limits may be imposed during busy periods. Staff have final say on capacity decisions.'
                },
                {
                    'title': 'Consequences of Rule Violations',
                    'content': 'First violation: Verbal warning. Second violation: Temporary removal from activity. Third violation: Removal from park without refund. Serious violations: Immediate removal and potential ban. No refunds for rule violations.'
                }
            ],
            'active': True
        }
    ]
    
    created = 0
    updated = 0
    
    for doc_data in documents:
        doc, created_flag = LegalDocument.objects.update_or_create(
            document_type=doc_data['document_type'],
            defaults=doc_data
        )
        if created_flag:
            created += 1
            print(f"  ✓ Created: {doc.title}")
        else:
            updated += 1
            print(f"  ↻ Updated: {doc.title}")
    
    print(f"\n  ✅ Total: {created} created, {updated} updated")
    return created + updated

def main():
    print("=" * 70)
    print("🚀 POPULATING LEGAL DOCUMENTS FOR GUIDELINES PAGE")
    print("=" * 70)
    
    try:
        # Populate legal documents
        total = populate_legal_documents()
        
        print("\n" + "=" * 70)
        print("✅ ALL LEGAL DOCUMENTS POPULATED!")
        print("=" * 70)
        
        print("\n📊 Summary:")
        print(f"  • GuidelineCategories: {GuidelineCategory.objects.count()} (Safety Guidelines)")
        print(f"  • LegalDocuments: {LegalDocument.objects.count()} (Terms, Waivers, Privacy)")
        
        print("\n📍 Django Admin:")
        print("  • Guidelines: http://localhost:8000/admin/cms/guidelinecategory/")
        print("  • Legal Docs: http://localhost:8000/admin/cms/legaldocument/")
        
        print("\n📍 Frontend:")
        print("  • Guidelines Page: http://localhost:5000/guidelines")
        
        print("\n🎯 What's in the database:")
        for doc in LegalDocument.objects.all():
            print(f"  • {doc.get_document_type_display()}: {len(doc.sections)} sections")
        
        print()
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())

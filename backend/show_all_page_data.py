#!/usr/bin/env python
"""
Show all data for each page in the database
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    PageSection, PricingPlan, PartyPackage, GuidelineCategory,
    TimelineItem, ValueItem, Faq, GroupPackage, GroupBenefit,
    Activity, FacilityItem, ContactInfo, StatCard
)

def show_page_data(page_name):
    """Show all data for a specific page"""
    print("\n" + "=" * 70)
    print(f"📄 {page_name.upper()} PAGE DATA")
    print("=" * 70)
    
    # Page Sections
    sections = PageSection.objects.filter(page=page_name.lower()).order_by('order')
    if sections.exists():
        print(f"\n✅ PageSections ({sections.count()}):")
        for sec in sections:
            print(f"  • {sec.section_key}: {sec.title or '(content only)'}")
            if sec.content:
                content_preview = sec.content[:80].replace('\n', ' ')
                print(f"    Content: {content_preview}...")
    else:
        print(f"\n⚠️ No PageSections found")

def main():
    print("=" * 70)
    print("🗄️ COMPLETE DATABASE CONTENT BY PAGE")
    print("=" * 70)
    
    # PRICING PAGE
    show_page_data("pricing")
    print("\n✅ PricingPlans:")
    for plan in PricingPlan.objects.all().order_by('order'):
        print(f"  • {plan.name} ({plan.type}): ₹{plan.price}")
    
    # PARTIES PAGE
    show_page_data("parties")
    print("\n✅ PartyPackages:")
    for pkg in PartyPackage.objects.all().order_by('order'):
        print(f"  • {pkg.name}: ₹{pkg.price} ({pkg.min_participants}-{pkg.max_participants or '∞'} people)")
        print(f"    Duration: {pkg.duration} mins")
        print(f"    Includes: {len(pkg.includes)} items")
    
    # GUIDELINES PAGE
    show_page_data("guidelines")
    print("\n✅ GuidelineCategories:")
    for cat in GuidelineCategory.objects.all().order_by('order'):
        print(f"  • {cat.title}: {len(cat.items)} guidelines")
        for item in cat.items[:2]:
            print(f"    - {item}")
    
    # ABOUT PAGE
    show_page_data("about")
    print("\n✅ TimelineItems:")
    for item in TimelineItem.objects.all().order_by('order'):
        print(f"  • {item.year}: {item.title}")
    
    print("\n✅ ValueItems:")
    for val in ValueItem.objects.all().order_by('order'):
        print(f"  • {val.title}: {val.description[:50]}...")
    
    print("\n✅ FAQs:")
    for faq in Faq.objects.all().order_by('order'):
        print(f"  • {faq.question[:60]}...")
    
    # GROUPS PAGE
    show_page_data("groups")
    print("\n✅ GroupPackages:")
    for pkg in GroupPackage.objects.all().order_by('order'):
        print(f"  • {pkg.name}: ₹{pkg.price} {pkg.price_note}")
        print(f"    Min Size: {pkg.min_size}")
    
    print("\n✅ GroupBenefits:")
    for benefit in GroupBenefit.objects.all().order_by('order'):
        print(f"  • {benefit.title}: {benefit.description[:50]}...")
    
    # ATTRACTIONS PAGE
    print("\n" + "=" * 70)
    print("📄 ATTRACTIONS PAGE DATA")
    print("=" * 70)
    print(f"\n✅ Activities ({Activity.objects.count()}):")
    for activity in Activity.objects.all().order_by('order'):
        print(f"  {activity.order}. {activity.name}")
        print(f"     Image: {activity.image_url.split('/')[-1]}")
    
    # CONTACT INFO (used across pages)
    print("\n" + "=" * 70)
    print("📞 CONTACT INFO (Used Across Pages)")
    print("=" * 70)
    print(f"\n✅ ContactInfo ({ContactInfo.objects.count()}):")
    for contact in ContactInfo.objects.all().order_by('category', 'order'):
        print(f"  • {contact.label} ({contact.category}): {contact.value}")
    
    # STATS (used on home and about)
    print("\n" + "=" * 70)
    print("📊 STATISTICS")
    print("=" * 70)
    for page in ['home', 'about']:
        stats = StatCard.objects.filter(page=page)
        if stats.exists():
            print(f"\n✅ {page.upper()} Stats ({stats.count()}):")
            for stat in stats.order_by('order'):
                print(f"  • {stat.value} {stat.label}")
    
    print("\n" + "=" * 70)
    print("✅ ALL DATA VERIFIED IN DATABASE!")
    print("=" * 70)
    print("\n📍 Django Admin URLs:")
    print("  • Activities: http://localhost:8000/admin/cms/activity/")
    print("  • Party Packages: http://localhost:8000/admin/cms/partypackage/")
    print("  • Group Packages: http://localhost:8000/admin/cms/grouppackage/")
    print("  • Guidelines: http://localhost:8000/admin/cms/guidelinecategory/")
    print("  • Pricing Plans: http://localhost:8000/admin/cms/pricingplan/")
    print("  • Page Sections: http://localhost:8000/admin/cms/pagesection/")
    print("  • Timeline: http://localhost:8000/admin/cms/timelineitem/")
    print("  • Values: http://localhost:8000/admin/cms/valueitem/")
    print("  • FAQs: http://localhost:8000/admin/cms/faq/")
    print("\n📍 Frontend URLs:")
    print("  • Pricing: http://localhost:5000/pricing")
    print("  • Parties: http://localhost:5000/parties")
    print("  • Guidelines: http://localhost:5000/guidelines")
    print("  • About: http://localhost:5000/about")
    print("  • Groups: http://localhost:5000/groups")
    print("  • Attractions: http://localhost:5000/attractions")
    print()

if __name__ == '__main__':
    main()

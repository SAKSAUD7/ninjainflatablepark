from django.contrib import admin
from .models import (
    Banner, Activity, Faq, SocialLink, GalleryItem,
    StatCard, InstagramReel, MenuSection, GroupPackage, GuidelineCategory, LegalDocument,
    PageSection, PricingPlan, ContactInfo, PartyPackage, TimelineItem, ValueItem, FacilityItem,
    Page
)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'active', 'order', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['title']
    ordering = ['order', '-created_at']

# Activity admin registration removed - use Attractions in frontend CMS instead
# @admin.register(Activity)
# class ActivityAdmin(admin.ModelAdmin):
#     list_display = ['name', 'active', 'order', 'created_at']
#     list_filter = ['active', 'created_at']
#     search_fields = ['name', 'description']
#     ordering = ['order', '-created_at']

@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'active', 'order']
    list_filter = ['active', 'category']
    search_fields = ['question', 'answer']
    ordering = ['order']



@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'active', 'order']
    list_filter = ['active', 'platform']
    ordering = ['order']

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['slug', 'title', 'active', 'updated_at']
    search_fields = ['slug', 'title']
    list_filter = ['active']

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'active', 'order']
    list_filter = ['active', 'category']
    search_fields = ['title']
    ordering = ['order', '-created_at']

@admin.register(StatCard)
class StatCardAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'unit', 'page', 'active', 'order']
    list_filter = ['page', 'active']
    search_fields = ['label', 'value', 'unit']
    ordering = ['page', 'order']

@admin.register(InstagramReel)
class InstagramReelAdmin(admin.ModelAdmin):
    list_display = ['title', 'active', 'order']
    list_filter = ['active']
    search_fields = ['title']
    ordering = ['order']

@admin.register(MenuSection)
class MenuSectionAdmin(admin.ModelAdmin):
    list_display = ['category', 'active', 'order']
    list_filter = ['active']
    search_fields = ['category']
    ordering = ['order']

@admin.register(GroupPackage)
class GroupPackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'min_size', 'popular', 'active', 'order']
    list_filter = ['popular', 'active']
    search_fields = ['name', 'subtitle']
    ordering = ['order']
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'subtitle', 'min_size', 'icon', 'active', 'order')
        }),
        ('Pricing', {
            'fields': ('price', 'price_note')
        }),
        ('Details', {
            'fields': ('features', 'color', 'popular')
        }),
    )

@admin.register(GuidelineCategory)
class GuidelineCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'active', 'order']
    list_filter = ['active']
    search_fields = ['title']
    ordering = ['order']

@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
    list_display = ['document_type', 'title', 'active', 'updated_at']
    list_filter = ['document_type', 'active']
    search_fields = ['title']
    ordering = ['document_type']

@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    list_display = ['page', 'section_key', 'title', 'active', 'order']
    list_filter = ['page', 'active']
    search_fields = ['title', 'content', 'page', 'section_key']
    ordering = ['page', 'order']
    fieldsets = (
        ('Identification', {
            'fields': ('page', 'section_key', 'active', 'order')
        }),
        ('Content', {
            'fields': ('title', 'subtitle', 'content')
        }),
        ('Media', {
            'fields': ('image_url', 'video_url')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_link'),
            'classes': ('collapse',)
        }),
    )

@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'price', 'duration', 'popular', 'active', 'order']
    list_filter = ['type', 'popular', 'active']
    search_fields = ['name', 'description']
    ordering = ['type', 'order']
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'type', 'age_group', 'active', 'order')
        }),
        ('Pricing', {
            'fields': ('price', 'duration', 'period_text')
        }),
        ('Details', {
            'fields': ('description', 'features', 'popular', 'variant')
        }),
    )

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['label', 'category', 'value', 'active', 'order']
    list_filter = ['category', 'active']
    search_fields = ['label', 'value', 'key']
    ordering = ['category', 'order']

@admin.register(PartyPackage)
class PartyPackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'min_participants', 'duration', 'popular', 'active', 'order']
    list_filter = ['popular', 'active']
    search_fields = ['name', 'description']
    ordering = ['order']
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'description', 'image_url', 'active', 'order')
        }),
        ('Pricing & Capacity', {
            'fields': ('price', 'min_participants', 'max_participants', 'duration')
        }),
        ('Details', {
            'fields': ('includes', 'addons', 'popular', 'variant')
        }),
    )

@admin.register(TimelineItem)
class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'active', 'order']
    list_filter = ['active', 'year']
    search_fields = ['title', 'description']
    ordering = ['order']

@admin.register(ValueItem)
class ValueItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'color', 'active', 'order']
    list_filter = ['active', 'color']
    search_fields = ['title', 'description']
    ordering = ['order']

@admin.register(FacilityItem)
class FacilityItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'active', 'order']
    list_filter = ['active']
    search_fields = ['title', 'description']
    ordering = ['order']

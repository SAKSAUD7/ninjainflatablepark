from django.contrib import admin
from .models import Banner, Activity, Faq, Testimonial, StaticPage, SocialLink, GalleryItem

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'active', 'order', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['title']
    ordering = ['order', '-created_at']

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['name', 'active', 'order', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', '-created_at']

@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'active', 'order']
    list_filter = ['active', 'category']
    search_fields = ['question', 'answer']
    ordering = ['order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'rating', 'type', 'active', 'created_at']
    list_filter = ['active', 'type', 'rating']
    search_fields = ['name', 'content']
    ordering = ['-created_at']

@admin.register(StaticPage)
class StaticPageAdmin(admin.ModelAdmin):
    list_display = ['slug', 'title', 'published', 'updated_at']
    list_filter = ['published']
    search_fields = ['title', 'slug', 'content']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'active', 'order']
    list_filter = ['active', 'platform']
    ordering = ['order']

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'active', 'order']
    list_filter = ['active', 'category']
    search_fields = ['title']
    ordering = ['order', '-created_at']

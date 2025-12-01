from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    link = models.URLField(null=True, blank=True)
    active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Activity(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField()
    active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Faq(models.Model):
    question = models.TextField()
    answer = models.TextField()
    category = models.CharField(max_length=100, null=True, blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question[:50]

class Testimonial(models.Model):
    TYPE_CHOICES = [
        ('TEXT', 'Text'),
        ('VIDEO', 'Video'),
    ]
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    image_url = models.URLField(null=True, blank=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='TEXT')
    video_url = models.URLField(null=True, blank=True)
    thumbnail_url = models.URLField(null=True, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class StaticPage(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    content = models.TextField() # HTML content
    published = models.BooleanField(default=False)
    meta_title = models.CharField(max_length=255, null=True, blank=True)
    meta_desc = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.slug

class SocialLink(models.Model):
    platform = models.CharField(max_length=50)
    url = models.URLField()
    icon = models.CharField(max_length=50, null=True, blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.platform

class GalleryItem(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    image_url = models.URLField()
    category = models.CharField(max_length=100, null=True, blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title or "Gallery Item"

class FreeEntry(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, null=True, blank=True)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Free Entry: {self.name}"

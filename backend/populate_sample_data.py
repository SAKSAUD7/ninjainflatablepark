from apps.cms.models import Banner, Activity, Testimonial, GalleryItem, SocialLink
from apps.core.models import GlobalSettings

# Create sample banners
Banner.objects.create(
    title="Welcome to Ninja Inflatable Park",
    image_url="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1920&h=600&fit=crop",
    active=True,
    order=1
)

Banner.objects.create(
    title="Book Your Adventure Today",
    image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=600&fit=crop",
    active=True,
    order=2
)

# Create sample activities
Activity.objects.create(
    name="Obstacle Course",
    description="Navigate through our challenging inflatable obstacle course with slides, tunnels, and climbing walls!",
    image_url="https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=800&h=600&fit=crop",
    active=True,
    order=1
)

Activity.objects.create(
    name="Bounce Arena",
    description="Jump and bounce in our massive inflatable arena - perfect for all ages!",
    image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    active=True,
    order=2
)

Activity.objects.create(
    name="Mega Slide",
    description="Experience the thrill of our giant inflatable slide - the tallest in the region!",
    image_url="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=600&fit=crop",
    active=True,
    order=3
)

# Create sample testimonials
Testimonial.objects.create(
    name="Priya Sharma",
    role="Parent",
    content="Amazing experience! My kids had the time of their lives. The staff was friendly and the place was clean and safe.",
    rating=5,
    image_url="https://i.pravatar.cc/150?img=1",
    type="TEXT",
    active=True
)

Testimonial.objects.create(
    name="Rahul Verma",
    role="Birthday Party Host",
    content="Hosted my son's 8th birthday here and it was perfect! The party package was great value and all the kids loved it.",
    rating=5,
    image_url="https://i.pravatar.cc/150?img=2",
    type="TEXT",
    active=True
)

Testimonial.objects.create(
    name="Anita Desai",
    role="Visitor",
    content="Great place for family fun! Adults can enjoy too. Highly recommend for a weekend outing.",
    rating=5,
    image_url="https://i.pravatar.cc/150?img=3",
    type="TEXT",
    active=True
)

# Create sample gallery items
GalleryItem.objects.create(
    title="Kids Having Fun",
    image_url="https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=600&h=400&fit=crop",
    category="Activities",
    active=True,
    order=1
)

GalleryItem.objects.create(
    title="Obstacle Course Action",
    image_url="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    category="Activities",
    active=True,
    order=2
)

GalleryItem.objects.create(
    title="Birthday Party Fun",
    image_url="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=400&fit=crop",
    category="Parties",
    active=True,
    order=3
)

GalleryItem.objects.create(
    title="Family Time",
    image_url="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    category="General",
    active=True,
    order=4
)

# Create social links
SocialLink.objects.create(
    platform="Facebook",
    url="https://facebook.com/ninjainflatablepark",
    icon="facebook",
    active=True,
    order=1
)

SocialLink.objects.create(
    platform="Instagram",
    url="https://instagram.com/ninjainflatablepark",
    icon="instagram",
    active=True,
    order=2
)

SocialLink.objects.create(
    platform="Twitter",
    url="https://twitter.com/ninjainflatablepark",
    icon="twitter",
    active=True,
    order=3
)

print("Sample data created successfully!")

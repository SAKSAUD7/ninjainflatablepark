"""
Management command to populate Activity model with frontend attraction data
Run with: python manage.py populate_attractions
"""

from django.core.management.base import BaseCommand
from apps.cms.models import Activity


class Command(BaseCommand):
    help = 'Populates Activity model with frontend attraction data'

    def handle(self, *args, **options):
        self.stdout.write('Populating attractions...')

        attractions_data = [
            {
                'name': 'Ninja Obstacle Course',
                'slug': 'ninja-obstacle-course',
                'short_description': 'Ultimate ninja warrior-style inflatable course',
                'description': 'Test your agility and strength on our ultimate ninja warrior-style inflatable course. Climb, jump, and conquer!',
                'image_url': 'http://localhost:8000/media/uploads/img-3.jpg',
                'active': True,
                'order': 1,
            },
            {
                'name': 'Giant Slides',
                'slug': 'giant-slides',
                'short_description': 'Massive inflatable slides with multiple lanes',
                'description': 'Experience the thrill of our massive inflatable slides. Race your friends down multiple lanes!',
                'image_url': 'http://localhost:8000/media/uploads/img-1.jpg',
                'active': True,
                'order': 2,
            },
            {
                'name': 'Wipe-Out Challenge',
                'slug': 'wipe-out-challenge',
                'short_description': 'Balance through spinning obstacles',
                'description': 'Can you stay balanced? Navigate the spinning obstacles without falling into the soft landing zone!',
                'image_url': 'http://localhost:8000/media/uploads/img-2.jpg',
                'active': True,
                'order': 3,
            },
            {
                'name': 'Inflatable Maze',
                'slug': 'inflatable-maze',
                'short_description': 'Colorful maze with twists and turns',
                'description': 'Get lost in our colorful maze! Find your way through twists, turns, and surprise obstacles.',
                'image_url': 'http://localhost:8000/media/uploads/img-4.jpg',
                'active': True,
                'order': 4,
            },
            {
                'name': 'Giant Jumping Balls',
                'slug': 'giant-jumping-balls',
                'short_description': 'Oversized jumping balls for all ages',
                'description': 'Bounce to new heights on our oversized jumping balls. Perfect for all ages!',
                'image_url': 'http://localhost:8000/media/uploads/img-5.jpg',
                'active': True,
                'order': 5,
            },
            {
                'name': 'Dinosaur Guard',
                'slug': 'dinosaur-guard',
                'short_description': 'Prehistoric adventure zone',
                'description': 'Navigate past the inflatable dinosaurs in this prehistoric adventure zone!',
                'image_url': 'http://localhost:8000/media/uploads/img-6.jpg',
                'active': True,
                'order': 6,
            },
            {
                'name': 'Balance Beam Challenge',
                'slug': 'balance-beam',
                'short_description': 'Test your balance skills',
                'description': "Test your balance skills on our inflatable beam. Don't fall off!",
                'image_url': 'http://localhost:8000/media/uploads/img-7.jpg',
                'active': True,
                'order': 7,
            },
            {
                'name': 'Jelly Bead Zone',
                'slug': 'jelly-bead-zone',
                'short_description': 'Sensory experience with soft jelly beads',
                'description': 'Dive into thousands of soft, colorful jelly beads. A sensory experience like no other!',
                'image_url': 'http://localhost:8000/media/uploads/img-8.jpg',
                'active': True,
                'order': 8,
            },
            {
                'name': 'Inflatable Climbing Wall',
                'slug': 'climbing-wall',
                'short_description': 'Scale the heights safely',
                'description': 'Scale the heights on our safe, inflatable climbing wall. Reach the summit!',
                'image_url': 'http://localhost:8000/media/uploads/img-10.jpg',
                'active': True,
                'order': 9,
            },
            {
                'name': 'Spider Wall',
                'slug': 'spider-wall',
                'short_description': 'Stick and climb like a spider',
                'description': 'Stick to the wall like a spider! Jump and see how high you can climb.',
                'image_url': 'http://localhost:8000/media/uploads/img-9.png',
                'active': True,
                'order': 10,
            },
            {
                'name': 'Wave Bed',
                'slug': 'wave-bed',
                'short_description': 'Bouncy inflatable bed for groups',
                'description': 'Ride the waves on our bouncy inflatable bed. Perfect for group fun!',
                'image_url': 'http://localhost:8000/media/uploads/img-1.jpg',
                'active': True,
                'order': 11,
            },
        ]

        created_count = 0
        updated_count = 0

        for data in attractions_data:
            activity, created = Activity.objects.update_or_create(
                slug=data['slug'],
                defaults=data
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Created: {activity.name}'))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'↻ Updated: {activity.name}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! Created {created_count} new attractions, updated {updated_count} existing ones.'
        ))
        self.stdout.write(self.style.SUCCESS(
            f'Total attractions in database: {Activity.objects.count()}'
        ))

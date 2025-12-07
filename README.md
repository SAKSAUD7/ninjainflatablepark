# Ninja Inflatable Park - Management System

A comprehensive web-based management system for Ninja Inflatable Park, featuring session bookings, party bookings, waiver management, and a full CMS.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14.1.0 (React 18)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: Django 5.0+
- **API**: Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Documentation**: DRF Spectacular (OpenAPI/Swagger)
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Image Processing**: Pillow
- **PDF Generation**: ReportLab

---

## 📁 Project Structure

```
ninjainflatablepark-4/
├── backend/                 # Django backend
│   ├── apps/
│   │   ├── bookings/       # Session & party bookings
│   │   ├── cms/            # Content management
│   │   ├── core/           # User auth & core models
│   │   └── shop/           # E-commerce (future)
│   ├── media/              # Uploaded images
│   ├── ninja_backend/      # Django settings
│   ├── db.sqlite3          # Database
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── (main)/        # Public pages
│   │   └── (admin-portal)/ # Admin panel
│   ├── components/         # React components
│   ├── lib/               # Utilities
│   ├── public/            # Static assets
│   └── package.json
│
└── packages/              # Shared packages
    ├── ui/                # UI components
    └── config/            # Shared config
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd ninjainflatablepark-4
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:5000`

---

## 🔑 Admin Access

### Frontend Admin Panel
- URL: `http://localhost:5000/admin`
- Login with your superuser credentials

### Django Admin
- URL: `http://localhost:8000/admin`
- Full database access

---

## 🎯 Features

### Public Website
- ✅ Homepage with hero section
- ✅ About page
- ✅ Attractions showcase
- ✅ Facilities information
- ✅ Pricing plans
- ✅ Party packages
- ✅ Guidelines & safety
- ✅ Group bookings
- ✅ Contact form
- ✅ Session booking system
- ✅ Party booking system
- ✅ Digital waiver signing

### Admin Panel
- ✅ Dashboard with analytics
- ✅ Session bookings management
- ✅ Party bookings management
- ✅ Waiver management
- ✅ Customer database
- ✅ CMS for all content
- ✅ Settings management
- ✅ User management

### Backend API
- ✅ RESTful API
- ✅ JWT authentication
- ✅ OpenAPI documentation
- ✅ CORS configured
- ✅ Media file handling

---

## 🚀 Deployment

### Production Checklist

#### Backend
1. Set `DEBUG = False` in `settings.py`
2. Configure `ALLOWED_HOSTS`
3. Generate new `SECRET_KEY`
4. Migrate to PostgreSQL
5. Configure static files
6. Set up HTTPS

#### Frontend
1. Build production bundle:
   ```bash
   npm run build
   npm start
   ```
2. Configure environment variables
3. Set up CDN for static assets

### Recommended Hosting
- **Backend**: Azure App Service / Heroku / Railway
- **Frontend**: Vercel / Netlify / Azure Static Web Apps
- **Database**: Azure Database for PostgreSQL
- **Media**: Azure Blob Storage / AWS S3

---

## 📊 Database Schema

### Main Models
- **User**: Custom user model with email authentication
- **Booking**: Session bookings
- **PartyBooking**: Party bookings
- **Waiver**: Digital waivers
- **Customer**: Customer information
- **CMS Models**: Homepage, About, Attractions, etc.

---

## 🔧 Development

### Backend Commands
```bash
# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
python manage.py test
```

### Frontend Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/token/` - Get JWT token
- `POST /api/token/refresh/` - Refresh token

### Bookings
- `GET/POST /api/v1/bookings/bookings/` - Session bookings
- `GET/POST /api/v1/bookings/party-bookings/` - Party bookings
- `GET/POST /api/v1/bookings/waivers/` - Waivers

### CMS
- `GET /api/v1/cms/home/` - Homepage content
- `GET /api/v1/cms/about/` - About page content
- `GET /api/v1/cms/attractions/` - Attractions
- And more...

### Documentation
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

---

## 🔒 Security

- ✅ JWT authentication
- ✅ CORS configured
- ✅ CSRF protection
- ✅ Password hashing
- ⚠️ Set `DEBUG = False` in production
- ⚠️ Use strong `SECRET_KEY`
- ⚠️ Configure HTTPS

---

## 📝 Environment Variables

### Backend (.env)
```env
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Database Issues
```bash
# Reset database
python manage.py flush
python manage.py migrate
```

### Frontend Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

---

## 📞 Support

For issues or questions:
- Check existing documentation
- Review error logs
- Contact development team

---

## 📄 License

Proprietary - Ninja Inflatable Park

---

## 👥 Credits

**Developed for**: Ninja Inflatable Park  
**Technology**: Next.js, Django, React, PostgreSQL  
**Version**: 1.0.0

---

**Last Updated**: December 2025

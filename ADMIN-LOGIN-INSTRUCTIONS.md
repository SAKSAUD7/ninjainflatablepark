# Ninja Inflatable Park - Admin Login Instructions

## 🔐 **Admin Panel Access**

### **Custom Admin (Frontend)**
**URL**: `http://localhost:5000/admin`

**Credentials**:
```
Email: superadmin@ninjapark.com
Password: [Your actual password]
```

---

### **Django Admin (Backend)**
**URL**: `http://localhost:8000/admin`

**Superuser Accounts**:
```
Email: superadmin@ninjapark.com
Password: [Your actual password]
```

---

## 📋 **What You Can Access**

### Frontend Admin (`/admin`)
- Dashboard with stats
- All Bookings management
- Session Bookings
- Party Bookings
- Waivers management
- Customers
- CMS content editing
- Settings

### Django Admin (`/admin`)
- Full database access
- All models (Bookings, Waivers, CMS, etc.)
- User management
- Direct database editing

---

## 🚀 **Quick Start**

1. **Start Backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Admin**:
   - Frontend: `http://localhost:5000/admin`
   - Backend: `http://localhost:8000/admin`

---

## ⚠️ **Important Notes**

- **Production**: Change these credentials before deploying!
- **Security**: Never commit passwords to git
- **Backup**: Keep admin credentials in a secure location
- **Access**: Only share with authorized personnel

---

## 🔧 **Troubleshooting**

### Can't Login?
1. Clear browser cookies
2. Try incognito mode
3. Verify backend is running
4. Check database has superuser

### Forgot Password?
```bash
cd backend
python manage.py changepassword superadmin@ninjapark.com
```

---

**Last Updated**: December 2025
**Project**: Ninja Inflatable Park Management System

# Admin Credentials - SUPER_ADMIN Access

## 🔑 Login Credentials

### Email
```
admin@ninja.com
```

### Password  
```
admin123
```

### Alternative Account
```
Email: superadmin@ninja.com
Password: SuperAdmin@123
```

## ⚠️ IMPORTANT STEPS TO FIX THE ISSUE

The database has been updated, but you're seeing "VIEWER" because:
1. The JWT session cookie is caching the old role
2. The dev server might be locking the database

### Solution:

1. **Stop the dev server** (if running)
   - Press `Ctrl+C` in the terminal where `npm run dev` is running

2. **Clear browser cookies** for localhost:3000/admin
   - Or use Incognito/Private browsing mode

3. **Restart the dev server**
   ```
   npm run dev
   ```

4. **Login again** with the credentials above

5. You should now see **ALL** sidebar navigation options with SUPER_ADMIN access

## 🔧 If Still Not Working

Run this command to force-update the database:
```bash
node packages/database/force-fix-admin.js
```

Then repeat steps 1-4 above.

## 📋 What You Should See After Login

With SUPER_ADMIN access, the sidebar will show:
- ✅ Dashboard
- ✅ All Bookings  
- ✅ Session Bookings
- ✅ Party Bookings
- ✅ Customers
- ✅ Waivers
- ✅ Vouchers
- ✅ Activities
- ✅ Banners
- ✅ FAQs
- ✅ Settings
- ✅ Admin Users
- ✅ Activity Logs
- ✅ And all other options

The role shown in the header should be "SUPER_ADMIN" not "VIEWER".

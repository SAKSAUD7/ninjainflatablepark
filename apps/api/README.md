# Ninja Inflatable Park - Backend API

Complete Express.js backend API for the Ninja Inflatable Park admin system. This backend powers all admin features including bookings, waivers, calendar management, CMS, shop, and more.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based permissions
- **Bookings Management**: Session & party bookings with QR codes, voucher support
- **Waivers**: Individual adult/minor waiver management with signature upload
- **Calendar**: Availability checking, booking blocks, conflict detection
- **Customers**: Customer management with booking/waiver history
- **Vouchers**: Discount vouchers with validation and usage tracking
- **CMS**: Activities, banners, FAQs, testimonials, static pages, social links
- **Shop**: Product management with stock tracking
- **Settings**: Global settings management
- **Admin Users**: User and role management
- **Audit Logs**: Complete activity logging
- **File Uploads**: Image and PDF uploads with Multer

## 📋 Prerequisites

- Node.js 18+ and npm
- Existing database from `packages/database`

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd apps/api
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `JWT_SECRET` - Change to a secure random string (min 32 characters)
   - `PORT` - API server port (default: 4000)
   - `ALLOWED_ORIGINS` - Frontend URLs for CORS
   - Other optional settings

3. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

## 🏃 Running the Server

### Development Mode
```bash
npm run dev
```

Server will start on `http://localhost:4000` with hot reload.

### Production Mode
```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ninjapark.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": {...} },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### API Endpoints

#### Bookings
- `GET /api/bookings` - List all bookings (with pagination, filters)
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `GET /api/bookings/stats` - Dashboard statistics

#### Waivers
- `GET /api/waivers` - List all waivers
- `GET /api/waivers/adults` - List adult waivers
- `GET /api/waivers/minors` - List minor waivers
- `POST /api/waivers` - Create waiver
- `POST /api/waivers/:id/signature` - Upload signature

#### Customers
- `GET /api/customers` - List customers
- `GET /api/customers/:id` - Get customer details
- `GET /api/customers/:id/bookings` - Customer bookings
- `GET /api/customers/:id/waivers` - Customer waivers

#### Vouchers
- `GET /api/vouchers` - List vouchers
- `POST /api/vouchers` - Create voucher
- `POST /api/vouchers/validate` - Validate voucher code
- `GET /api/vouchers/:id/usage` - Voucher usage stats

#### Calendar
- `GET /api/calendar/availability` - Check availability
- `GET /api/calendar/blocks` - List booking blocks
- `POST /api/calendar/blocks` - Create booking block

#### CMS
- `GET /api/cms/activities` - List activities
- `GET /api/cms/banners` - List banners
- `GET /api/cms/faqs` - List FAQs
- `GET /api/cms/testimonials` - List testimonials
- `GET /api/cms/pages` - List static pages
- `GET /api/cms/social` - List social links

#### Shop
- `GET /api/shop/products` - List products
- `PATCH /api/shop/products/:id/stock` - Update stock

#### Settings
- `GET /api/settings` - Get global settings
- `PUT /api/settings` - Update settings

#### Admin Users
- `GET /api/admin-users` - List admin users
- `GET /api/admin-users/roles` - List roles
- `POST /api/admin-users` - Create admin user

#### Logs
- `GET /api/logs` - List audit logs

#### Uploads
- `POST /api/uploads` - Upload file

### Query Parameters

Most list endpoints support:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `search` - Search term
- Additional filters specific to each endpoint

### Response Format

Success response:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

Error response:
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🧪 Testing

### Run Smoke Tests
```bash
chmod +x scripts/smoke_test.sh
./scripts/smoke_test.sh
```

This will test:
- Authentication
- Booking creation
- Waiver creation
- Calendar blocks
- Voucher validation
- Dashboard stats
- All major endpoints

## 🗄️ Database Management

### Backup Database
```bash
chmod +x scripts/backup_sqlite.sh
./scripts/backup_sqlite.sh
```

Backups are stored in `backups/` directory with timestamps.

### Create Migration (Create-Only)
```bash
chmod +x scripts/migrate_create_only.sh
./scripts/migrate_create_only.sh <migration_name>
```

**IMPORTANT**: Review the generated SQL file before applying!

To apply migration:
```bash
cd ../../packages/database
npx prisma migrate deploy
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable origin whitelist
- **Rate Limiting**: 100 requests per 15 minutes
- **JWT**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM
- **File Upload Limits**: 5MB max file size

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── scripts/             # Utility scripts
├── uploads/             # File uploads directory
├── logs/                # Application logs
├── backups/             # Database backups
├── package.json
├── tsconfig.json
└── .env.example
```

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | Database path | file:../../packages/database/prisma/dev.db |
| `JWT_SECRET` | JWT secret key | (change in production!) |
| `JWT_EXPIRES_IN` | Token expiry | 7d |
| `ALLOWED_ORIGINS` | CORS origins | http://localhost:3000 |
| `MAX_FILE_SIZE` | Upload limit | 5242880 (5MB) |
| `USE_CLOUDINARY` | Use Cloudinary | false |

## 🚨 Troubleshooting

### Database Connection Error
```
Error: Database connection failed
```
**Solution**: Ensure `packages/database/prisma/dev.db` exists. Run `npm run db:generate` from the database package.

### Port Already in Use
```
Error: Port 4000 is already in use
```
**Solution**: Change `PORT` in `.env` or stop the process using port 4000.

### Authentication Failed
```
Error: Invalid or expired token
```
**Solution**: Login again to get a new token. Tokens expire after 7 days by default.

## 📝 Logging

Logs are stored in `logs/` directory:
- `app.log` - All logs
- `error.log` - Error logs only

Log level can be configured via `LOG_LEVEL` environment variable.

## 🔄 Rollback Instructions

If you need to rollback:

1. **Restore database backup:**
   ```bash
   cp backups/dev_TIMESTAMP.db ../../packages/database/prisma/dev.db
   ```

2. **Verify frontend still works:**
   ```bash
   cd ../web
   npm run dev
   ```

## 👥 Default Admin Credentials

**Email**: admin@ninjapark.com  
**Password**: admin123

**⚠️ IMPORTANT**: Change these credentials in production!

## 📄 License

Private - Ninja Inflatable Park

## 🤝 Support

For issues or questions, contact the development team.

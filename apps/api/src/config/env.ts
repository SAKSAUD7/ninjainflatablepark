import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Server
    port: parseInt(process.env.PORT || '4000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    databaseUrl: process.env.DATABASE_URL || 'file:../../packages/database/prisma/dev.db',

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    },

    // File Upload
    upload: {
        dir: process.env.UPLOAD_DIR || './uploads',
        maxSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
        allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(','),
    },

    // Cloudinary
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
        useCloudinary: process.env.USE_CLOUDINARY === 'true',
    },

    // CORS
    cors: {
        allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
    },

    // Rate Limiting
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || './logs/app.log',
    },

    // Admin Defaults
    defaultAdmin: {
        email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@ninjapark.com',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
    },
};

export default config;

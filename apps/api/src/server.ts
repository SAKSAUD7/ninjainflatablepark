
console.log("STARTING SERVER - NEW CODE VERIFICATION");
import config from './config/env'; // Load env vars first
import app from './app';
import logger from './middlewares/logger.middleware';
import { prisma } from '@repo/database';

const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        logger.info('✅ Database connected successfully');

        // Start server
        const server = app.listen(config.port, () => {
            console.log('DEBUG: CWD:', process.cwd());
            console.log('DEBUG: DATABASE_URL:', process.env.DATABASE_URL);
            logger.info(`🚀 Server running on http://localhost:${config.port}`);
            logger.info(`📝 Environment: ${config.nodeEnv}`);
            logger.info(`🗄️  Database URL: ${process.env.DATABASE_URL}`);
            logger.info(`🔒 CORS enabled for: ${config.cors.allowedOrigins.join(', ')}`);
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal: string) => {
            logger.info(`${signal} received. Starting graceful shutdown...`);

            server.close(async () => {
                logger.info('HTTP server closed');

                await prisma.$disconnect();
                logger.info('Database connection closed');

                process.exit(0);
            });

            // Force shutdown after 10 seconds
            setTimeout(() => {
                logger.error('Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Set DATABASE_URL if not already set (workaround for monorepo env loading)
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:C:/Users/saksa/OneDrive/Desktop/ninja/ninjainflatablepark-4/packages/database/dev.db";
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";

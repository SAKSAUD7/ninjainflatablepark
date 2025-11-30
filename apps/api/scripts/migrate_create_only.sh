#!/bin/bash

# Create Prisma Migration (Create-Only Mode)
# This script generates a migration without applying it

if [ -z "$1" ]; then
    echo "❌ Error: Migration name is required"
    echo "Usage: ./migrate_create_only.sh <migration_name>"
    exit 1
fi

MIGRATION_NAME=$1

echo "📝 Creating migration: $MIGRATION_NAME"
echo "⚠️  This will NOT apply the migration automatically"
echo ""

# Navigate to database package
cd ../../packages/database

# Create migration without applying
npx prisma migrate dev --create-only --name "$MIGRATION_NAME"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration created successfully"
    echo "📂 Location: packages/database/prisma/migrations/"
    echo ""
    echo "⚠️  IMPORTANT: Review the migration SQL file before applying!"
    echo "To apply the migration, run: cd packages/database && npx prisma migrate deploy"
else
    echo "❌ Error: Migration creation failed"
    exit 1
fi

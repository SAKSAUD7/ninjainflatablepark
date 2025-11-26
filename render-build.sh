#!/usr/bin/env bash
# exit on error
set -o errexit

echo "📦 Installing dependencies..."
npm install

echo "🔄 Generating Prisma Client..."
npx turbo run db:generate

echo "🗄️  Pushing database schema..."
# We use db push for SQLite to ensure the file is created/updated
npx turbo run db:push

echo "🌱 Seeding database..."
npx turbo run db:seed

echo "🏗️  Building web application..."
npx turbo run build --filter=web

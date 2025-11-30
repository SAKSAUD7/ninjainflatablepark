#!/bin/bash

# Backup SQLite Database Script
# This script creates a timestamped backup of the dev.db file

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_PATH="../../packages/database/prisma/dev.db"

# Create backups directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "❌ Error: Database file not found at $DB_PATH"
    exit 1
fi

# Create backup
cp "$DB_PATH" "$BACKUP_DIR/dev_${TIMESTAMP}.db"

if [ $? -eq 0 ]; then
    echo "✅ Backup created successfully: $BACKUP_DIR/dev_${TIMESTAMP}.db"
    
    # Get file size
    SIZE=$(du -h "$BACKUP_DIR/dev_${TIMESTAMP}.db" | cut -f1)
    echo "📦 Backup size: $SIZE"
    
    # List recent backups
    echo ""
    echo "📋 Recent backups:"
    ls -lht $BACKUP_DIR | head -6
else
    echo "❌ Error: Backup failed"
    exit 1
fi

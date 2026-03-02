#!/bin/bash

# Database Migration Script - Local Prisma Dev to AWS RDS
# Usage: bash scripts/migrate-to-rds.sh <RDS_PASSWORD>

set -e

# Configuration
RDSHOST="database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com"
RDS_PORT=5432
RDS_USER="postgres"
RDS_DBNAME="postgres"
LOCAL_HOST="localhost"
LOCAL_PORT=51214
LOCAL_USER="postgres"
LOCAL_PASSWORD="postgres"
LOCAL_DBNAME="template1"

# PostgreSQL tool paths
PG_BIN="/opt/homebrew/Cellar/postgresql@18/18.3/bin"
if [ ! -f "$PG_BIN/pg_dump" ]; then
    PG_BIN="/opt/homebrew/Cellar/postgresql@15/15.15_1/bin"
fi
if [ ! -f "$PG_BIN/pg_dump" ]; then
    PG_BIN="/opt/homebrew/Cellar/postgresql@14/14.20/bin"
fi
PG_DUMP="$PG_BIN/pg_dump"
PG_RESTORE="$PG_BIN/pg_restore"
PSQL="$PG_BIN/psql"

if [ ! -f "$PG_DUMP" ]; then
    echo "Error: PostgreSQL tools not found. Please install PostgreSQL:"
    echo "  brew install postgresql"
    exit 1
fi

# Check if password is provided
if [ -z "$1" ]; then
    echo "Error: RDS password is required"
    echo "Usage: bash scripts/migrate-to-rds.sh <RDS_PASSWORD>"
    exit 1
fi

RDS_PASSWORD="$1"

echo "================================"
echo "PostgreSQL Database Migration"
echo "================================"
echo ""
echo "Source: Local Prisma Dev Server"
echo "  Host: $LOCAL_HOST:$LOCAL_PORT"
echo "  Database: $LOCAL_DBNAME"
echo ""
echo "Destination: AWS RDS"
echo "  Host: $RDSHOST:$RDS_PORT"
echo "  Database: $RDS_DBNAME"
echo ""

# Step 1: Export data from local database
echo "[1/4] Exporting data from local database..."
PGPASSWORD="$LOCAL_PASSWORD" PGSSLMODE=disable "$PG_DUMP" \
  --host=$LOCAL_HOST \
  --port=$LOCAL_PORT \
  --username=$LOCAL_USER \
  --no-password \
  --format=custom \
  --file=/tmp/db-dump.backup \
  --verbose \
  $LOCAL_DBNAME

if [ $? -eq 0 ]; then
    echo "✓ Database exported successfully"
    ls -lh /tmp/db-dump.backup
else
    echo "✗ Failed to export database"
    exit 1
fi

echo ""

# Step 2: Create database on RDS if it doesn't exist
echo "[2/4] Creating database on AWS RDS (if needed)..."
PGPASSWORD="$RDS_PASSWORD" "$PSQL" \
  --host=$RDSHOST \
  --port=$RDS_PORT \
  --username=$RDS_USER \
  --dbname="postgres" \
  --command="CREATE DATABASE sri_saradi_scientific;" 2>/dev/null || echo "✓ Database already exists or created"

echo ""

# Step 3: Restore database to RDS
echo "[3/4] Restoring database to AWS RDS..."
echo "This may take a few minutes depending on database size..."
PGPASSWORD="$RDS_PASSWORD" "$PG_RESTORE" \
  --host=$RDSHOST \
  --port=$RDS_PORT \
  --username=$RDS_USER \
  --dbname="sri_saradi_scientific" \
  --verbose \
  /tmp/db-dump.backup

if [ $? -eq 0 ]; then
    echo "✓ Database restored successfully"
else
    echo "✗ Failed to restore database"
    exit 1
fi

echo ""

# Step 4: Verify connection
echo "[4/4] Verifying RDS connection..."
PGPASSWORD="$RDS_PASSWORD" "$PSQL" \
  --host=$RDSHOST \
  --port=$RDS_PORT \
  --username=$RDS_USER \
  --dbname="sri_saradi_scientific" \
  --command="SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';"

if [ $? -eq 0 ]; then
    echo "✓ Connection verified successfully"
else
    echo "✗ Failed to verify connection"
    exit 1
fi

echo ""
echo "================================"
echo "✓ Migration Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update your .env file with the new RDS connection string:"
echo ""
echo "   DATABASE_URL=\"postgres://$RDS_USER:<password>@$RDSHOST:$RDS_PORT/sri_saradi_scientific?sslmode=require\""
echo ""
echo "2. Restart your application"
echo "3. Clean up local dump file:"
echo "   rm /tmp/db-dump.backup"
echo ""

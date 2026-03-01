# Database Migration Guide: Local Prisma to AWS RDS

This guide will help you migrate your PostgreSQL database from the local Prisma dev server to AWS RDS.

## Prerequisites

1. **PostgreSQL Client Tools**: You need `pg_dump` and `pg_restore` installed
   ```bash
   # On macOS (using Homebrew)
   brew install postgresql

   # On Linux
   sudo apt-get install postgresql-client

   # On Windows
   # Download from: https://www.postgresql.org/download/windows/
   ```

2. **AWS RDS Instance**: Already created with the following details:
   - **Host**: `database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com`
   - **Port**: `5432`
   - **Username**: `postgres`
   - **Region**: `ap-south-2` (Asia Pacific - South Mumbai)
   - **Password**: You'll need to provide this (keep it secure)

3. **Network Access**: Ensure your machine can connect to RDS
   - Check AWS Security Group inbound rules
   - Allow port 5432 from your IP address

## Migration Steps

### Option 1: Using the Automated Migration Script (Recommended)

The easiest way to migrate is using the provided bash script:

```bash
# Navigate to project directory
cd "/Users/narayana/Documents/SOProjects/Sri Saradi Scientific/Website/sri-saradi-scientific"

# Run the migration script (replace <password> with your RDS password)
bash scripts/migrate-to-rds.sh "<your-rds-password>"
```

The script will:
1. ✓ Export data from local Prisma database
2. ✓ Create database on RDS (if needed)
3. ✓ Restore data to RDS
4. ✓ Verify the connection

### Option 2: Manual Migration Steps

If the script doesn't work, follow these manual steps:

#### Step 1: Export Data from Local Database

```bash
export PGPASSWORD="postgres"

pg_dump \
  --host=localhost \
  --port=51214 \
  --username=postgres \
  --no-password \
  --format=custom \
  --file=/tmp/db-dump.backup \
  template1

echo "✓ Database exported to /tmp/db-dump.backup"
```

#### Step 2: Create Database on RDS

```bash
export PGPASSWORD="<your-rds-password>"
export RDSHOST="database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com"

psql \
  --host=$RDSHOST \
  --port=5432 \
  --username=postgres \
  --dbname=postgres \
  --command="CREATE DATABASE sri_saradi_scientific;"

echo "✓ Database created on RDS"
```

#### Step 3: Restore Data to RDS

```bash
export PGPASSWORD="<your-rds-password>"
export RDSHOST="database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com"

pg_restore \
  --host=$RDSHOST \
  --port=5432 \
  --username=postgres \
  --dbname=sri_saradi_scientific \
  --verbose \
  /tmp/db-dump.backup

echo "✓ Database restored to RDS"
```

#### Step 4: Verify Connection

```bash
export PGPASSWORD="<your-rds-password>"
export RDSHOST="database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com"

psql \
  --host=$RDSHOST \
  --port=5432 \
  --username=postgres \
  --dbname=sri_saradi_scientific \
  --command="SELECT COUNT(*) as product_count FROM \"Product\";"
```

## Updating Application Configuration

### Step 1: Update `.env` File

Replace your current DATABASE_URL with the RDS connection string:

```bash
# OLD (Local Prisma):
# DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?..."

# NEW (AWS RDS):
DATABASE_URL="postgres://postgres:<your-password>@database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com:5432/sri_saradi_scientific?sslmode=require"

# Also update DIRECT_DATABASE_URL
DIRECT_DATABASE_URL="postgres://postgres:<your-password>@database-1.c1mgs0gukifd.ap-south-2.rds.amazonaws.com:5432/sri_saradi_scientific?sslmode=require"
```

### Step 2: (Optional) Setup SSL Certificate

For enhanced security, download the AWS RDS CA certificate:

```bash
# Download the certificate
mkdir -p /path/to/certs
cd /path/to/certs

curl -o global-bundle.pem https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem

# Update your connection string to include the certificate path:
# postgres://postgres:<password>@...?sslmode=verify-full&sslrootcert=/path/to/certs/global-bundle.pem
```

### Step 3: Regenerate Prisma Client

```bash
cd "/Users/narayana/Documents/SOProjects/Sri Saradi Scientific/Website/sri-saradi-scientific"

npx prisma generate
```

### Step 4: Restart Application

```bash
# Kill the old development server
pkill -f "npm run dev"

# Start the new development server
npm run dev
```

## Verification

Verify that your application is now using the RDS database:

```bash
# Check that data is accessible
curl http://localhost:3000/api/products?limit=1

# Should return products from your migrated database
```

## Troubleshooting

### Connection Refused
- **Issue**: `ECONNREFUSED`
- **Solution**: Check your security group allows inbound traffic on port 5432

### Authentication Failed
- **Issue**: `FATAL: password authentication failed`
- **Solution**: Verify you're using the correct RDS password

### SSL Certificate Error
- **Issue**: `self signed certificate`
- **Solution**: Use `sslmode=require` instead of `sslmode=verify-full` if you haven't set up the certificate

### Database Not Found
- **Issue**: `database "sri_saradi_scientific" does not exist`
- **Solution**: Run the create database command from Step 2

### Timeout Issues
- **Issue**: Connection timeout
- **Solution**: Check network connectivity and AWS Security Group rules

## Rollback (If Needed)

If you need to rollback to the local database:

1. Keep the local Prisma dev server running: `npx prisma dev`
2. Revert the DATABASE_URL in `.env` to the local connection string
3. Restart the application

## Next Steps

After successful migration:

1. **Monitor RDS Performance**: Use AWS CloudWatch
2. **Setup Automated Backups**: Configure RDS backup retention
3. **Enable Enhanced Monitoring**: Track database performance
4. **Consider Read Replicas**: For scaling read-heavy operations

## Security Best Practices

1. ✓ Use strong passwords for RDS
2. ✓ Rotate passwords regularly
3. ✓ Use SSL/TLS for connections
4. ✓ Restrict Security Group to necessary IPs
5. ✓ Enable CloudTrail for audit logging
6. ✓ Use AWS Secrets Manager for password management

## Support

For issues related to:
- **PostgreSQL**: Check PostgreSQL documentation
- **AWS RDS**: Check AWS RDS documentation
- **Prisma**: Check Prisma documentation on database connections

---

**Last Updated**: March 2, 2026
**Database Version**: PostgreSQL 13+
**RDS Endpoint**: ap-south-2 (Mumbai)

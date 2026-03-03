import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString =
  process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL!;

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  // Strip sslmode from the connection string so the explicit ssl config takes effect.
  // Newer pg-connection-string versions treat sslmode=require as verify-full,
  // which rejects AWS RDS self-signed certs — the explicit ssl object overrides this.
  const cleanConnectionString = connectionString.replace(/([?&])sslmode=[^&]*/g, "$1").replace(/[?&]$/, "");
  const pool = new pg.Pool({
    connectionString: cleanConnectionString,
    max: 1,
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter } as never);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

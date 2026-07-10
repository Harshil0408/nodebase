import { PrismaClient } from "@/generated/prisma-client/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const databaseUrl = process.env.DATABASE_URL;
const pooledDatabaseUrl = databaseUrl
  ? `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}pgbouncer=true`
  : undefined;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: pooledDatabaseUrl
      ? { db: { url: pooledDatabaseUrl } }
      : undefined,
  });

if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

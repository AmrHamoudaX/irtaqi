import "dotenv/config" //Need this for Prisma to find DATABASE_URL and not get PrismaConfigEnvError
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

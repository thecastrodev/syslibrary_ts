import { PrismaClient } from "@prisma/client";

// Singleton - return the unique instance of ORM
export const prisma = new PrismaClient();
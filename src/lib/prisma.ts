// import { PrismaClient } from '@prisma/client'
import { prisma as mockPrisma } from './prisma-mock'

// Temporarily use mock for development
export const prisma = mockPrisma

// Original Prisma setup (commented out due to network issues)
/*
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
*/
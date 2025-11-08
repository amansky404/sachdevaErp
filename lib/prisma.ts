import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: ['error', 'warn']
    })
  } catch (error) {
    console.warn(
      'Prisma client could not be instantiated. Did you run "npm run prisma:generate"? Returning a no-op stub instead.',
      error
    )

    return new Proxy(
      {},
      {
        get() {
          throw new Error('Prisma client is unavailable. Generate the client before using database APIs.')
        }
      }
    ) as PrismaClient
  }
}

export const prisma = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

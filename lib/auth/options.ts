import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'

import { prisma } from '../prisma'
import { DEFAULT_ROLES } from './permissions'

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database'
  },
  pages: {
    signIn: '/auth/sign-in'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: {
              include: {
                role: {
                  include: { permissions: { include: { permission: true } } }
                }
              }
            }
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid || user.status !== 'ACTIVE') {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined
        }
      }
    })
  ],
  events: {
    async createUser({ user }) {
      const existingRoles = await prisma.role.findMany({
        where: {
          name: { in: Object.values(DEFAULT_ROLES).map(role => role.name) }
        }
      })

      if (existingRoles.length === 0) {
        await prisma.$transaction(async tx => {
          for (const role of Object.values(DEFAULT_ROLES)) {
            const createdRole = await tx.role.create({
              data: {
                name: role.name,
                isDefault: role.name === DEFAULT_ROLES.ADMIN.name,
                permissions: {
                  create: role.permissions.map(code => ({
                    permission: {
                      connectOrCreate: {
                        where: { code },
                        create: {
                          code,
                          module: code.split(':')[0],
                          description: code
                        }
                      }
                    }
                  }))
                }
              }
            })

            if (role.name === DEFAULT_ROLES.ADMIN.name) {
              await tx.userRole.create({
                data: {
                  userId: user.id,
                  roleId: createdRole.id
                }
              })
            }
          }
        })
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      if (!session.user || !user?.id) return session

      const roles = await prisma.userRole.findMany({
        where: { userId: user.id },
        include: {
          role: {
            include: {
              permissions: { include: { permission: true } }
            }
          }
        }
      })

      const permissions = new Set<string>()

      roles.forEach(({ role }) => {
        role.permissions.forEach(({ permission }) => permissions.add(permission.code))
      })

      session.user.id = user.id
      session.user.permissions = Array.from(permissions)

      return session
    }
  }
}

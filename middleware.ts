import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

import { PERMISSIONS } from '@/lib/auth/permissions'

const routePermissions = [
  { pattern: /^\/admin\/items/, permission: PERMISSIONS.ITEMS_VIEW },
  { pattern: /^\/admin\/categories/, permission: PERMISSIONS.CATEGORIES_VIEW },
  { pattern: /^\/admin\/inventory/, permission: PERMISSIONS.INVENTORY_VIEW },
  { pattern: /^\/admin\/people/, permission: PERMISSIONS.USERS_MANAGE },
  { pattern: /^\/admin\/settings/, permission: PERMISSIONS.USERS_MANAGE },
  { pattern: /^\/admin/, permission: PERMISSIONS.DASHBOARD_VIEW },
  { pattern: /^\/pos/, permission: PERMISSIONS.POS_ACCESS },
  { pattern: /^\/store/, permission: PERMISSIONS.SALES_VIEW }
] as const

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req
    const user = nextauth.token

    if (!user) {
      return NextResponse.redirect(new URL('/auth/sign-in', nextUrl.origin))
    }

    const pathname = nextUrl.pathname
    const permissions = (user.permissions as string[]) ?? []

    const match = routePermissions.find(entry => entry.pattern.test(pathname))

    if (match && !permissions.includes(match.permission)) {
      const redirectUrl = new URL('/auth/sign-in', nextUrl.origin)
      redirectUrl.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token)
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/pos/:path*', '/store/:path*']
}

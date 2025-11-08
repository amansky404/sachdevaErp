import type { Session } from 'next-auth'
import { getServerSession } from 'next-auth'

import { authOptions } from './options'

export function auth(): Promise<Session | null> {
  return getServerSession(authOptions)
}

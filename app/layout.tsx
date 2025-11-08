import type { Metadata } from 'next'

import { AuthSessionProvider } from '@/components/providers/session-provider'
import { auth } from '@/lib/auth/server'

import './globals.css'

export const metadata: Metadata = {
  title: 'Sachdeva ERP Platform',
  description: 'Unified ERP, POS, and commerce platform for retail operations.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className="min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)] antialiased"
      >
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}

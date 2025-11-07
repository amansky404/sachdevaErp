import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AuthSessionProvider } from '@/components/providers/session-provider'
import { auth } from '@/lib/auth/server'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

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
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}
      >
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}

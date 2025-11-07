import type { ReactNode } from 'react'

import { AppShell } from '@/components/layout/app-shell'

const navigation = [
  { label: 'Register', href: '/pos' },
  { label: 'Orders', href: '/pos/orders' },
  { label: 'Customers', href: '/pos/customers' },
  { label: 'Shift', href: '/pos/shift' }
]

type PosLayoutProps = {
  children: ReactNode
}

export default function PosLayout({ children }: PosLayoutProps) {
  return (
    <AppShell
      title="Point of Sale"
      subtitle="Optimized for quick billing with offline-first sync."
      navigation={navigation}
    >
      {children}
    </AppShell>
  )
}

import type { ReactNode } from 'react'

import { AppShell } from '@/components/layout/app-shell'

const navigation = [
  { label: 'Dashboard', href: '/store' },
  { label: 'Orders', href: '/store/orders' },
  { label: 'Customers', href: '/store/customers' },
  { label: 'Promotions', href: '/store/promotions' }
]

type StoreLayoutProps = {
  children: ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <AppShell
      title="Online Store"
      subtitle="Monitor digital channel performance and configure campaigns."
      navigation={navigation}
    >
      {children}
    </AppShell>
  )
}

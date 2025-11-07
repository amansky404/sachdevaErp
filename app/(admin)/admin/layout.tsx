import type { ReactNode } from 'react'

import { AppShell } from '@/components/layout/app-shell'

const navigation = [
  { label: 'Overview', href: '/admin' },
  { label: 'Items', href: '/admin/items' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Inventory', href: '/admin/inventory' },
  { label: 'People', href: '/admin/people' },
  { label: 'Settings', href: '/admin/settings' }
]

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AppShell
      title="Admin Console"
      subtitle="Configure organization, catalog, and global rules."
      navigation={navigation}
    >
      {children}
    </AppShell>
  )
}

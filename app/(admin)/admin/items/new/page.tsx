import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'

import { ItemForm } from '../_components/item-form'

export default async function NewItemPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.ITEMS_EDIT)) {
    redirect('/admin/items')
  }

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          href="/admin/items"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
        >
          ← Back to items
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">Create a catalog item</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Define pricing, taxation, and inventory behaviour. You can enrich item metadata and channel availability later from the detailed view.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <ItemForm categories={categories} />
      </div>
    </div>
  )
}

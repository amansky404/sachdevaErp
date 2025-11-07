import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'

import { ItemsTable, type ItemRow } from './_components/items-table'

type ItemsPageProps = {
  searchParams?: {
    q?: string
    created?: string
  }
}

export default async function AdminItemsPage({ searchParams }: ItemsPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.ITEMS_VIEW)) {
    redirect('/admin')
  }

  const canCreate = permissions.includes(PERMISSIONS.ITEMS_EDIT)

  const query = searchParams?.q?.trim() ?? ''
  const created = searchParams?.created === '1'

  const items = await prisma.item.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } },
            { barcode: { contains: query, mode: 'insensitive' } }
          ]
        }
      : undefined,
    include: {
      inventories: true,
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const rows: ItemRow[] = items.map(item => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    categoryName: item.category?.name,
    basePrice: Number(item.basePrice),
    costPrice: Number(item.costPrice),
    taxRate: Number(item.taxRate),
    totalStock: item.inventories.reduce((acc, inventory) => {
      const available = Number(inventory.quantity) - Number(inventory.reserved)
      return acc + available
    }, 0),
    trackInventory: item.trackInventory,
    isSerialized: item.isSerialized,
    updatedAt: item.updatedAt
  }))

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Catalog items</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Maintain a single source of truth for pricing, taxation, and inventory settings across your retail channels.
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {items.length ? `${formatNumber(items.length)} item${items.length === 1 ? '' : 's'}` : 'No items yet'}
          </p>
        </div>

        {canCreate ? (
          <Link
            href="/admin/items/new"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            + New item
          </Link>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form method="get" className="flex w-full max-w-md items-center gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by name, SKU, or barcode"
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {query ? (
            <Link
              href="/admin/items"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Clear
            </Link>
          ) : null}
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
          >
            Search
          </button>
        </form>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm">
          <span className="font-semibold text-slate-900">Total list value:</span>{' '}
          {formatCurrency(
            rows.reduce((acc, item) => acc + item.basePrice * (item.trackInventory ? item.totalStock : 1), 0)
          )}
        </div>
      </div>

      {created ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Item created successfully. Sync POS terminals to pull the latest catalog.
        </div>
      ) : null}

      <ItemsTable items={rows} />
    </div>
  )
}

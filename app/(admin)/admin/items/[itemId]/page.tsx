import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import type { Decimal } from '@prisma/client/runtime/library'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDateTime, formatNumber, formatPercent } from '@/lib/utils/formatters'

import { ItemSettingsForm } from './_components/item-settings-form'
import { InventoryTable } from './_components/inventory-table'

type ItemDetailPageProps = {
  params: {
    itemId: string
  }
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.ITEMS_VIEW)) {
    redirect('/admin/items')
  }

  type DecimalLike = number | string | bigint | Decimal

  type ItemWithRelations = {
    id: string
    sku: string
    barcode: string | null
    name: string
    description: string | null
    basePrice: DecimalLike
    costPrice: DecimalLike
    taxRate: DecimalLike
    trackInventory: boolean
    isSerialized: boolean
    updatedAt: Date
    category: { id: string; name: string } | null
    inventories: Array<{
      id: string
      quantity: DecimalLike
      reserved: DecimalLike
      updatedAt: Date
      store: { id: string; name: string; code: string; city: string | null; state: string | null }
    }>
  }

  const itemRecord = (await prisma.item.findUnique({
    where: { id: params.itemId },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      inventories: {
        include: {
          store: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
              state: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }
    }
  })) as ItemWithRelations | null

  if (!itemRecord) {
    notFound()
  }

  const item = itemRecord

  const basePrice = Number(item.basePrice)
  const costPrice = Number(item.costPrice)
  const taxRate = Number(item.taxRate)

  const inventoryRows = item.inventories.map(inventory => {
    const quantity = Number(inventory.quantity)
    const reserved = Number(inventory.reserved)
    return {
      id: inventory.id,
      storeName: inventory.store.name,
      storeCode: inventory.store.code,
      storeLocation:
        inventory.store.city || inventory.store.state
          ? [inventory.store.city, inventory.store.state].filter(Boolean).join(', ')
          : null,
      quantity,
      reserved,
      updatedAt: inventory.updatedAt
    }
  })

  const totalOnHand = inventoryRows.reduce((acc, inventory) => acc + (inventory.quantity - inventory.reserved), 0)
  const totalReserved = inventoryRows.reduce((acc, inventory) => acc + inventory.reserved, 0)
  const stockValue = totalOnHand * basePrice

  const canEdit = permissions.includes(PERMISSIONS.ITEMS_EDIT)
  const categoryOptions = canEdit
    ? await prisma.category.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
      })
    : []

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <Link
          href="/admin/items"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
        >
          ← Back to catalog
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">{item.name}</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Review item performance, manage pricing, and track inventory allocation across stores.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {canEdit ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <ItemSettingsForm
                item={{
                  id: item.id,
                  sku: item.sku,
                  barcode: item.barcode,
                  name: item.name,
                  description: item.description,
                  categoryId: item.category?.id ?? null,
                  basePrice,
                  costPrice,
                  taxRate,
                  trackInventory: item.trackInventory,
                  isSerialized: item.isSerialized
                }}
                categories={categoryOptions}
              />
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Core settings</h2>
              <p className="mt-2 text-sm text-slate-600">
                You can view the current configuration for this item. Contact an administrator to request changes.
              </p>
              <dl className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">SKU</dt>
                  <dd className="mt-1 text-sm text-slate-900">{item.sku}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Barcode</dt>
                  <dd className="mt-1 text-sm text-slate-900">{item.barcode ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Base price</dt>
                  <dd className="mt-1 text-sm text-slate-900">{formatCurrency(basePrice)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost price</dt>
                  <dd className="mt-1 text-sm text-slate-900">{formatCurrency(costPrice)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tax rate</dt>
                  <dd className="mt-1 text-sm text-slate-900">{formatPercent(taxRate / 100)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Inventory tracking</dt>
                  <dd className="mt-1 text-sm text-slate-900">{item.trackInventory ? 'Enabled' : 'Disabled'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</dt>
                  <dd className="mt-1 text-sm text-slate-900">{item.category?.name ?? 'Uncategorized'}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</dt>
                  <dd className="mt-1 text-sm text-slate-700">{item.description || '—'}</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Store inventory</h2>
                <p className="text-sm text-slate-600">Track quantity on hand and reserved commitments by location.</p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {inventoryRows.length ? `${inventoryRows.length} store${inventoryRows.length === 1 ? '' : 's'}` : 'No stores'}
              </span>
            </div>

            <InventoryTable inventories={inventoryRows} trackInventory={item.trackInventory} basePrice={basePrice} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Snapshot</h2>
            <dl className="mt-4 space-y-4 text-sm text-slate-700">
              <div className="flex items-baseline justify-between">
                <dt className="text-slate-500">On hand</dt>
                <dd className="text-base font-semibold text-slate-900">{formatNumber(totalOnHand)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-slate-500">Reserved</dt>
                <dd className="text-base font-semibold text-slate-900">{formatNumber(totalReserved)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-slate-500">Stock value</dt>
                <dd className="text-base font-semibold text-slate-900">{formatCurrency(stockValue)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-slate-500">Margin</dt>
                <dd className="text-base font-semibold text-slate-900">
                  {basePrice > 0 ? formatPercent((basePrice - costPrice) / basePrice) : '—'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Last updated</p>
            <p className="mt-1">{formatDateTime(item.updatedAt)}</p>
            <p className="mt-4 font-semibold text-slate-900">Serial tracking</p>
            <p className="mt-1">{item.isSerialized ? 'POS will enforce serial capture on every sale.' : 'No serial capture required.'}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

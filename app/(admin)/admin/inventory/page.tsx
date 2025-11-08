import Link from 'next/link'
import { redirect } from 'next/navigation'

import type { Decimal } from '@prisma/client/runtime/library'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'

import { StoreInventoryTable, type StoreInventoryRow } from './_components/store-inventory-table'

const LOW_STOCK_THRESHOLD = 5

export default async function AdminInventoryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.INVENTORY_VIEW)) {
    redirect('/admin')
  }

  const canAdjust = permissions.includes(PERMISSIONS.INVENTORY_ADJUST)

  type DecimalLike = number | string | bigint | Decimal

  type InventoryWithItem = {
    id: string
    itemId: string
    quantity: DecimalLike
    reserved: DecimalLike
    item: {
      id: string
      name: string
      sku: string | null
      trackInventory: boolean
      basePrice: DecimalLike | null
    } | null
  }

  type StoreWithInventory = {
    id: string
    code: string
    name: string
    city: string | null
    state: string | null
    inventories: InventoryWithItem[]
  }

  const stores = (await prisma.store.findMany({
    include: {
      inventories: {
        include: {
          item: {
            select: {
              id: true,
              name: true,
              sku: true,
              trackInventory: true,
              basePrice: true
            }
          }
        }
      }
    },
    orderBy: { name: 'asc' }
  })) as StoreWithInventory[]

  const rows: StoreInventoryRow[] = stores.map(store => {
    const trackedInventories = store.inventories.filter(inventory => inventory.item?.trackInventory)

    const onHand = trackedInventories.reduce((total, inventory) => {
      const available = Number(inventory.quantity) - Number(inventory.reserved)
      return total + available
    }, 0)

    const reserved = trackedInventories.reduce((total, inventory) => total + Number(inventory.reserved), 0)

    const stockValue = trackedInventories.reduce((total, inventory) => {
      const available = Math.max(Number(inventory.quantity) - Number(inventory.reserved), 0)
      const price = Number(inventory.item?.basePrice ?? 0)
      return total + available * price
    }, 0)

    const lowStock = trackedInventories
      .map(inventory => {
        const available = Number(inventory.quantity) - Number(inventory.reserved)
        return {
          id: inventory.itemId,
          name: inventory.item?.name ?? 'Unknown item',
          sku: inventory.item?.sku ?? '—',
          available
        }
      })
      .filter(item => item.available <= LOW_STOCK_THRESHOLD)
      .sort((a, b) => a.available - b.available)
      .slice(0, 5)

    const locationParts = [store.city, store.state].filter(Boolean)

    return {
      id: store.id,
      name: store.name,
      code: store.code,
      location: locationParts.length ? locationParts.join(', ') : store.city ?? store.state ?? null,
      skuCount: trackedInventories.length,
      onHand: Math.max(onHand, 0),
      reserved,
      stockValue,
      lowStock
    }
  })

  const totals = rows.reduce(
    (acc, store) => {
      acc.skuCount += store.skuCount
      acc.onHand += store.onHand
      acc.reserved += store.reserved
      acc.stockValue += store.stockValue
      acc.lowStock += store.lowStock.length
      return acc
    },
    { skuCount: 0, onHand: 0, reserved: 0, stockValue: 0, lowStock: 0 }
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Inventory health</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Track stock availability across every store so your teams can replenish shelves before customers notice gaps.
          </p>
        </div>

        {canAdjust ? (
          <Link
            href="/admin/inventory/adjust"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Adjust stock
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">SKUs tracked</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{formatNumber(totals.skuCount)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On hand</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{formatNumber(totals.onHand)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reserved</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{formatNumber(totals.reserved)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stock value</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(totals.stockValue)}</p>
          {totals.lowStock ? (
            <p className="mt-2 text-xs text-amber-600">
              {totals.lowStock} item{totals.lowStock === 1 ? '' : 's'} below threshold
            </p>
          ) : null}
        </div>
      </div>

      <StoreInventoryTable stores={rows} />
    </div>
  )
}

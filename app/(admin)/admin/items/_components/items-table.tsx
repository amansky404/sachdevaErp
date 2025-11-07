import Link from 'next/link'

import { formatCurrency, formatDateTime, formatNumber, formatPercent } from '@/lib/utils/formatters'

export type ItemRow = {
  id: string
  sku: string
  name: string
  categoryName?: string | null
  basePrice: number
  costPrice: number
  taxRate: number
  totalStock: number
  trackInventory: boolean
  isSerialized: boolean
  updatedAt: Date
}

type ItemsTableProps = {
  items: ItemRow[]
}

export function ItemsTable({ items }: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No catalog items yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          Add your first item to begin managing inventory, pricing, and availability across channels.
        </p>
        <div className="mt-4">
          <Link
            href="/admin/items/new"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Create item
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              SKU
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Base price
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cost
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tax
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stock
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Flags
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-indigo-50/40">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">{item.sku}</td>
              <td className="max-w-xs px-6 py-4 text-sm text-slate-700">
                <div className="font-medium text-slate-900">
                  <Link href={`/admin/items/${item.id}`} className="text-indigo-600 transition hover:text-indigo-500">
                    {item.name}
                  </Link>
                </div>
                <div className="text-xs text-slate-500">ID: {item.id}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                {item.categoryName ?? 'Uncategorized'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatCurrency(item.basePrice)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatCurrency(item.costPrice)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatPercent(item.taxRate / 100)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {item.trackInventory ? formatNumber(item.totalStock) : '—'}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700">
                <div className="flex flex-wrap gap-2">
                  {item.trackInventory ? (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      Tracks stock
                    </span>
                  ) : null}
                  {item.isSerialized ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Serialized
                    </span>
                  ) : null}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatDateTime(item.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

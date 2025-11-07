import { formatCurrency, formatNumber } from '@/lib/utils/formatters'

type LowStockItem = {
  id: string
  name: string
  sku: string
  available: number
}

type StoreInventoryRow = {
  id: string
  name: string
  code: string
  location?: string | null
  skuCount: number
  onHand: number
  reserved: number
  stockValue: number
  lowStock: LowStockItem[]
}

type StoreInventoryTableProps = {
  stores: StoreInventoryRow[]
}

export function StoreInventoryTable({ stores }: StoreInventoryTableProps) {
  if (stores.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No inventory tracked yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          Assign catalog items to stores to begin monitoring stock levels and get alerted when quantities run low.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Store
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              SKUs tracked
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              On hand
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Reserved
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stock value
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Low stock alerts
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {stores.map(store => (
            <tr key={store.id} className="hover:bg-indigo-50/40">
              <td className="px-6 py-4 text-sm text-slate-700">
                <div className="font-medium text-slate-900">
                  {store.name}
                  <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {store.code}
                  </span>
                </div>
                {store.location ? <div className="text-xs text-slate-500">{store.location}</div> : null}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatNumber(store.skuCount)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatNumber(store.onHand)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatNumber(store.reserved)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatCurrency(store.stockValue)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700">
                {store.lowStock.length === 0 ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    All good
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {store.lowStock.map(item => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
                      >
                        <span>{item.sku}</span>
                        <span className="text-amber-600">{formatNumber(item.available)} left</span>
                      </span>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type { StoreInventoryRow }

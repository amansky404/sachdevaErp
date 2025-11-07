import { formatCurrency, formatDateTime, formatNumber } from '@/lib/utils/formatters'

type InventoryRow = {
  id: string
  storeName: string
  storeCode: string
  storeLocation?: string | null
  quantity: number
  reserved: number
  updatedAt: Date
}

type InventoryTableProps = {
  inventories: InventoryRow[]
  trackInventory: boolean
  basePrice: number
}

export function InventoryTable({ inventories, trackInventory, basePrice }: InventoryTableProps) {
  if (!trackInventory) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-700">
        Inventory tracking is disabled for this item. Enable tracking to sync stock levels across stores and POS terminals.
      </div>
    )
  }

  if (inventories.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No store inventory yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          Once you assign this item to a store, incoming purchase orders will begin to populate stock levels.
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
              On hand
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Reserved
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stock value
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {inventories.map(inventory => {
            const available = inventory.quantity - inventory.reserved
            return (
              <tr key={inventory.id} className="hover:bg-indigo-50/40">
                <td className="px-6 py-4 text-sm text-slate-700">
                  <div className="font-medium text-slate-900">
                    {inventory.storeName}
                    <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {inventory.storeCode}
                    </span>
                  </div>
                  {inventory.storeLocation ? (
                    <div className="text-xs text-slate-500">{inventory.storeLocation}</div>
                  ) : null}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                  {formatNumber(available)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                  {formatNumber(inventory.reserved)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                  {formatCurrency(available * basePrice)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                  {formatDateTime(inventory.updatedAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

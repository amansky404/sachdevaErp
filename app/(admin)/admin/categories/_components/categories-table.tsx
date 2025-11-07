import Link from 'next/link'

import { formatDateTime, formatNumber } from '@/lib/utils/formatters'

type CategoryRow = {
  id: string
  name: string
  slug: string
  isActive: boolean
  parentName?: string | null
  itemCount: number
  updatedAt: Date
}

type CategoriesTableProps = {
  categories: CategoryRow[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No categories yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          Organize your catalog with hierarchical categories to streamline assortment planning and channel publishing.
        </p>
        <div className="mt-4">
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Create category
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
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Slug
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Parent
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Items
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {categories.map(category => (
            <tr key={category.id} className="hover:bg-indigo-50/40">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">{category.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">{category.slug}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                {category.parentName ?? '—'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatNumber(category.itemCount)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    category.isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-700">
                {formatDateTime(category.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type { CategoryRow }

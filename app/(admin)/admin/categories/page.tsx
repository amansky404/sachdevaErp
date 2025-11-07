import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { formatNumber } from '@/lib/utils/formatters'

import { CategoriesTable, type CategoryRow } from './_components/categories-table'

type CategoriesPageProps = {
  searchParams?: {
    q?: string
    created?: string
  }
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.CATEGORIES_VIEW)) {
    redirect('/admin')
  }

  const canManage = permissions.includes(PERMISSIONS.CATEGORIES_EDIT)

  const query = searchParams?.q?.trim() ?? ''
  const created = searchParams?.created === '1'

  const categories = await prisma.category.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } }
          ]
        }
      : undefined,
    include: {
      parent: { select: { id: true, name: true } },
      _count: { select: { items: true } }
    },
    orderBy: [{ updatedAt: 'desc' }, { name: 'asc' }]
  })

  const rows: CategoryRow[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    isActive: category.isActive,
    parentName: category.parent?.name,
    itemCount: category._count.items,
    updatedAt: category.updatedAt
  }))

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Catalog categories</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Group items into hierarchical categories to power navigation, channel availability rules, and assortment planning.
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {rows.length ? `${formatNumber(rows.length)} categor${rows.length === 1 ? 'y' : 'ies'}` : 'No categories yet'}
          </p>
        </div>

        {canManage ? (
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            + New category
          </Link>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form method="get" className="flex w-full max-w-md items-center gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by name or slug"
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {query ? (
            <Link
              href="/admin/categories"
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
          <span className="font-semibold text-slate-900">Active categories:</span>{' '}
          {formatNumber(rows.filter(category => category.isActive).length)}
        </div>
      </div>

      {created ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Category created successfully. Assign it to items to surface cohesive merchandising.
        </div>
      ) : null}

      <CategoriesTable categories={rows} />
    </div>
  )
}

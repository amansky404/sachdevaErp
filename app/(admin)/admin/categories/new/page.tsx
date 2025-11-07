import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'

import { CategoryForm } from '../_components/category-form'

export default async function NewCategoryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/sign-in')
  }

  const permissions = session.user.permissions ?? []

  if (!permissions.includes(PERMISSIONS.CATEGORIES_EDIT)) {
    redirect('/admin/categories')
  }

  const parentOptions = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
        >
          ← Back to categories
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">Create a category</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Establish merchandising groups to power channel navigation, reporting, and automated pricing workflows.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <CategoryForm parentOptions={parentOptions} />
      </div>
    </div>
  )
}

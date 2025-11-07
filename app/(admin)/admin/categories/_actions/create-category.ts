'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/lib/validation/categories'

export type CategoryFieldErrors = Partial<
  Record<'name' | 'slug' | 'description' | 'parentId', string>
>

export type CategoryFormValues = {
  name?: string
  slug?: string
  description?: string
  parentId?: string
  isActive: boolean
}

export type CreateCategoryFormState = {
  fieldErrors?: CategoryFieldErrors
  formError?: string
  values?: CategoryFormValues
}

const initialValues: CategoryFormValues = {
  name: '',
  slug: '',
  description: '',
  parentId: '',
  isActive: true
}

export const createCategoryInitialState: CreateCategoryFormState = {
  values: initialValues
}

export async function createCategoryAction(
  prevState: CreateCategoryFormState,
  formData: FormData
): Promise<CreateCategoryFormState> {
  const session = await auth()

  if (!session?.user) {
    return {
      formError: 'You must be signed in to create categories.'
    }
  }

  if (!session.user.permissions?.includes(PERMISSIONS.CATEGORIES_EDIT)) {
    return {
      formError: 'You do not have permission to manage categories.'
    }
  }

  const rawValues: CategoryFormValues = {
    name: formData.get('name')?.toString().trim() ?? '',
    slug: formData.get('slug')?.toString().trim() ?? '',
    description: formData.get('description')?.toString().trim() || undefined,
    parentId: formData.get('parentId')?.toString().trim() ?? '',
    isActive: formData.get('isActive') === 'true'
  }

  const parsed = categorySchema.safeParse({
    name: rawValues.name,
    slug: rawValues.slug,
    description: rawValues.description,
    parentId: rawValues.parentId,
    isActive: rawValues.isActive
  })

  if (!parsed.success) {
    const fieldErrors: CategoryFieldErrors = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof CategoryFieldErrors
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }

    return {
      fieldErrors,
      values: rawValues
    }
  }

  const data = parsed.data

  try {
    await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        isActive: data.isActive,
        parent: data.parentId ? { connect: { id: data.parentId } } : undefined
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = Array.isArray(error.meta?.target) ? error.meta?.target[0] : undefined
      if (target === 'slug' || target === 'name') {
        return {
          fieldErrors: {
            [target]: `${target === 'slug' ? 'Slug' : 'Name'} must be unique.`
          },
          values: rawValues
        }
      }
    }

    return {
      formError: 'Something went wrong while saving the category. Please try again.',
      values: rawValues
    }
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories?created=1')
}

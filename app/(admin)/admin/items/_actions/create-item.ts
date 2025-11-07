'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { createItemSchema } from '@/lib/validation/items'

export type FieldErrors = Partial<
  Record<
    'sku' | 'barcode' | 'name' | 'description' | 'categoryId' | 'basePrice' | 'costPrice' | 'taxRate',
    string
  >
>

export type ItemFormValues = {
  sku?: string
  barcode?: string
  name?: string
  description?: string
  categoryId?: string
  basePrice?: string
  costPrice?: string
  taxRate?: string
  trackInventory: boolean
  isSerialized: boolean
}

export type CreateItemFormState = {
  fieldErrors?: FieldErrors
  formError?: string
  values?: ItemFormValues
}

const initialValues: ItemFormValues = {
  sku: '',
  barcode: '',
  name: '',
  description: '',
  categoryId: '',
  basePrice: '',
  costPrice: '',
  taxRate: '',
  trackInventory: true,
  isSerialized: false
}

export const createItemInitialState: CreateItemFormState = {
  values: initialValues
}

export async function createItemAction(prevState: CreateItemFormState, formData: FormData): Promise<CreateItemFormState> {
  const session = await auth()

  if (!session?.user) {
    return {
      formError: 'You must be signed in to create items.'
    }
  }

  if (!session.user.permissions?.includes(PERMISSIONS.ITEMS_EDIT)) {
    return {
      formError: 'You do not have permission to create catalog items.'
    }
  }

  const categoryIdValue = formData.get('categoryId')?.toString().trim() ?? ''

  const rawValues: ItemFormValues = {
    sku: formData.get('sku')?.toString().trim() ?? '',
    barcode: formData.get('barcode')?.toString().trim() || undefined,
    name: formData.get('name')?.toString().trim() ?? '',
    description: formData.get('description')?.toString().trim() || undefined,
    categoryId: categoryIdValue,
    basePrice: formData.get('basePrice')?.toString().trim() ?? '',
    costPrice: formData.get('costPrice')?.toString().trim() ?? '',
    taxRate: formData.get('taxRate')?.toString().trim() ?? '',
    trackInventory: formData.get('trackInventory') === 'on',
    isSerialized: formData.get('isSerialized') === 'on'
  }

  const parsed = createItemSchema.safeParse({
    sku: rawValues.sku,
    barcode: rawValues.barcode,
    name: rawValues.name,
    description: rawValues.description,
    categoryId: rawValues.categoryId,
    basePrice: rawValues.basePrice,
    costPrice: rawValues.costPrice,
    taxRate: rawValues.taxRate,
    trackInventory: rawValues.trackInventory,
    isSerialized: rawValues.isSerialized
  })

  if (!parsed.success) {
    const fieldErrors: FieldErrors = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof FieldErrors
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
    await prisma.item.create({
      data: {
        sku: data.sku,
        barcode: data.barcode,
        name: data.name,
        description: data.description,
        category: data.categoryId ? { connect: { id: data.categoryId } } : undefined,
        basePrice: data.basePrice.toFixed(2),
        costPrice: data.costPrice.toFixed(2),
        taxRate: data.taxRate.toFixed(2),
        trackInventory: data.trackInventory,
        isSerialized: data.isSerialized
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = Array.isArray(error.meta?.target) ? error.meta?.target[0] : undefined
      if (target === 'sku' || target === 'barcode') {
        return {
          fieldErrors: {
            [target]: `${target.toUpperCase()} must be unique.`
          },
          values: rawValues
        }
      }
    }

    return {
      formError: 'Something went wrong while saving the item. Please try again.',
      values: rawValues
    }
  }

  revalidatePath('/admin/items')
  redirect('/admin/items?created=1')
}

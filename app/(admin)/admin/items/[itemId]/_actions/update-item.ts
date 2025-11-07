'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { PERMISSIONS } from '@/lib/auth/permissions'
import { auth } from '@/lib/auth/server'
import { prisma } from '@/lib/prisma'
import { createItemSchema } from '@/lib/validation/items'

import { type FieldErrors, type ItemFormValues } from '../../_actions/create-item'
import { coerceItemFormValues, itemSnapshotToFormValues, type ItemSnapshot } from '../../_utils/item-form'

export type UpdateItemFormState = {
  fieldErrors?: FieldErrors
  formError?: string
  success?: boolean
  values?: ItemFormValues
}

export async function updateItemAction(
  itemId: string,
  prevState: UpdateItemFormState,
  formData: FormData
): Promise<UpdateItemFormState> {
  const session = await auth()

  if (!session?.user) {
    return {
      formError: 'You must be signed in to update items.',
      values: prevState.values
    }
  }

  if (!session.user.permissions?.includes(PERMISSIONS.ITEMS_EDIT)) {
    return {
      formError: 'You do not have permission to update catalog items.',
      values: prevState.values
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
      values: coerceItemFormValues(rawValues)
    }
  }

  const data = parsed.data

  try {
    await prisma.item.update({
      where: { id: itemId },
      data: {
        sku: data.sku,
        barcode: data.barcode,
        name: data.name,
        description: data.description,
        category: data.categoryId
          ? {
              connect: { id: data.categoryId }
            }
          : {
              disconnect: true
            },
        basePrice: data.basePrice.toFixed(2),
        costPrice: data.costPrice.toFixed(2),
        taxRate: data.taxRate.toFixed(2),
        trackInventory: data.trackInventory,
        isSerialized: data.isSerialized
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = Array.isArray(error.meta?.target) ? error.meta.target[0] : undefined
        if (target === 'sku' || target === 'barcode') {
          return {
            fieldErrors: {
              [target]: `${target.toUpperCase()} must be unique.`
            },
            values: coerceItemFormValues(rawValues)
          }
        }
      }

      if (error.code === 'P2025') {
        return {
          formError: 'The item you attempted to update could not be found.',
          values: coerceItemFormValues(rawValues)
        }
      }
    }

    return {
      formError: 'Something went wrong while updating the item. Please try again.',
      values: coerceItemFormValues(rawValues)
    }
  }

  revalidatePath('/admin/items')
  revalidatePath(`/admin/items/${itemId}`)

  const updatedSnapshot: ItemSnapshot = {
    sku: data.sku,
    barcode: data.barcode ?? null,
    name: data.name,
    description: data.description ?? null,
    categoryId: data.categoryId ?? null,
    basePrice: data.basePrice,
    costPrice: data.costPrice,
    taxRate: data.taxRate,
    trackInventory: data.trackInventory,
    isSerialized: data.isSerialized
  }

  return {
    success: true,
    values: itemSnapshotToFormValues(updatedSnapshot)
  }
}

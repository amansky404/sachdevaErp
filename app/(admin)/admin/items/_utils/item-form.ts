import { type ItemFormValues } from '../_actions/create-item'

export type ItemSnapshot = {
  sku: string
  barcode: string | null
  name: string
  description: string | null
  categoryId: string | null
  basePrice: number
  costPrice: number
  taxRate: number
  trackInventory: boolean
  isSerialized: boolean
}

export function coerceItemFormValues(values: ItemFormValues): ItemFormValues {
  return {
    sku: values.sku ?? '',
    barcode: values.barcode ?? '',
    name: values.name ?? '',
    description: values.description ?? '',
    categoryId: values.categoryId ?? '',
    basePrice: values.basePrice ?? '',
    costPrice: values.costPrice ?? '',
    taxRate: values.taxRate ?? '',
    trackInventory: values.trackInventory ?? true,
    isSerialized: values.isSerialized ?? false
  }
}

export function itemSnapshotToFormValues(item: ItemSnapshot): ItemFormValues {
  return {
    sku: item.sku,
    barcode: item.barcode ?? '',
    name: item.name,
    description: item.description ?? '',
    categoryId: item.categoryId ?? '',
    basePrice: item.basePrice.toFixed(2),
    costPrice: item.costPrice.toFixed(2),
    taxRate: item.taxRate.toString(),
    trackInventory: item.trackInventory,
    isSerialized: item.isSerialized
  }
}

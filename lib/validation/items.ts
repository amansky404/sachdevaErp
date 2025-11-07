import { z } from 'zod'

export const createItemSchema = z
  .object({
    sku: z.string().trim().min(1, 'SKU is required').max(64, 'SKU must be 64 characters or less'),
    barcode: z.string().trim().max(64, 'Barcode must be 64 characters or less').optional(),
    name: z.string().trim().min(1, 'Name is required').max(120, 'Name must be 120 characters or less'),
    description: z.string().trim().max(600, 'Description must be 600 characters or less').optional(),
    categoryId: z.string().cuid('Invalid category').optional().or(z.literal('')),
    basePrice: z.coerce.number({ invalid_type_error: 'Base price must be a number' }).min(
      0,
      'Base price cannot be negative'
    ),
    costPrice: z.coerce.number({ invalid_type_error: 'Cost price must be a number' }).min(
      0,
      'Cost price cannot be negative'
    ),
    taxRate: z.coerce.number({ invalid_type_error: 'Tax rate must be a number' })
      .min(0, 'Tax rate cannot be negative')
      .max(100, 'Tax rate must be 100 or below'),
    trackInventory: z.boolean(),
    isSerialized: z.boolean()
  })
  .refine(data => data.costPrice <= data.basePrice, {
    message: 'Cost price cannot exceed base price',
    path: ['costPrice']
  })
  .transform(({ categoryId, ...rest }) => ({
    ...rest,
    categoryId: categoryId ? categoryId : undefined
  }))

export type CreateItemInput = z.infer<typeof createItemSchema>

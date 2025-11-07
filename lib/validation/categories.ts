import { z } from 'zod'

export const categorySchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name must be 80 characters or less'),
    slug: z
      .string()
      .trim()
      .min(2, 'Slug must be at least 2 characters')
      .max(80, 'Slug must be 80 characters or less')
      .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().trim().max(300, 'Description must be 300 characters or less').optional(),
    parentId: z.string().cuid('Invalid parent category').optional().or(z.literal('')),
    isActive: z
      .preprocess(value => {
        if (value === 'true' || value === true || value === 'on' || value === 1 || value === '1') {
          return true
        }
        return false
      }, z.boolean())
  })
  .transform(({ parentId, ...rest }) => ({
    ...rest,
    parentId: parentId ? parentId : undefined
  }))

export type CategoryInput = z.infer<typeof categorySchema>

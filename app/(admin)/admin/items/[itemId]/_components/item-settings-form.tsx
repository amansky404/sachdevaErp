'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { type ItemFormValues } from '../../_actions/create-item'
import { itemSnapshotToFormValues } from '../../_utils/item-form'
import { type UpdateItemFormState, updateItemAction } from '../_actions/update-item'

type ItemSettingsFormProps = {
  item: {
    id: string
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
  categories: Array<{ id: string; name: string }>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  )
}

function fieldValue(value: ItemFormValues[keyof ItemFormValues], fallback: string) {
  if (typeof value === 'string') {
    return value
  }

  return fallback
}

export function ItemSettingsForm({ item, categories }: ItemSettingsFormProps) {
  const initialValues = itemSnapshotToFormValues({
    sku: item.sku,
    barcode: item.barcode,
    name: item.name,
    description: item.description,
    categoryId: item.categoryId,
    basePrice: item.basePrice,
    costPrice: item.costPrice,
    taxRate: item.taxRate,
    trackInventory: item.trackInventory,
    isSerialized: item.isSerialized
  })

  const [state, formAction] = useFormState<UpdateItemFormState, FormData>(
    updateItemAction.bind(null, item.id),
    { values: initialValues }
  )

  const values = state.values ?? initialValues

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Core settings</h2>
        <p className="text-sm text-slate-600">
          Update pricing, taxation, and operational behaviour. Changes apply across all connected stores and channels.
        </p>
      </div>

      {state.success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Item settings updated successfully.
        </div>
      ) : null}

      {state.formError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.formError}</div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="sku" className="text-sm font-medium text-slate-700">
            SKU
          </label>
          <input
            id="sku"
            name="sku"
            defaultValue={fieldValue(values?.sku, item.sku)}
            required
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.sku ? <p className="text-sm text-rose-600">{state.fieldErrors.sku}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="barcode" className="text-sm font-medium text-slate-700">
            Barcode (optional)
          </label>
          <input
            id="barcode"
            name="barcode"
            defaultValue={fieldValue(values?.barcode, item.barcode ?? '')}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.barcode ? <p className="text-sm text-rose-600">{state.fieldErrors.barcode}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={fieldValue(values?.name, item.name)}
            required
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.name ? <p className="text-sm text-rose-600">{state.fieldErrors.name}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="taxRate" className="text-sm font-medium text-slate-700">
            Tax rate (%)
          </label>
          <input
            id="taxRate"
            name="taxRate"
            inputMode="decimal"
            defaultValue={fieldValue(values?.taxRate, item.taxRate.toString())}
            required
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.taxRate ? <p className="text-sm text-rose-600">{state.fieldErrors.taxRate}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={fieldValue(values?.description, item.description ?? '')}
          className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
        {state.fieldErrors?.description ? <p className="text-sm text-rose-600">{state.fieldErrors.description}</p> : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={fieldValue(values?.categoryId, item.categoryId ?? '')}
          className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="">Uncategorized</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryId ? <p className="text-sm text-rose-600">{state.fieldErrors.categoryId}</p> : null}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="basePrice" className="text-sm font-medium text-slate-700">
            Base price (₹)
          </label>
          <input
            id="basePrice"
            name="basePrice"
            inputMode="decimal"
            defaultValue={fieldValue(values?.basePrice, item.basePrice.toFixed(2))}
            required
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.basePrice ? <p className="text-sm text-rose-600">{state.fieldErrors.basePrice}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="costPrice" className="text-sm font-medium text-slate-700">
            Cost price (₹)
          </label>
          <input
            id="costPrice"
            name="costPrice"
            inputMode="decimal"
            defaultValue={fieldValue(values?.costPrice, item.costPrice.toFixed(2))}
            required
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          {state.fieldErrors?.costPrice ? <p className="text-sm text-rose-600">{state.fieldErrors.costPrice}</p> : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Margin guidance</p>
          <p className="mt-1">
            Ensure your base price stays above cost to maintain profitability across discount scenarios.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <input
            type="checkbox"
            name="trackInventory"
            defaultChecked={values?.trackInventory ?? item.trackInventory}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            <span className="block text-sm font-medium text-slate-900">Track inventory</span>
            <span className="mt-1 block text-sm text-slate-600">
              Deduct stock automatically across every connected store and channel.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <input
            type="checkbox"
            name="isSerialized"
            defaultChecked={values?.isSerialized ?? item.isSerialized}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            <span className="block text-sm font-medium text-slate-900">Serialized item</span>
            <span className="mt-1 block text-sm text-slate-600">
              Require unique serial numbers for procurement and POS fulfilment.
            </span>
          </span>
        </label>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}

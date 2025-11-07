'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { createItemAction, createItemInitialState } from '../_actions/create-item'

type ItemFormProps = {
  categories: Array<{ id: string; name: string }>
}

type ErrorTextProps = {
  message?: string
}

function ErrorText({ message }: ErrorTextProps) {
  if (!message) return null
  return <p className="mt-1 text-sm text-rose-600">{message}</p>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? 'Saving…' : 'Create item'}
    </button>
  )
}

export function ItemForm({ categories }: ItemFormProps) {
  const [state, formAction] = useFormState(createItemAction, createItemInitialState)
  const values = state.values ?? createItemInitialState.values

  return (
    <form action={formAction} className="space-y-8">
      {state.formError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.formError}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="sku" className="text-sm font-medium text-slate-700">
            SKU
          </label>
          <input
            id="sku"
            name="sku"
            required
            defaultValue={values?.sku}
            placeholder="e.g. SHIRT-001"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.sku} />
        </div>

        <div className="space-y-2">
          <label htmlFor="barcode" className="text-sm font-medium text-slate-700">
            Barcode (optional)
          </label>
          <input
            id="barcode"
            name="barcode"
            defaultValue={values?.barcode}
            placeholder="EAN / UPC"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.barcode} />
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={values?.name}
            placeholder="Item name"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.name} />
        </div>

        <div className="space-y-2">
          <label htmlFor="basePrice" className="text-sm font-medium text-slate-700">
            Base price (₹)
          </label>
          <input
            id="basePrice"
            name="basePrice"
            inputMode="decimal"
            required
            defaultValue={values?.basePrice}
            placeholder="0.00"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.basePrice} />
        </div>

        <div className="space-y-2">
          <label htmlFor="costPrice" className="text-sm font-medium text-slate-700">
            Cost price (₹)
          </label>
          <input
            id="costPrice"
            name="costPrice"
            inputMode="decimal"
            required
            defaultValue={values?.costPrice}
            placeholder="0.00"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.costPrice} />
        </div>

        <div className="space-y-2">
          <label htmlFor="taxRate" className="text-sm font-medium text-slate-700">
            Tax rate (%)
          </label>
          <input
            id="taxRate"
            name="taxRate"
            inputMode="decimal"
            required
            defaultValue={values?.taxRate}
            placeholder="18"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.taxRate} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={values?.description}
          rows={4}
          placeholder="Add internal notes or display copy"
          className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
        <ErrorText message={state.fieldErrors?.description} />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={values?.categoryId ?? ''}
          className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="">Uncategorized</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ErrorText message={state.fieldErrors?.categoryId} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <input
            type="checkbox"
            name="trackInventory"
            defaultChecked={values?.trackInventory ?? true}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            <span className="block text-sm font-medium text-slate-900">Track inventory</span>
            <span className="mt-1 block text-sm text-slate-600">
              Deduct and reserve stock automatically across all linked stores.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <input
            type="checkbox"
            name="isSerialized"
            defaultChecked={values?.isSerialized ?? false}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            <span className="block text-sm font-medium text-slate-900">Serialized item</span>
            <span className="mt-1 block text-sm text-slate-600">
              Require a unique serial or IMEI for each unit sold.
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

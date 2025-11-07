'use client'

import { useFormState, useFormStatus } from 'react-dom'

import {
  createCategoryAction,
  createCategoryInitialState,
  type CategoryFormValues,
  type CreateCategoryFormState
} from '../_actions/create-category'

type CategoryFormProps = {
  parentOptions: Array<{ id: string; name: string }>
}

function ErrorText({ message }: { message?: string }) {
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
      {pending ? 'Saving…' : 'Create category'}
    </button>
  )
}

function fieldValue(value: CategoryFormValues[keyof CategoryFormValues], fallback: string) {
  if (typeof value === 'string') {
    return value
  }

  return fallback
}

export function CategoryForm({ parentOptions }: CategoryFormProps) {
  const [state, formAction] = useFormState<CreateCategoryFormState, FormData>(
    createCategoryAction,
    createCategoryInitialState
  )

  const values = state.values ?? createCategoryInitialState.values

  return (
    <form action={formAction} className="space-y-8">
      {state.formError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.formError}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={fieldValue(values?.name, '')}
            placeholder="e.g. Apparel"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <ErrorText message={state.fieldErrors?.name} />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-slate-700">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={fieldValue(values?.slug, '')}
            placeholder="apparel"
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <p className="text-xs text-slate-500">Lowercase letters, numbers, and hyphens only.</p>
          <ErrorText message={state.fieldErrors?.slug} />
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
          defaultValue={fieldValue(values?.description, '')}
          placeholder="Visible to internal teams and channel storefronts."
          className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
        <ErrorText message={state.fieldErrors?.description} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="parentId" className="text-sm font-medium text-slate-700">
            Parent category
          </label>
          <select
            id="parentId"
            name="parentId"
            defaultValue={fieldValue(values?.parentId, '')}
            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">No parent</option>
            {parentOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <ErrorText message={state.fieldErrors?.parentId} />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <input
              type="checkbox"
              name="isActive"
              value="true"
              defaultChecked={values?.isActive ?? true}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-700">
              {values?.isActive ? 'Active – available to assign to items' : 'Inactive – hidden from listings'}
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}

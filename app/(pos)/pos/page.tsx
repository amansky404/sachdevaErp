const keypad = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '⌫']

export default function PosRegisterPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Active Cart</h2>
            <p className="text-sm text-slate-500">Scan items or use the keypad to add SKUs.</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">SYNCED</span>
        </header>
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Cart and line item UI will render here.
        </div>
      </section>

      <aside className="space-y-4">
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          {keypad.map(key => (
            <button
              key={key}
              type="button"
              className="rounded-xl bg-slate-100 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              {key}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Shift Summary</h3>
          <p className="mt-2 text-sm text-slate-600">Track cash drawer status, tenders, and closing notes.</p>
        </div>
      </aside>
    </div>
  )
}

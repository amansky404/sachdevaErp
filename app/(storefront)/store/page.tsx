const metrics = [
  { label: 'Live Visitors', value: '128', trend: '+12% vs yesterday' },
  { label: 'Conversion Rate', value: '3.7%', trend: '+0.4pp' },
  { label: 'Average Order Value', value: '₹2,150', trend: '-2.3% vs target' }
]

export default function StoreDashboardPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-4 sm:grid-cols-3">
        {metrics.map(metric => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
            <p className="text-xs text-emerald-600">{metric.trend}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Channel Health</h2>
        <p className="mt-3 text-sm text-slate-600">
          Integrate your storefront and marketing automation to populate channel analytics, sync catalog availability, and
          manage fulfillment workflows.
        </p>
      </section>
    </div>
  )
}

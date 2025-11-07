import Link from 'next/link'

const quickLinks = [
  { title: 'Create Item', description: 'Add a new product with pricing, tax, and channel visibility.', href: '/admin/items/new' },
  { title: 'Invite User', description: 'Onboard staff and assign appropriate roles and store permissions.', href: '/admin/people/invite' },
  { title: 'Configure Store', description: 'Manage store profiles, payment options, and hardware integrations.', href: '/admin/settings/stores' }
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 sm:grid-cols-2">
        {quickLinks.map(link => (
          <Link
            key={link.title}
            href={link.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">{link.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{link.description}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Today&apos;s Signals</h2>
        <p className="mt-3 text-sm text-slate-600">
          Analytics widgets, alerts, and workflow summaries will live here. Wire up inventory thresholds, sales trends, and
          pending approvals to drive decisions.
        </p>
      </section>
    </div>
  )
}

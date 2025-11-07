const modules = [
  {
    title: 'ERP Core',
    description:
      'Configure master data, suppliers, catalogs, and organization-wide settings from a single control plane.'
  },
  {
    title: 'Inventory Engine',
    description:
      'Track stock in real time across warehouses, stores, and the e-commerce channel with audit-ready history.'
  },
  {
    title: 'POS (Offline-first)',
    description:
      'Ensure uninterrupted billing with resilient terminals, shift controls, and automatic sync queues.'
  },
  {
    title: 'Unified Commerce',
    description:
      'Power your storefront, customer loyalty, and omnichannel promotions without duplicating data.'
  }
]

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-24">
      <section className="space-y-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-slate-500">Sachdeva Retail Platform</p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Build once, run your entire retail business everywhere
        </h1>
        <p className="mx-auto max-w-3xl text-pretty text-lg text-slate-600">
          This workspace bootstraps the foundations for a modular ERP, POS, and e-commerce stack. Authentication, RBAC,
          database schema, and layout primitives are prepared so feature teams can focus on delivering business value.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {modules.map(module => (
          <article
            key={module.title}
            className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">{module.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-indigo-300 bg-indigo-50/80 p-8 text-left">
        <h2 className="text-2xl font-semibold text-indigo-900">Next steps</h2>
        <ol className="mt-4 space-y-3 text-sm text-indigo-900">
          <li>1. Configure the database connection and run <code>npx prisma migrate dev</code>.</li>
          <li>2. Seed baseline roles and permissions or connect to your identity provider.</li>
          <li>3. Start building module features inside the provided admin, POS, and store layouts.</li>
        </ol>
      </section>
    </main>
  )
}

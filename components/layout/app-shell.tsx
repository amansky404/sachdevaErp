import type { ReactNode } from 'react'

import { NavLink } from './nav-link'

export type NavigationItem = {
  label: string
  href: string
  exact?: boolean
}

type AppShellProps = {
  title: string
  subtitle?: string
  navigation: NavigationItem[]
  actions?: ReactNode
  children: ReactNode
}

export function AppShell({ title, subtitle, navigation, actions, children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh w-full bg-slate-50">
      <aside className="hidden min-h-dvh w-60 flex-shrink-0 border-r border-slate-200 bg-white/80 px-6 py-8 lg:block">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Sachdeva Suite</p>
            <h1 className="mt-2 text-lg font-semibold text-slate-900">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>

          <nav className="space-y-1">
            {navigation.map(item => (
              <NavLink key={item.href} href={item.href} exact={item.exact}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-3">{actions}</div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  )
}

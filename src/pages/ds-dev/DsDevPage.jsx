import { useEffect } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { SECTIONS } from './sections'

// Design-system foundations page. Only the selected section is rendered, so
// scrolling can never reveal another one; the URL (/ds-dev/<section>) holds
// the selection, so refresh and back/forward work.
export default function DsDevPage() {
  const { section } = useParams()
  const current = SECTIONS.find(s => s.slug === section)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [section])

  if (!current) return <Navigate to={`/ds-dev/${SECTIONS[0].slug}`} replace />
  const { Component } = current

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen shrink-0 flex-col gap-indents-x border-r border-border-default bg-surface-card p-indents-m">
        <p className="text-heading-h3">Misha DS</p>
        <nav aria-label="Foundations">
          <ul className="flex flex-col gap-indents-xxs">
            {SECTIONS.map(s => (
              <li key={s.slug}>
                <NavLink
                  to={`/ds-dev/${s.slug}`}
                  className={({ isActive }) =>
                    `block rounded-rounds-m px-indents-s-inner py-indents-xs text-text-grotesk focus-visible:outline-2 focus-visible:outline-border-focus ${
                      isActive ? 'bg-accent-primary text-text-on-accent' : 'text-text-primary hover:bg-surface-control'
                    }`
                  }
                >
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-indents-x">
        <h1 className="pb-indents-x text-heading-h1">{current.label}</h1>
        <Component />
      </main>
    </div>
  )
}

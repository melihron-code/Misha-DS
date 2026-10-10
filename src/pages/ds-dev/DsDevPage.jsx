import { useEffect } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { SECTIONS } from './sections'

// Content column, built from tokens: size/base with (830) + 2 × indents/XXL (out) (90)
// = 1010px, plus the main area's own padding (indents/X on both sides).
const MAIN_MAX_WIDTH = 'calc(var(--size-base-with) + var(--indents-xxl-out) * 2 + var(--indents-x) * 2)'

// Design-system foundations page. Only the selected section is rendered, so
// scrolling can never reveal another one; the URL (/ds-dev/<section>) holds
// the selection, so refresh and back/forward work.
// Layout: [white filler | sidebar | content | page-color filler]. The two
// fillers grow equally, so sidebar + content stay centered as one block and
// the white of the sidebar extends to the left edge of the window.
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
      <div className="flex-1 bg-surface-card" aria-hidden="true" />
      <aside className="sticky top-0 flex h-screen shrink-0 flex-col gap-indents-x border-r border-border-default bg-surface-card p-indents-m">
        <p className="text-heading-h3">Misha DS</p>
        <nav aria-label="Foundations">
          <ul className="flex flex-col gap-indents-xxs">
            {SECTIONS.map(s => (
              <li key={s.slug}>
                <NavLink
                  to={`/ds-dev/${s.slug}`}
                  className={({ isActive }) =>
                    `block rounded-rounds-m px-indents-s-inner py-indents-xs text-heading-h4 focus-visible:outline-2 focus-visible:outline-border-focus ${
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
      <main className="w-full min-w-0 p-indents-x" style={{ maxWidth: MAIN_MAX_WIDTH }}>
        <h1 className="pb-indents-x text-heading-h1">{current.label}</h1>
        <Component />
      </main>
      <div className="flex-1" aria-hidden="true" />
    </div>
  )
}

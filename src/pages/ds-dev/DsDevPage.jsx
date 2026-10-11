import { useEffect } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import { NAV, pageFor } from './sections'

// Content column = size/base with (830px), plus the main area's own padding
// (indents/X on both sides).
const MAIN_MAX_WIDTH = 'calc(var(--size-base-with) + var(--indents-x) * 2)'

const linkClass = (isActive, size) =>
  `block rounded-radius-m px-indents-s-inner ${size} focus-ring transition-state ${
    isActive ? 'bg-accent-primary text-text-on-accent' : 'text-text-primary hover:bg-surface-control'
  }`

// Design-system page. Only the selected item's page is rendered (a foundation, or the
// Atoms page, which holds every atom and scrolls between them); the URL (/ds-dev/<item>
// or /ds-dev/atoms/<atom>) holds the selection, so refresh and back/forward work.
// Layout: [white filler | sidebar | content | page-color filler]. The two fillers
// grow equally, so sidebar + content stay centered and the sidebar's white reaches
// the left edge of the window.
export default function DsDevPage() {
  const { pathname } = useLocation()
  const path = pathname.replace(/^\/ds-dev\/?/, '').replace(/\/$/, '')
  const current = pageFor(path)

  // A new foundation starts at the top; the Atoms page does its own scrolling.
  useEffect(() => {
    if (current && !current.children) window.scrollTo(0, 0)
  }, [current])

  if (!current) return <Navigate to={`/ds-dev/${path.startsWith('atoms') ? 'atoms' : NAV[0].path}`} replace />

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-surface-card" aria-hidden="true" />
      <aside className="sticky top-0 flex h-screen shrink-0 flex-col gap-indents-x overflow-y-auto border-r border-border-default bg-surface-card p-indents-m">
        <p className="text-heading-h3">Misha DS</p>
        <nav aria-label="Design system">
          <ul className="flex flex-col gap-indents-2xs">
            {NAV.map(i => (
              <li key={i.path} className="flex flex-col gap-indents-2xs">
                <NavLink to={`/ds-dev/${i.path}`} end className={({ isActive }) => linkClass(isActive, 'py-indents-xs text-heading-h4')}>
                  {i.label}
                </NavLink>
                {i.children && (
                  <ul className="ml-indents-s-inner flex flex-col gap-indents-2xs border-l border-border-default pl-indents-xs">
                    {i.children.map(c => (
                      <li key={c.path}>
                        <NavLink to={`/ds-dev/${c.path}`} end className={({ isActive }) => linkClass(isActive, 'py-indents-2xs text-text-grotesk')}>
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="w-full min-w-0 p-indents-x" style={{ maxWidth: MAIN_MAX_WIDTH }}>
        <h1 className="pb-indents-x text-heading-h1">{current.label}</h1>
        {current.render()}
      </main>
      <div className="flex-1" aria-hidden="true" />
    </div>
  )
}

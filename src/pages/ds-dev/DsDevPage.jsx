import { useEffect } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import { GROUPS, ITEMS } from './sections'

// Content column = size/base with (830px), plus the main area's own padding
// (indents/X on both sides).
const MAIN_MAX_WIDTH = 'calc(var(--size-base-with) + var(--indents-x) * 2)'

// Design-system page. Only the selected item is rendered, so scrolling can never
// reveal another one; the URL (/ds-dev/<item> or /ds-dev/atoms/<atom>) holds the
// selection, so refresh and back/forward work.
// Layout: [white filler | sidebar | content | page-color filler]. The two fillers
// grow equally, so sidebar + content stay centered and the sidebar's white reaches
// the left edge of the window.
export default function DsDevPage() {
  const { pathname } = useLocation()
  const path = pathname.replace(/^\/ds-dev\/?/, '').replace(/\/$/, '')
  const current = ITEMS.find(i => i.path === path)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  if (!current) return <Navigate to={`/ds-dev/${path.startsWith('atoms') ? 'atoms/icons' : ITEMS[0].path}`} replace />

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-surface-card" aria-hidden="true" />
      <aside className="sticky top-0 flex h-screen shrink-0 flex-col gap-indents-x overflow-y-auto border-r border-border-default bg-surface-card p-indents-m">
        <p className="text-heading-h3">Misha DS</p>
        <nav aria-label="Design system" className="flex flex-col gap-indents-l">
          {GROUPS.map(g => (
            <div key={g.label} className="flex flex-col gap-indents-xs">
              <h2 className="px-indents-s-inner text-text-caps text-text-secondary">{g.label}</h2>
              <ul className="flex flex-col gap-indents-2xs">
                {g.items.map(i => (
                  <li key={i.path}>
                    <NavLink
                      to={`/ds-dev/${i.path}`}
                      end
                      className={({ isActive }) =>
                        `block rounded-radius-m px-indents-s-inner py-indents-xs text-heading-h4 focus-ring transition-state ${
                          isActive ? 'bg-accent-primary text-text-on-accent' : 'text-text-primary hover:bg-surface-control'
                        }`
                      }
                    >
                      {i.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

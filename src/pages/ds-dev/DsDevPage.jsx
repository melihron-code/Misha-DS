import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import { ArrowDownIcon } from '../../components/icons'
import { NAV, pageFor } from './sections'

// Content column = size/base with (830px), plus the main area's own padding
// (indents/X on both sides).
const MAIN_MAX_WIDTH = 'calc(var(--size-base-with) + var(--indents-x) * 2)'
// Sidebar: a fixed 200px (indents/M × 10), scrollbar space included, so it never changes
// width whatever is open or selected.
const SIDEBAR_WIDTH = 'calc(var(--indents-m) * 10)'

const linkClass = (isActive, size) =>
  `block rounded-radius-m px-indents-s-inner ${size} focus-ring transition-state ${
    isActive ? 'bg-accent-primary text-text-on-accent' : 'text-text-primary hover:bg-surface-control'
  }`

// The group (Atoms, Molecules) a path belongs to.
const groupOf = path => NAV.find(i => i.children && (path === i.path || path.startsWith(`${i.path}/`)))?.path ?? null

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The previews' sample data links to site pages (a person, a team, home). Inside the docs those links keep their
// look and states but don't leave the page; links between docs pages and to other sites still work.
function stayInDocs(e) {
  const a = e.target.closest?.('a[href]')
  if (!a || a.origin !== window.location.origin || a.pathname.startsWith('/ds-dev')) return
  e.preventDefault()
}

// Scrolls the sidebar (only) so `el` is fully visible; if it's taller than the sidebar, so its
// top sits at the top. Nothing happens when it's already fully visible. The sidebar's own
// padding is kept as a margin.
function revealInSidebar(aside, el, smooth) {
  const pad = parseFloat(getComputedStyle(aside).paddingTop) || 0
  const a = aside.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  const top = r.top - a.top + aside.scrollTop
  const bottom = top + r.height
  const view = aside.clientHeight
  if (top >= aside.scrollTop && bottom <= aside.scrollTop + view) return
  const target = r.height + 2 * pad > view || top < aside.scrollTop ? top - pad : bottom - view + pad
  aside.scrollTo({ top: Math.max(0, target), behavior: smooth && !reducedMotion() ? 'smooth' : 'auto' })
}

// Design-system page. Only the selected item's page is rendered (a foundation, or the
// Atoms or Molecules page, which holds every component and scrolls between them); the URL
// (/ds-dev/<item> or /ds-dev/<group>/<component>) holds the selection, so refresh and
// back/forward work.
// Layout: [white filler | sidebar | content | page-color filler]. The two fillers
// grow equally, so sidebar + content stay centered and the sidebar's white reaches
// the left edge of the window.
//
// Sidebar groups (Atoms, Molecules): opening one (its title or its arrow, or arriving on one
// of its pages) closes the others, except the active one (holding the current page), animates
// open, then scrolls the sidebar so the group is visible. Title and arrow also close a group.
export default function DsDevPage() {
  const { pathname } = useLocation()
  const path = pathname.replace(/^\/ds-dev\/?/, '').replace(/\/$/, '')
  const current = pageFor(path)
  const currentGroup = groupOf(path)

  const asideRef = useRef(null)
  const groupRefs = useRef({})
  const submenuRefs = useRef({})
  // Open groups. Opening one closes the others, except the active group (the one holding the
  // current page), which stays open.
  const [open, setOpen] = useState(() => (currentGroup ? [currentGroup] : []))
  // Groups closing because another one opened: they collapse slower (2 × duration/base).
  const [slow, setSlow] = useState([])
  const openGroup = p => {
    setSlow(open.filter(g => g !== p && g !== currentGroup))
    setOpen([...open.filter(g => g === currentGroup && g !== p), p])
  }
  const closeGroup = p => {
    setSlow([])
    setOpen(open.filter(g => g !== p))
  }
  const prevOpen = useRef(open) // the open groups last revealed (not on load)

  // Arriving on a page of another group opens that group; the group you came from stays
  // open (state adjusted during render). A click that already opened it changes nothing here.
  const [seenGroup, setSeenGroup] = useState(currentGroup)
  if (currentGroup !== seenGroup) {
    setSeenGroup(currentGroup)
    if (currentGroup && !open.includes(currentGroup)) {
      setSlow(open.filter(g => g !== seenGroup))
      setOpen([...open.filter(g => g === seenGroup), currentGroup])
    }
  }

  // On load: the sidebar shows the active item (no animation).
  useLayoutEffect(() => {
    const reveal = () => {
      const active = asideRef.current?.querySelector('nav a[aria-current="page"]')
      if (active) revealInSidebar(asideRef.current, active, false)
    }
    reveal()
    document.fonts.ready.then(reveal)
  }, [])

  // After a group opens, bring it into view in the sidebar, once the layout has settled: its
  // expand animation and, if another group is closing (slower), that collapse too.
  useEffect(() => {
    const opened = open.find(g => !prevOpen.current.includes(g))
    prevOpen.current = open
    if (!opened) return
    const aside = asideRef.current
    const group = groupRefs.current[opened]
    const moving = [opened, ...slow].map(g => submenuRefs.current[g]).filter(Boolean)
    if (!aside || !group || !moving.length) return
    const reveal = () => revealInSidebar(aside, group, true)
    if (reducedMotion()) return reveal()
    const pending = new Set(moving)
    let done = false
    const finish = () => {
      if (done) return
      done = true
      moving.forEach(el => el.removeEventListener('transitionend', onEnd))
      clearTimeout(timer)
      reveal()
    }
    const onEnd = e => {
      if (e.propertyName !== 'grid-template-rows' || !pending.has(e.target)) return
      pending.delete(e.target)
      if (!pending.size) finish()
    }
    moving.forEach(el => el.addEventListener('transitionend', onEnd))
    // Fallback in case a transitionend doesn't fire: the slowest animation plus a frame.
    const ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-base')) || 200
    const timer = setTimeout(finish, ms * (slow.length ? 2 : 1) + 50)
    return () => {
      done = true
      moving.forEach(el => el.removeEventListener('transitionend', onEnd))
      clearTimeout(timer)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // A new foundation starts at the top; the Atoms and Molecules pages do their own scrolling.
  useEffect(() => {
    if (current && !current.children) window.scrollTo(0, 0)
  }, [current])

  if (!current) return <Navigate to={`/ds-dev/${NAV.find(i => i.children && path.startsWith(`${i.path}/`))?.path ?? NAV[0].path}`} replace />

  return (
    <div className="flex min-h-screen">
      <title>Misha DS</title>
      <div className="flex-1 bg-surface-card" aria-hidden="true" />
      <aside
        ref={asideRef}
        className="sticky top-0 flex h-screen shrink-0 flex-col gap-indents-x overflow-y-auto scrollbar-stable border-r border-border-default bg-surface-card p-indents-m"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <p className="text-heading-h3">Misha DS</p>
        <nav aria-label="Design system">
          <ul className="flex flex-col gap-indents-2xs">
            {NAV.map(i => {
              if (!i.children) {
                return (
                  <li key={i.path}>
                    <NavLink to={`/ds-dev/${i.path}`} end className={({ isActive }) => linkClass(isActive, 'py-indents-xs text-heading-h4')}>
                      {i.label}
                    </NavLink>
                  </li>
                )
              }
              const isOpen = open.includes(i.path)
              const selected = path === i.path
              return (
                <li key={i.path} ref={el => (groupRefs.current[i.path] = el)} className="flex flex-col">
                  {/* The whole row (title and arrow) carries the selected fill and the hover. Both
                      open or close the group; opening by the title also goes to the group's page. */}
                  <div
                    className={`flex items-center rounded-radius-m transition-state ${
                      selected ? 'bg-accent-primary text-text-on-accent' : 'text-text-primary hover:bg-surface-control'
                    }`}
                  >
                    <NavLink
                      to={`/ds-dev/${i.path}`}
                      end
                      onClick={e => {
                        if (isOpen) {
                          e.preventDefault()
                          closeGroup(i.path)
                        } else openGroup(i.path)
                      }}
                      className="flex-1 rounded-radius-m py-indents-xs pl-indents-s-inner text-heading-h4 focus-ring"
                    >
                      {i.label}
                    </NavLink>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`submenu-${i.path}`}
                      aria-label={`${i.label} submenu`}
                      onClick={() => {
                        if (isOpen) closeGroup(i.path)
                        else openGroup(i.path)
                      }}
                      className="inline-flex shrink-0 cursor-pointer self-stretch items-center rounded-radius-m px-indents-xs focus-ring"
                    >
                      {/* Down while closed, up while open: the same icon turned 180°. */}
                      <span className={`inline-flex transition-state ${isOpen ? 'rotate-180' : ''}`}>
                        <ArrowDownIcon size={16} />
                      </span>
                    </button>
                  </div>
                  <div
                    id={`submenu-${i.path}`}
                    ref={el => (submenuRefs.current[i.path] = el)}
                    className="collapsible"
                    data-open={isOpen || undefined}
                    data-slow={slow.includes(i.path) || undefined}
                    inert={!isOpen}
                  >
                    <div>
                      <ul className="mt-indents-2xs ml-indents-s-inner flex flex-col gap-indents-2xs border-l border-border-default pl-indents-xs">
                        {i.children.map(c => (
                          <li key={c.path}>
                            <NavLink to={`/ds-dev/${c.path}`} end className={({ isActive }) => linkClass(isActive, 'py-indents-2xs text-text-grotesk')}>
                              {c.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <main className="w-full min-w-0 p-indents-x" style={{ maxWidth: MAIN_MAX_WIDTH }} onClickCapture={stayInDocs} onAuxClickCapture={stayInDocs}>
        <h1 className="pb-indents-x text-heading-h1">{current.label}</h1>
        {current.render()}
      </main>
      <div className="flex-1" aria-hidden="true" />
    </div>
  )
}

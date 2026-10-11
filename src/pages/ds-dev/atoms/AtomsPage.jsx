import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AtomPage from './AtomPage'
import { ATOM_PAGES } from './atomDocs'
import AtomsOverview from './AtomsOverview'

// 160px between atoms: indents/M × 8.
const ATOM_GAP = 'calc(var(--indents-m) * 8)'

// /ds-dev/atoms: the overview, then every atom one after another, so you can scroll
// between them.
// - Opening /ds-dev/atoms/<slug> (a menu link, a card, a reload) jumps to that atom.
// - Scrolling updates the URL, and with it the highlighted menu item. Those URL changes
//   are marked `fromScroll`, so they don't jump.
// - The last atom is at least a screen tall, so every atom can reach the top.
export default function AtomsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.fromScroll) return
    const slug = location.pathname.split('/')[3]
    const jump = () => {
      const target = slug && document.getElementById(`atom-${slug}`)
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    }
    jump()
    // On a fresh load the custom fonts arrive after the jump and move the atoms down:
    // jump again once they're in (unless something else was opened meanwhile).
    let current = true
    document.fonts.ready.then(() => current && jump())
    return () => {
      current = false
    }
  }, [location.key]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let frame
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // The current atom is the last one whose top has passed a third of the window.
        const line = window.innerHeight / 3
        let slug
        for (const el of document.querySelectorAll('[data-atom]')) {
          if (el.getBoundingClientRect().top <= line) slug = el.dataset.atom
        }
        const to = slug ? `/ds-dev/atoms/${slug}` : '/ds-dev/atoms'
        if (to !== window.location.pathname.replace(/\/$/, '')) navigate(to, { replace: true, state: { fromScroll: true } })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [navigate])

  return (
    <div className="flex flex-col" style={{ gap: ATOM_GAP }}>
      <AtomsOverview />
      {ATOM_PAGES.map((page, i) => (
        <section
          key={page.slug}
          id={`atom-${page.slug}`}
          data-atom={page.slug}
          aria-labelledby={`atom-${page.slug}-title`}
          className={`scroll-mt-indents-x ${i === ATOM_PAGES.length - 1 ? 'min-h-screen' : ''}`}
        >
          <h2 id={`atom-${page.slug}-title`} className="pb-indents-x text-heading-h1">
            {page.label}
          </h2>
          <AtomPage page={page} />
        </section>
      ))}
    </div>
  )
}

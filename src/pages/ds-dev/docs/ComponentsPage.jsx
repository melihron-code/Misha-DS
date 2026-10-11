import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DocPage from './DocPage'
import Overview from './Overview'

// 160px between components: indents/M × 8.
const GAP = 'calc(var(--indents-m) * 8)'

// /ds-dev/<base> (atoms, molecules): the overview, then every page one after another, so you
// can scroll between them.
// - Opening /ds-dev/<base>/<slug> (a menu link, a card, a reload) jumps to that page.
// - Scrolling updates the URL, and with it the highlighted menu item. Those URL changes
//   are marked `fromScroll`, so they don't jump.
// - The last page is at least a screen tall, so every page can reach the top.
export default function ComponentsPage({ base, pages }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.fromScroll) return
    const slug = location.pathname.split('/')[3]
    const jump = () => {
      const target = slug && document.getElementById(`${base}-${slug}`)
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    }
    jump()
    // On a fresh load the custom fonts arrive after the jump and move the pages down:
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
        // The current page is the last one whose top has passed a third of the window.
        const line = window.innerHeight / 3
        let slug
        for (const el of document.querySelectorAll('[data-doc]')) {
          if (el.getBoundingClientRect().top <= line) slug = el.dataset.doc
        }
        const to = slug ? `/ds-dev/${base}/${slug}` : `/ds-dev/${base}`
        if (to !== window.location.pathname.replace(/\/$/, '')) navigate(to, { replace: true, state: { fromScroll: true } })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [base, navigate])

  return (
    <div className="flex flex-col" style={{ gap: GAP }}>
      <Overview base={base} pages={pages} />
      {pages.map((page, i) => (
        <section
          key={page.slug}
          id={`${base}-${page.slug}`}
          data-doc={page.slug}
          aria-labelledby={`${base}-${page.slug}-title`}
          className={`scroll-mt-indents-x ${i === pages.length - 1 ? 'min-h-screen' : ''}`}
        >
          <h2 id={`${base}-${page.slug}-title`} className="pb-indents-x text-heading-h1">
            {page.label}
          </h2>
          <DocPage page={page} />
        </section>
      ))}
    </div>
  )
}

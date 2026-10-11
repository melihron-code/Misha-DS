import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

// The page root of every site page. It's the container named "page" (CLAUDE.md rule 9), as wide as the window,
// on bg/default; anything wider is clipped, never scrolled sideways. Each section keeps its content within
// size/page (1440px), centered; only full-bleed backgrounds (HeroSection's backdrop) span the whole window.
// - Links: the components render plain <a href>; a click on one inside the site goes through the router
//   (no reload). Modified clicks (new tab…), other sites and downloads are left to the browser.
// - On every page change the window scrolls to the top. Each page sets its own tab title (<title>).
export default function SiteLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const onClick = e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest('a[href]')
    if (!a || a.target || a.hasAttribute('download')) return
    const url = new URL(a.href)
    if (url.origin !== window.location.origin) return
    e.preventDefault()
    navigate(url.pathname + url.search + url.hash)
  }

  return (
    // The click handler only routes clicks on real links inside; it adds no interaction of its own.
    <div onClick={onClick} className="min-h-screen bg-bg-default">
      <div className="@container/page flex min-h-screen w-full flex-col overflow-x-clip">
        <Outlet />
      </div>
    </div>
  )
}

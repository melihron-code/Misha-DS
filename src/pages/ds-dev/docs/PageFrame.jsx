import { useLayoutEffect, useRef, useState } from 'react'

// A page of a given width (a CSS length from the size tokens, e.g. var(--size-page)), scaled down to fit
// the space it's given. It's the container named "page", so components inside react as if the window were
// that wide (their @…/page: rules and the mobile text styles), without resizing the browser.
// The scale is a transform; the outer box takes the scaled height so nothing overlaps.
// minHeight: room below the content inside the page (e.g. for an open menu panel).
export default function PageFrame({ width, minHeight, children }) {
  const outer = useRef(null)
  const inner = useRef(null)
  const [box, setBox] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return
      const scale = Math.min(1, outer.current.clientWidth / inner.current.offsetWidth)
      setBox({ scale, height: inner.current.offsetHeight * scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(outer.current)
    ro.observe(inner.current)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: box.height }}>
      <div
        ref={inner}
        className="@container/page origin-top-left bg-bg-default"
        style={{ width, minHeight, transform: `scale(${box.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

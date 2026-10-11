import { useEffect, useId, useRef, useState } from 'react'
import { Button, Logo, NavTab, TextLink } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: TopMenu. activeTab all-teams | templates | none (which tab is the current page).
// The top bar of every page: Logo, "Generate report" (Button on-color), the NavTabs and the user's links,
// with a divider/inverse line under it, padded indents/M × indents/S (inner).
// Responsive (container "page"): desktop as Figma; tablet tightens the gap after the logo (indents/X instead
// of indents/XXL (out)); mobile shows the logo and a "Menu" button that opens a panel with everything else.
// The panel (bg/default like the bar, so the white tab outline and button show) closes on Escape, a click
// outside or choosing a link, and gives focus back to the button.
export default function TopMenu({
  activeTab = 'all-teams',
  tabs = [],
  links = [],
  logoHref = '/',
  reportLabel = 'Generate report',
  onGenerateReport,
  menuLabel = 'Menu',
  className,
  ...rest
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  const close = (refocus = true) => {
    setOpen(false)
    if (refocus) buttonRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    // Focus the first item once the panel is visible (it's still hidden on the opening frame).
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector('a, button')?.focus())
    const onKey = e => e.key === 'Escape' && close()
    const onDown = e => !rootRef.current?.contains(e.target) && close(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const report = (
    <Button variant="on-color" onClick={onGenerateReport}>
      {reportLabel}
    </Button>
  )
  const tabList = tabs.map(t => <NavTab key={t.id} label={t.label} href={t.href} selected={t.id === activeTab} />)
  const linkList = links.map(l => (
    <TextLink key={l.label} href={l.href} onClick={l.onClick}>
      {l.label}
    </TextLink>
  ))

  return (
    <div
      ref={rootRef}
      className={cx('relative flex items-center justify-between gap-indents-m border-b border-divider-inverse px-indents-m py-indents-s-inner', className)}
      {...rest}
    >
      <div className="flex min-w-0 items-center gap-indents-xxl-out @max-desktop/page:gap-indents-x">
        <Logo href={logoHref} />
        <nav aria-label="Main" className="flex items-center gap-indents-m @max-tablet/page:hidden">
          {report}
          {tabList}
        </nav>
      </div>
      <div className="flex items-center gap-indents-xs @max-tablet/page:hidden">{linkList}</div>

      {/* Mobile: the menu button and its panel. */}
      {/* The wrapper shows and hides the Button (the atom keeps its own display). */}
      <div className="hidden @max-tablet/page:block">
        <Button ref={buttonRef} variant="on-color" aria-expanded={open} aria-controls={panelId} onClick={() => (open ? close() : setOpen(true))}>
          {menuLabel}
        </Button>
      </div>
      <div
        id={panelId}
        ref={panelRef}
        inert={!open}
        onClick={e => e.target.closest('a') && close(false)}
        className={cx(
          'absolute inset-x-0 top-full z-10 hidden flex-col items-start gap-indents-m bg-bg-default p-indents-m shadow-card transition-state @max-tablet/page:flex',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-indents-xs opacity-0',
        )}
        // Opening: visible at once (so focus can move in), then fade and slide in. Closing: fade out
        // first, then hidden (visibility is transitioned only when closing).
        style={{ transitionProperty: open ? 'opacity, transform, translate' : 'opacity, transform, translate, visibility', transitionDuration: 'var(--duration-base)' }}
      >
        <nav aria-label="Main" className="flex flex-col items-start gap-indents-xs">
          {tabList}
        </nav>
        {report}
        <div className="flex items-center gap-indents-m">{linkList}</div>
      </div>
    </div>
  )
}

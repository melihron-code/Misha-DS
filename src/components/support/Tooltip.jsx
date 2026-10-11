import { cloneElement, useId } from 'react'
import { cx } from '../atoms/shared'

// Tooltip (v0.6.0, code only; a helper, not part of the design system since v0.6.12: no /ds-dev/ page, not in Figma).
// Atoms, molecules, organisms and site parts use it for buttons and links with no action yet. A short note under a control, shown while the pointer is
// over it or it has keyboard focus (e.g. "No action for now" on buttons that don't lead anywhere yet).
// Wraps one focusable element and describes it (aria-describedby). accent/primary with text/on-accent in
// text/grotesk, radius/S, padded indents/2XS × indents/XS, indents/XS under the control. `align`: which
// edges line up (start | center | end), so a tooltip at the page edge stays inside the page. Shown and
// hidden at once (no animation: opacity isn't one of the animated properties). `open` forces it (docs).
// `unavailable`: the element has no action (yet). It's marked aria-disabled: it stays focusable (so the tooltip
// shows on keyboard focus) and screen readers announce it as unavailable; the cursor is not-allowed and there's
// no hover overlay (PRESSABLE). Its colors don't change.
const ALIGN = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
}

export default function Tooltip({ text, align = 'center', open = false, unavailable = false, children, className }) {
  const id = useId()
  if (!text) return children
  return (
    <span className={cx('group/tooltip relative inline-flex', className)}>
      {cloneElement(children, { 'aria-describedby': id, ...(unavailable && { 'aria-disabled': true }) })}
      <span
        role="tooltip"
        id={id}
        className={cx(
          'pointer-events-none absolute top-full z-20 mt-indents-xs rounded-radius-s bg-accent-primary px-indents-xs py-indents-2xs text-text-grotesk whitespace-nowrap text-text-on-accent shadow-card',
          ALIGN[align],
          open ? 'block' : 'hidden group-hover/tooltip:block group-has-focus-visible/tooltip:block',
        )}
      >
        {text}
      </span>
    </span>
  )
}

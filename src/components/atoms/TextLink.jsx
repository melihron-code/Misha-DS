import { cx, PRESSABLE, stateAttr } from './shared'

// TextLink (v0.5.0, code first): an inline text link in text/grotesk, text/primary (TopMenu's Profile and
// Log out, Breadcrumbs). States as Button: overlay on hover/pressed, focus ring. The hit area is padded
// (indents/2XS × indents/XS) and the padding is cancelled by negative margins, so the link takes the
// same room as plain text. `current` marks the current page (aria-current, not a link).
export default function TextLink({ href = '#', current = false, state, className, children, ...rest }) {
  const box = 'rounded-radius-s px-indents-2xs py-indents-xs -mx-indents-2xs -my-indents-xs text-text-grotesk text-text-primary whitespace-nowrap'
  if (current) {
    return (
      <span aria-current="page" className={cx(box, className)} {...rest}>
        {children}
      </span>
    )
  }
  return (
    <a href={href} data-state={stateAttr(state)} className={cx('inline-block', box, PRESSABLE, className)} {...rest}>
      {children}
    </a>
  )
}

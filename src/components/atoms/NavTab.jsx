import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: NavTab (in the organisms frame; an atom by size). selected, label.
// A navigation link, 32px high with 10px padding (indents/XS + indents/3XS); the selected one has a
// border/inverse (white) outline and is the current page (aria-current="page"). Unselected tabs keep a
// transparent border, so both are the same size. States as Button (overlay, focus ring).
export default function NavTab({ selected = false, label = 'All teams', href = '#', state, className, style, ...rest }) {
  return (
    <a
      href={href}
      aria-current={selected ? 'page' : undefined}
      data-state={stateAttr(state)}
      className={cx(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-radius-s border text-text-grotesk text-text-primary',
        PRESSABLE,
        selected ? 'border-border-inverse' : 'border-transparent',
        className,
      )}
      style={{ height: SIZE.control, paddingInline: SIZE.gap10, ...style }}
      {...rest}
    >
      {label}
    </a>
  )
}

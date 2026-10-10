import { ICONS } from '../icons'
import { cx } from './shared'

// Figma: Icon. name play | user | more | arrow-down | close (16px frame, icon/primary).
// The icons follow the text color: wrap in a text-* color class to recolor.
export default function Icon({ name = 'play', size = 16, title, className, ...rest }) {
  const Glyph = ICONS[name]
  if (!Glyph) return null
  return (
    <span className={cx('inline-flex shrink-0 text-icon-primary', className)} {...rest}>
      <Glyph size={size} title={title} />
    </span>
  )
}

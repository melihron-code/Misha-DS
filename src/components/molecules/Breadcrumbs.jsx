import { TextLink } from '../atoms'
import { cx } from '../atoms/shared'

// Breadcrumbs (v0.5.0, code first; SubHeader's "Home • Something • Something"). The path to the current
// page: TextLinks separated by "•" (text/grotesk, indents/XS apart); the last item is the current page
// (not a link). In a mobile page (container "page" narrower than tablet) only the current page shows.
export default function Breadcrumbs({ items = [], label = 'Breadcrumb', className, ...rest }) {
  return (
    <nav aria-label={label} className={className} {...rest}>
      <ol className="flex flex-wrap items-center gap-indents-xs text-text-grotesk text-text-primary">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${i}-${item.label}`} className={cx('flex items-center gap-indents-xs', !last && '@max-tablet/page:hidden')}>
              {i > 0 && <span aria-hidden="true" className="@max-tablet/page:hidden">•</span>}
              <TextLink href={item.href} current={last}>
                {item.label}
              </TextLink>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

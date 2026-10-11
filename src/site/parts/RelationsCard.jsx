import { Button } from '../../components/atoms'
import Tooltip from '../../components/support/Tooltip'
import { cx, PRESSABLE } from '../../components/atoms/shared'
import { ProfileCard } from '../../components/molecules'

// RelationsCard (v0.6.7; a site part since v0.6.12, not in the design system; Figma: "relations" on the candidate
// screen). A surface/card panel (radius/L,
// padding indents/X) with groups of people, indents/XXL (out) apart: each a title (heading/h2), the people as short
// ProfileCards in their colors (indents/3XS apart, wrapping), then an optional Button secondary, indents/L between.
// `groups`: [{ title, people: [{ name, role, image, color, href, tooltip }], action: { label, href, onClick, tooltip } }].
// A person with `href` is a link; with `tooltip` (no action yet) a button marked unavailable, showing the Tooltip;
// both with the overlay and focus ring (PRESSABLE). Responsive (container "page"): groups indents/X apart on mobile.
function Person({ href, tooltip, ...card }) {
  const chip = <ProfileCard variant="short" {...card} />
  if (href) {
    return (
      <a href={href} className={cx('flex rounded-radius-s', PRESSABLE)}>
        {chip}
      </a>
    )
  }
  if (tooltip) {
    return (
      <Tooltip text={tooltip} unavailable>
        <button type="button" className={cx('flex rounded-radius-s text-left', PRESSABLE)}>
          {chip}
        </button>
      </Tooltip>
    )
  }
  return chip
}

export default function RelationsCard({ groups = [], label = 'Relations', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('flex w-full flex-col gap-indents-xxl-out rounded-radius-l bg-surface-card p-indents-x text-text-primary @max-tablet/page:gap-indents-x', className)} {...rest}>
      {groups.map(g => (
        <div key={g.title} className="flex flex-col items-start gap-indents-l">
          <h2 className="text-heading-h2">{g.title}</h2>
          <ul className="flex flex-wrap gap-indents-3xs">
            {g.people.map((p, i) => (
              <li key={`${p.name}-${i}`} className="flex">
                <Person {...p} />
              </li>
            ))}
          </ul>
          {g.action && (
            <Tooltip text={g.action.tooltip} unavailable>
              <Button variant="secondary" href={g.action.href} onClick={g.action.onClick}>
                {g.action.label}
              </Button>
            </Tooltip>
          )}
        </div>
      ))}
    </section>
  )
}

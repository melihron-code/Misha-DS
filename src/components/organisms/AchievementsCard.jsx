import { useId } from 'react'
import { Button, Tooltip } from '../atoms'
import { cx } from '../atoms/shared'

// AchievementsCard (v0.6.7, code first; Figma: "achievements" on the candidate screen). A surface/card-yellow panel
// (radius/L, padding indents/X, indents/L inside) in text/on-yellow: a title (heading/h2), the achievements in a row
// spread across the width (title heading/h3, date text/pixel, indents/XS apart; indents/S (inner) above and below)
// and a Button on-yellow. `achievements`: [{ title, date }]; `action`: { label, href, onClick, tooltip } (with
// `tooltip` it has no action yet). Responsive (container "page"): 2 × 2 in a mobile page.
export default function AchievementsCard({ title = 'Achievements', achievements = [], action, className, ...rest }) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className={cx('flex w-full flex-col items-start gap-indents-l rounded-radius-l bg-surface-card-yellow p-indents-x text-text-on-yellow', className)} {...rest}>
      <h2 id={titleId} className="text-heading-h2">
        {title}
      </h2>
      <ul className="flex w-full justify-between gap-indents-m py-indents-s-inner @max-tablet/page:grid @max-tablet/page:grid-cols-2 @max-tablet/page:gap-y-indents-l">
        {achievements.map((a, i) => (
          <li key={`${a.title}-${i}`} className="flex flex-col gap-indents-xs">
            <span className="text-heading-h3">{a.title}</span>
            <span className="text-text-pixel">{a.date}</span>
          </li>
        ))}
      </ul>
      {action && (
        <Tooltip text={action.tooltip} unavailable>
          <Button variant="on-yellow" href={action.href} onClick={action.onClick}>
            {action.label}
          </Button>
        </Tooltip>
      )}
    </section>
  )
}

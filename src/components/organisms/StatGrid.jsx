import { cx } from '../atoms/shared'
import { StatCard } from '../molecules'

// StatGrid (v0.6.10, code first; Figma: the "stats" row on hiring-campaign). StatCards side by side in equal columns,
// indents/2XS apart; they fill the width they're given. `stats`: [{ title, value, label }].
// Responsive (container "page"): 1 column in a mobile page.
export default function StatGrid({ stats = [], label = 'Stats', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('grid w-full auto-cols-fr grid-flow-col gap-indents-2xs @max-tablet/page:grid-flow-row @max-tablet/page:grid-cols-1', className)} {...rest}>
      {stats.map(s => (
        <StatCard key={s.title} {...s} />
      ))}
    </section>
  )
}

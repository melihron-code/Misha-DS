import { cx } from '../atoms/shared'
import { MetricCard } from '../molecules'

// MetricGrid (v0.6.2, code first; Figma: the "metrics" frame on all-teams). MetricCards side by side in equal
// columns, indents/2XS apart; they fill the width they're given. `metrics`: [{ title, values, summary, color }].
// Responsive (container "page"): 4 columns, 2 in a mobile page.
export default function MetricGrid({ metrics = [], label = 'Metrics', className, ...rest }) {
  return (
    <section aria-label={label} className={cx('grid w-full grid-cols-4 gap-indents-2xs @max-tablet/page:grid-cols-2', className)} {...rest}>
      {metrics.map(m => (
        <MetricCard key={m.title} {...m} />
      ))}
    </section>
  )
}

import { MiniChart } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: MetricCard. A metric with a small chart: title, MiniChart (its overlay bars tint the card) and a
// one-line summary. Fills its container. `color` (v0.6.2): the card color, from the surface/card-* tokens; the
// all-teams screen uses red, pink, violet and yellow (Figma: instance fills), the component green.
const COLOR = {
  green: 'bg-surface-card-green',
  red: 'bg-surface-card-red',
  pink: 'bg-surface-card-pink',
  violet: 'bg-surface-card-violet',
  yellow: 'bg-surface-card-yellow',
}

export default function MetricCard({ title = 'Health', values = [100, 58], summary = 'Overall: Good', color = 'green', className, ...rest }) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-l rounded-radius-l p-indents-x text-text-primary', COLOR[color], className)} {...rest}>
      <h3 className="text-heading-h3">{title}</h3>
      <div className="flex flex-col gap-indents-xs">
        <MiniChart values={values} label={title} />
        <p className="text-text-pixel">{summary}</p>
      </div>
    </div>
  )
}

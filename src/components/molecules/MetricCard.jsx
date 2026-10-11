import { MiniChart } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: MetricCard. A metric with a small chart on surface/card-green: title, MiniChart
// (its overlay bars tint the green) and a one-line summary. Fills its container.
export default function MetricCard({ title = 'Health', values = [100, 58], summary = 'Overall: Good', className, ...rest }) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-l rounded-radius-l bg-surface-card-green p-indents-x text-text-primary', className)} {...rest}>
      <h3 className="text-heading-h3">{title}</h3>
      <div className="flex flex-col gap-indents-xs">
        <MiniChart values={values} label={title} />
        <p className="text-text-pixel">{summary}</p>
      </div>
    </div>
  )
}

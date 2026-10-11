import { cx } from '../atoms/shared'

// Figma: StatCard. One big number: title, value (heading/h1) and what it counts. Fills its container.
export default function StatCard({ title = 'Applications', value = '142', label = 'Total received', className, ...rest }) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-xxl-out rounded-radius-l bg-surface-card p-indents-x text-text-primary', className)} {...rest}>
      <h3 className="text-heading-h2">{title}</h3>
      <div className="flex flex-col gap-indents-xs">
        <p className="text-heading-h1">{value}</p>
        <p className="text-text-pixel">{label}</p>
      </div>
    </div>
  )
}

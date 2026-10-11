import { Button, Status } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: CampaignCard. showStatus, showButton. A hiring campaign: title, status and a "More
// info" button (secondary), then its numbers in equal columns. Fills its container; the title
// stays on one line (ellipsis). Each number is a <dt>/<dd> pair, shown value first. The numbers are 5
// columns, 3 in a tablet page and 2 in a mobile page (container "page"); the header wraps.
const STATS = [
  { value: '142', label: 'Applied' },
  { value: '89', label: 'Rejected' },
  { value: '282', label: 'In progress' },
  { value: '31', label: 'Final round' },
  { value: '4', label: 'Offers sent' },
]

export default function CampaignCard({
  title = 'Senior DevOps',
  status = 'on-track',
  statusLabel,
  showStatus = true,
  showButton = true,
  buttonLabel = 'More info',
  onMoreInfo,
  stats = STATS,
  className,
  ...rest
}) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-xxl-out rounded-radius-l bg-surface-card p-indents-x', className)} {...rest}>
      <div className="flex flex-wrap items-center justify-between gap-indents-m">
        <h3 className="min-w-0 truncate text-heading-h2 text-text-primary">{title}</h3>
        {(showStatus || showButton) && (
          <div className="flex shrink-0 items-center justify-end gap-indents-s-inner">
            {showStatus && <Status status={status} label={statusLabel} />}
            {showButton && (
              <Button variant="secondary" onClick={onMoreInfo}>
                {buttonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
      <dl className="grid w-full grid-cols-5 gap-y-indents-l text-text-primary @max-desktop/page:grid-cols-3 @max-tablet/page:grid-cols-2">
        {stats.map(s => (
          <div key={s.label} className="flex min-w-0 flex-col-reverse gap-indents-xs">
            <dt className="text-text-caps">{s.label}</dt>
            <dd className="text-heading-h1">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

import { Button, Status, Tooltip } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: CampaignCard. showStatus, showButton. A hiring campaign: title, status and a "More
// info" button (secondary), then its numbers in equal columns. Fills its container; the title
// stays on one line (ellipsis). Each number is a <dt>/<dd> pair, shown value first. The numbers are 5
// columns, 3 in a tablet page and 2 in a mobile page (container "page"); the header wraps.
// `href` (v0.6.8): the whole card opens the campaign. A link (named by the title) lies over the card: the card is
// its hit area, with overlay/hover and overlay/pressed as its fill and the focus ring around the card; "More info"
// sits above it, a separate button (a button can't be inside a link). `buttonTooltip`: More info has no action yet
// (Tooltip, marked unavailable).
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
  buttonTooltip,
  onMoreInfo,
  href,
  stats = STATS,
  className,
  ...rest
}) {
  return (
    <div className={cx('relative flex w-full flex-col gap-indents-xxl-out rounded-radius-l bg-surface-card p-indents-x', className)} {...rest}>
      {href && (
        <a
          href={href}
          aria-label={title}
          className="focus-ring transition-state absolute inset-0 cursor-pointer rounded-radius-l hover:bg-overlay-hover active:bg-overlay-pressed"
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-indents-m">
        <h3 className="min-w-0 truncate-x text-heading-h2 text-text-primary">{title}</h3>
        {(showStatus || showButton) && (
          <div className="flex shrink-0 items-center justify-end gap-indents-s-inner">
            {showStatus && <Status status={status} label={statusLabel} />}
            {showButton && (
              // Above the card's link.
              <span className="relative z-10 flex">
                <Tooltip text={buttonTooltip} align="end" unavailable>
                  <Button variant="secondary" onClick={onMoreInfo}>
                    {buttonLabel}
                  </Button>
                </Tooltip>
              </span>
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

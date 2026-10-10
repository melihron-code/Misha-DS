import { cx, SIZE } from './shared'

// Figma: Status. status growth | on-track | failing | stopped. A 5px dot and a label,
// both in the status color, 10px apart.
const COLOR = {
  growth: 'text-status-info',
  'on-track': 'text-status-success',
  failing: 'text-status-error',
  stopped: 'text-status-neutral',
}
// Figma texts; "stopped" reads "Failing" in Figma (copy-paste), so it gets its own label here.
const LABEL = { growth: 'Rocket Growth', 'on-track': 'On Track', failing: 'Failing', stopped: 'Stopped' }

export default function Status({ status = 'on-track', label, className, ...rest }) {
  return (
    <span className={cx('inline-flex items-center whitespace-nowrap text-text-pixel', COLOR[status], className)} style={{ gap: SIZE.gap10 }} {...rest}>
      <span aria-hidden="true" className="shrink-0 rounded-radius-over bg-current" style={{ width: SIZE.dot, height: SIZE.dot }} />
      <span className="trim-letter-spacing">{label ?? LABEL[status]}</span>
    </span>
  )
}

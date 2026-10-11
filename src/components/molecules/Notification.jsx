import { Button } from '../atoms'
import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// Figma: Notification. showButton. A highlighted update on status/success-bg, the message in
// text/description (status/success); with showButton, an on-color "More info" Button below.
// Fills its container; the message wraps.
export default function Notification({
  message = 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
  showButton = false,
  buttonLabel = 'More info',
  onAction,
  className,
  ...rest
}) {
  return (
    <div className={cx('flex w-full flex-col items-start gap-indents-s-inner rounded-radius-l bg-status-success-bg p-indents-x', className)} {...rest}>
      <p className="text-text-description text-status-success">{nbsp(message)}</p>
      {showButton && (
        <Button variant="on-color" onClick={onAction}>
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

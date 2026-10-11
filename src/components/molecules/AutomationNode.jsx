import { Icon } from '../atoms'
import { cx } from '../atoms/shared'

// Figma: AutomationNode. A step in an automation flow: play and more icons (decorative for
// now), a title and the event, and the two connection ports. Fills its container.
// Ports: 10px circles (indents/XS + indents/3XS), in icon/secondary (in) and icon/primary (out).
const PORT = 'calc(var(--indents-xs) + var(--indents-3xs))'

function Port({ className }) {
  return <span aria-hidden="true" className={cx('shrink-0 rounded-radius-over', className)} style={{ width: PORT, height: PORT }} />
}

export default function AutomationNode({ title = 'Start Trigger', event = 'New application received', className, ...rest }) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-l rounded-radius-m bg-surface-card-red p-indents-s-inner', className)} {...rest}>
      <div className="flex flex-col gap-indents-s-inner">
        <div className="flex items-start justify-between">
          <Icon name="play" />
          <Icon name="more" />
        </div>
        <div className="flex flex-col gap-indents-xs text-text-primary">
          <p className="text-text-grotesk">{title}</p>
          <p className="text-text-pixel">{event}</p>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <Port className="bg-icon-secondary" />
        <Port className="bg-icon-primary" />
      </div>
    </div>
  )
}

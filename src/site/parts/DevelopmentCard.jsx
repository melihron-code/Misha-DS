import { useId } from 'react'
import { Button, ProgressBar } from '../../components/atoms'
import Tooltip from '../../components/support/Tooltip'
import { cx } from '../../components/atoms/shared'

// DevelopmentCard (v0.6.7; a site part since v0.6.13, not in the design system; Figma: "development" on the candidate
// screen). A surface/card panel (radius/L, padding indents/X, indents/L inside): a title (heading/h2), the stages
// (ProgressBar lg with its stages, accent: teal as in Figma), the next level (a heading/h3 label in text/secondary over the role,
// indents/XS apart), the prediction (a text/caps label over a heading/h3 date), indents/S (inner) between those two,
// and a Button secondary. `stages`, `value` (0–100), `nextLevel`, `prediction`; `action`: { label, href, onClick,
// tooltip } (with `tooltip` it has no action yet). Responsive: the stages become "Stage X of N" in a mobile page.
export default function DevelopmentCard({
  title = 'Personal Development',
  stages = [],
  value = 0,
  nextLevelLabel = 'Next Level',
  nextLevel,
  predictionLabel = 'Prediction:',
  prediction,
  action,
  className,
  ...rest
}) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className={cx('flex w-full flex-col items-start gap-indents-l rounded-radius-l bg-surface-card p-indents-x text-text-primary', className)} {...rest}>
      <h2 id={titleId} className="text-heading-h2">
        {title}
      </h2>
      <ProgressBar stages={stages} value={value} size="lg" tone="accent" label={title} className="w-full" />
      {(nextLevel || prediction) && (
        <div className="flex flex-col gap-indents-s-inner">
          {nextLevel && (
            <div className="flex flex-col gap-indents-xs">
              <p className="text-heading-h3 text-text-secondary">{nextLevelLabel}</p>
              <p className="text-heading-h3">{nextLevel}</p>
            </div>
          )}
          {prediction && (
            <div className="flex flex-col gap-indents-xs">
              <p className="text-text-caps">{predictionLabel}</p>
              <p className="text-heading-h3">{prediction}</p>
            </div>
          )}
        </div>
      )}
      {action && (
        <Tooltip text={action.tooltip} unavailable>
          <Button variant="secondary" href={action.href} onClick={action.onClick}>
            {action.label}
          </Button>
        </Tooltip>
      )}
    </section>
  )
}

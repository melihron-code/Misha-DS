import { Button } from '../atoms'
import { cx } from '../atoms/shared'
import { Breadcrumbs } from '../molecules'

// Figma: SubHeader. variant default | builder. The row under TopMenu, padded indents/M × indents/S (inner).
// default: "Back" (Button on-color-outlined) and the Breadcrumbs, indents/XXL apart (Figma: a raw 60px).
// builder: "Back" (secondary) on the left; "Save" (secondary) and "Deploy" (primary-sm) on the right.
// Back is a link with `backHref`, otherwise a button calling `onBack`. In a mobile page the breadcrumbs
// show only the current page and the gap shrinks to indents/M.
const BACK_VARIANT = { default: 'on-color-outlined', builder: 'secondary' }

export default function SubHeader({
  variant = 'default',
  backLabel = 'Back',
  backHref,
  onBack,
  breadcrumbs = [],
  saveLabel = 'Save',
  deployLabel = 'Deploy',
  onSave,
  onDeploy,
  className,
  ...rest
}) {
  const builder = variant === 'builder'
  return (
    <div
      className={cx(
        'flex items-center px-indents-m py-indents-s-inner',
        builder ? 'justify-between gap-indents-m' : 'gap-indents-xxl @max-tablet/page:gap-indents-m',
        className,
      )}
      {...rest}
    >
      <Button variant={BACK_VARIANT[variant]} href={backHref} onClick={onBack}>
        {backLabel}
      </Button>
      {builder ? (
        <div className="flex items-center gap-indents-xs">
          <Button variant="secondary" onClick={onSave}>
            {saveLabel}
          </Button>
          <Button variant="primary-sm" onClick={onDeploy}>
            {deployLabel}
          </Button>
        </div>
      ) : (
        breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="min-w-0" />
      )}
    </div>
  )
}

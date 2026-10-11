import { Button, ErrorMessage, Flag } from '../../components/atoms'
import { cx, SIZE } from '../../components/atoms/shared'

// Figma: TaskItem (a site part since v0.6.12, taken out of the design system; for the New campaign page). state default | active, showButton, showError. A task in a checklist, with a
// divider/default line under it. state default = done (Flag filled, title in text/secondary);
// active = to do (Flag outline, title in text/primary). The Flag switches between them: it calls
// onToggle with the new state. Under the title: an ErrorMessage (it fits its text; Figma stretches it to
// the title width) and a Button (secondary).
// Content gap 10px (indents/XS + indents/3XS). Fills its container; the title wraps.
export default function TaskItem({
  state = 'default',
  showButton = true,
  showError = true,
  title = 'Define role requirements and job description',
  errorMessage = 'Some fields need your attention',
  buttonLabel = 'Job description',
  buttonHref,
  onButtonClick,
  onToggle,
  className,
  ...rest
}) {
  const done = state === 'default'
  return (
    <div className={cx('flex w-full items-start gap-indents-s-inner border-b border-divider-default py-indents-s-inner', className)} {...rest}>
      <Flag checked={done} label={done ? `Mark as to do: ${title}` : `Mark as done: ${title}`} onClick={() => onToggle?.(done ? 'active' : 'default')} />
      <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: SIZE.gap10 }}>
        <p className={cx('text-heading-h3', done ? 'text-text-secondary' : 'text-text-primary')}>{title}</p>
        {showError && <ErrorMessage message={errorMessage} />}
        {showButton && (
          <Button variant="secondary" href={buttonHref} onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

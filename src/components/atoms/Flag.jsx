import { BookmarkFilledIcon, BookmarkIcon } from '../icons'
import { cx, PRESSABLE, stateAttr } from './shared'

// Figma: Flag. checked false (outline bookmark, icon/primary) | true (filled, icon/secondary).
// A toggle button; the bookmark glyph is 22px tall as in Figma, with indents/3XS padding.
export default function Flag({ checked = false, label = 'Flag', disabled = false, state, onClick, className, ...rest }) {
  const isDisabled = disabled || state === 'disabled'
  const Icon = checked ? BookmarkFilledIcon : BookmarkIcon
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      disabled={isDisabled}
      data-state={stateAttr(state)}
      onClick={onClick}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-radius-s p-indents-3xs',
        PRESSABLE,
        isDisabled ? 'text-text-disabled' : checked ? 'text-icon-secondary' : 'text-icon-primary',
        className,
      )}
      {...rest}
    >
      <Icon size={22} />
    </button>
  )
}

import { useId } from 'react'
import { cx, stateAttr } from './shared'

// Figma: TextArea. label, value, showLabel. A real <textarea> with a <label>.
// Figma shows the value in text/tertiary (placeholder look): that's the placeholder here,
// typed text is text/primary. 4 rows ≈ Figma's 51px field.
export default function TextArea({
  label = 'head line',
  showLabel = true,
  value,
  defaultValue,
  placeholder = 'type something here',
  rows = 4,
  onChange,
  disabled = false,
  state,
  id,
  className,
  ...rest
}) {
  const autoId = useId()
  const inputId = id ?? autoId
  const isDisabled = disabled || state === 'disabled'
  return (
    <div className={cx('inline-flex flex-col gap-indents-xs', className)}>
      <label htmlFor={inputId} className={showLabel ? 'text-text-caps text-text-primary' : 'sr-only'}>
        {label}
      </label>
      <textarea
        id={inputId}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        disabled={isDisabled}
        data-state={stateAttr(state)}
        className={cx(
          'focus-ring transition-state w-full resize-none rounded-radius-s bg-surface-control px-indents-s-inner py-indents-xs text-text-pixel text-text-primary placeholder:text-text-tertiary disabled:cursor-not-allowed',
          isDisabled && 'bg-bg-disabled-bg text-text-disabled',
        )}
        {...rest}
      />
    </div>
  )
}

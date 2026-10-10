import { useId } from 'react'
import { cx, SIZE, stateAttr } from './shared'

// Figma: TextInput. label, value, showLabel. A real <input> with a <label>;
// with showLabel=false the label stays for screen readers (visually hidden).
export default function TextInput({
  label = 'head line',
  showLabel = true,
  value,
  defaultValue,
  placeholder,
  onChange,
  disabled = false,
  state,
  id,
  className,
  inputClassName,
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
      <input
        id={inputId}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
        data-state={stateAttr(state)}
        className={cx(
          'focus-ring transition-state w-full rounded-radius-s bg-surface-control px-indents-s-inner text-text-pixel text-text-primary placeholder:text-text-tertiary disabled:cursor-not-allowed',
          isDisabled && 'bg-bg-disabled-bg text-text-disabled',
          inputClassName,
        )}
        style={{ height: SIZE.control }}
        {...rest}
      />
    </div>
  )
}

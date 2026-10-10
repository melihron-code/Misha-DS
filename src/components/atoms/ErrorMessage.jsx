import { cx } from './shared'

// Figma: ErrorMessage. message (+ the fixed "error!" prefix). Announced to screen readers.
export default function ErrorMessage({ message = 'Something went wrong', prefix = 'error!', className, ...rest }) {
  return (
    <p
      role="alert"
      className={cx('flex w-fit max-w-full items-start gap-indents-s-inner rounded-radius-s bg-status-error-bg p-indents-xs text-text-caps text-status-error', className)}
      {...rest}
    >
      <span className="trim-letter-spacing shrink-0">{prefix}</span>
      <span className="trim-letter-spacing">{message}</span>
    </p>
  )
}

import { cx, SIZE } from './shared'

// Figma: MiniChart. Bars side by side (indents/3XS gap), bottom-aligned, filled with
// overlay/pressed (25% black, multiplied), so they tint whatever card they sit on.
// `values` are 0–100 (% of the 82px chart height). Figma: 100 and 58.
export default function MiniChart({ values = [100, 58], label = 'Chart', className, ...rest }) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${values.join(', ')}`}
      className={cx('flex w-full items-end gap-indents-3xs', className)}
      style={{ height: SIZE.chart }}
      {...rest}
    >
      {values.map((v, i) => (
        <span key={i} className="flex-1 rounded-radius-s bg-overlay-pressed mix-blend-multiply" style={{ height: `${Math.min(100, Math.max(0, v))}%` }} />
      ))}
    </div>
  )
}

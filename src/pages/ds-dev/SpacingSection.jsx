import { spacingTokens } from '../../ds/foundations'
import CopyButton from './CopyButton'

export default function SpacingSection() {
  return (
    <ul className="flex max-w-size-base-with flex-col">
      {spacingTokens.map(s => (
        <li key={s.cssVar} className="grid grid-cols-3 items-center gap-indents-m border-t border-divider-default py-indents-s-inner">
          <div className="flex flex-col gap-indents-xxxs">
            <CopyButton value={s.example} className="text-text-grotesk-bold">{s.figma}</CopyButton>
            <div className="flex flex-wrap gap-indents-xxs">
              <CopyButton value={s.example} className="text-text-pixel text-text-secondary">{s.example}</CopyButton>
              <CopyButton value={`var(${s.cssVar})`} className="text-text-pixel text-text-secondary">{s.cssVar}</CopyButton>
            </div>
            <span className="px-indents-xxs text-text-pixel text-text-tertiary">→ {s.alias}</span>
          </div>
          <span className="text-heading-h3">{s.px}px</span>
          <div className="flex items-center">
            <div
              className={`h-indents-s-inner ${s.px < 0 ? 'bg-status-error' : 'bg-accent-highlight'}`}
              style={{ width: s.px < 0 ? `calc(var(${s.cssVar}) * -1)` : `var(${s.cssVar})` }}
            />
            {s.px < 0 && <span className="pl-indents-xs text-text-pixel text-text-secondary">negative: overlap</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}

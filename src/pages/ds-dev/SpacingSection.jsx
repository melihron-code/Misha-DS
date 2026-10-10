import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

export default function SpacingSection() {
  return (
    <div className="flex flex-col gap-indents-l">
      <ul className="flex flex-col">
        {spacingTokens.map(s => (
          <li key={s.cssVar} className="grid grid-cols-3 items-center gap-indents-m border-t border-divider-default py-indents-s-inner">
            <div className="flex flex-col gap-indents-xxxs">
              <CopyButton value={`var(${s.cssVar})`} className="self-start text-text-grotesk-bold">{s.figma}</CopyButton>
              {/* Fixed first column (indents/XXL- + indents/L = 108px, just past the longest
                  variable), so every "→ primitive" starts at the same x in all rows. */}
              <div className="grid items-baseline" style={{ gridTemplateColumns: 'calc(var(--indents-xxl-minus) + var(--indents-l)) 1fr' }}>
                <CodeNames cssVar={s.cssVar} />
                <span className="px-indents-xxs text-text-grotesk text-text-secondary">→ {s.alias}</span>
              </div>
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
    </div>
  )
}

import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

// Four columns: name | variable + primitive | bar | px. The name column is a
// quarter minus indents/XXL- (84px), so everything after it sits 84px further left.
const QUARTER = '((100% - 3 * var(--indents-m)) / 4)'
const COLUMNS = `calc(${QUARTER} - var(--indents-xxl-minus)) calc(${QUARTER}) calc(${QUARTER}) 1fr`

export default function SpacingSection() {
  return (
    <div className="flex flex-col gap-indents-l">
      <ul className="flex flex-col">
        {spacingTokens.map(s => (
          <li key={s.cssVar} className="grid items-center gap-indents-m border-t border-divider-default py-indents-s-inner" style={{ gridTemplateColumns: COLUMNS }}>
            <CopyButton value={`var(${s.cssVar})`} className="self-center justify-self-start text-text-grotesk-bold">{s.figma}</CopyButton>
            <div className="flex flex-col gap-indents-xxxs">
              <CodeNames cssVar={s.cssVar} />
              <span className="px-indents-xxs text-text-grotesk text-text-secondary">→ {s.alias}</span>
            </div>
            <div className="flex items-center">
              <div
                className={`h-indents-s-inner ${s.px < 0 ? 'bg-status-error' : 'bg-accent-highlight'}`}
                style={{ width: s.px < 0 ? `calc(var(${s.cssVar}) * -1)` : `var(${s.cssVar})` }}
              />
              {s.px < 0 && <span className="pl-indents-xs text-text-pixel text-text-secondary">negative: overlap</span>}
            </div>
            <span className="text-heading-h3">{s.px}px</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

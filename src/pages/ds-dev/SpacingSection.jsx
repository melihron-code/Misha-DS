import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import TokenRowHeader from './TokenRowHeader'
import { TOKEN_ROW_CLASS, TOKEN_ROW_COLUMNS } from './tokenRow'

export default function SpacingSection() {
  return (
    <div>
      <TokenRowHeader />
      <ul className="flex flex-col">
        {spacingTokens.map(s => (
          <li key={s.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}>
            <div
              className={`h-indents-s-inner ${s.px < 0 ? 'bg-status-error' : 'bg-accent-highlight'}`}
              style={{ width: s.px < 0 ? `calc(var(${s.cssVar}) * -1)` : `var(${s.cssVar})` }}
            />
            <div className="flex flex-col gap-indents-xxs">
              <span className="text-heading-h3">{s.px}px</span>
              {s.px < 0 && <span className="whitespace-nowrap text-text-pixel text-text-secondary">negative: overlap</span>}
            </div>
            <span className="whitespace-nowrap px-indents-xxs text-heading-h4">{s.figma}</span>
            {/* Wrapper so the copy button is centered in the row like the other cells. */}
            <div>
              <CodeNames cssVar={s.cssVar} />
            </div>
            <span className="whitespace-nowrap px-indents-xxs text-text-grotesk text-text-secondary">→ {s.alias}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

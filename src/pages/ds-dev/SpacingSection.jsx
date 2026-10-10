import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import { TOKEN_ROW_CLASS, TOKEN_ROW_COLUMNS } from './tokenRow'

export default function SpacingSection() {
  return (
    <ul className="flex flex-col">
      {spacingTokens.map(s => (
        <li key={s.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}>
          <span className="px-indents-xxs text-text-grotesk-bold">{s.figma}</span>
          {/* Wrapper so the copy button is centered in the row like the other cells. */}
          <div>
            <CodeNames cssVar={s.cssVar} />
          </div>
          <span className="whitespace-nowrap px-indents-xxs text-text-grotesk text-text-secondary">→ {s.alias}</span>
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
  )
}

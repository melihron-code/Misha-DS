import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import { TOKEN_ROW_CLASS, TOKEN_ROW_COLUMNS } from './tokenRow'

export default function RadiusSection() {
  return (
    <ul className="flex flex-col">
      {radiusTokens.map(r => (
        <li key={r.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}>
          <span className="px-indents-xxs text-text-grotesk-bold">{r.figma}</span>
          {/* Wrapper so the copy button is centered in the row like the other cells. */}
          <div>
            <CodeNames cssVar={r.cssVar} />
          </div>
          <span className="whitespace-nowrap px-indents-xxs text-text-grotesk text-text-secondary">→ {r.alias}</span>
          {/* Example: an indents/X square (30 × 30px) with the radius applied. */}
          <div className={`size-indents-x border border-border-strong bg-surface-card ${r.tw}`} />
          <span className="text-heading-h3">{r.px}px</span>
        </li>
      ))}
    </ul>
  )
}

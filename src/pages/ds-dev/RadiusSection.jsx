import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import TokenRowHeader from './TokenRowHeader'
import { TOKEN_ROW_CLASS, TOKEN_ROW_COLUMNS } from './tokenRow'

export default function RadiusSection() {
  return (
    <div>
      <TokenRowHeader />
      <ul className="flex flex-col">
        {radiusTokens.map(r => (
          <li key={r.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: TOKEN_ROW_COLUMNS }}>
            {/* Example: an indents/XXL (out) square (90 × 90px) with the radius applied. */}
            <div className={`size-indents-xxl-out bg-accent-highlight ${r.tw}`} />
            <span className="text-heading-h3">{r.px}px</span>
            <span className="whitespace-nowrap px-indents-xxs text-heading-h4">{r.figma}</span>
            {/* Wrapper so the copy button is centered in the row like the other cells. */}
            <div>
              <CodeNames cssVar={r.cssVar} />
            </div>
            <span className="whitespace-nowrap px-indents-xxs text-text-grotesk text-text-secondary">→ {r.alias}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

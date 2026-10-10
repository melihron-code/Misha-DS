import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import TokenRowHeader from './TokenRowHeader'
import { columnsOf, TEXT_LABEL, TOKEN_ROW_CLASS } from './tokenRow'

const COLUMNS = columnsOf(['preview', 'name', 'cssVar', 'primitive'])
const LABELS = [
  { text: 'Preview/value', className: 'text-center' },
  { text: 'Token', className: TEXT_LABEL },
  { text: 'CSS variable', className: TEXT_LABEL },
  { text: 'Primitive', className: TEXT_LABEL },
]

export default function RadiusSection() {
  return (
    <div>
      <TokenRowHeader columns={COLUMNS} labels={LABELS} />
      <ul className="flex flex-col">
        {radiusTokens.map(r => (
          <li key={r.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: COLUMNS }}>
            {/* An indents/XXL (out) square (90 × 90px) with the radius applied, value inside. */}
            <div className={`flex size-indents-xxl-out items-center justify-center bg-accent-highlight text-heading-h4 ${r.tw}`}>
              {r.px}px
            </div>
            <span className="whitespace-nowrap px-indents-2xs text-heading-h4">{r.figma}</span>
            {/* Wrapper so the copy button is centered in the row like the other cells. */}
            <div>
              <CodeNames cssVar={r.cssVar} />
            </div>
            <span className="whitespace-nowrap px-indents-2xs text-text-grotesk text-text-secondary">→ {r.alias}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

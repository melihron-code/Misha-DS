import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import TokenRowHeader from './TokenRowHeader'
import { columnsOf, TEXT_LABEL, TOKEN_ROW_CLASS } from './tokenRow'

const COLUMNS = columnsOf(['preview', 'value', 'name', 'cssVar', 'primitive'])
const LABELS = [
  { text: 'Preview', className: '' },
  { text: 'Value', className: '' },
  { text: 'Token', className: TEXT_LABEL },
  { text: 'CSS variable', className: TEXT_LABEL },
  { text: 'Primitive', className: TEXT_LABEL },
]

export default function SpacingSection() {
  return (
    <div>
      <TokenRowHeader columns={COLUMNS} labels={LABELS} />
      <ul className="flex flex-col">
        {spacingTokens.map(s => (
          <li key={s.cssVar} className={TOKEN_ROW_CLASS} style={{ gridTemplateColumns: COLUMNS }}>
            {/* Bar: as wide as the spacing, indents/S (inner) + indents/XS (22px) tall. */}
            <div
              className={s.px < 0 ? 'bg-status-error' : 'bg-accent-highlight'}
              style={{
                width: s.px < 0 ? `calc(var(${s.cssVar}) * -1)` : `var(${s.cssVar})`,
                height: 'calc(var(--indents-s-inner) + var(--indents-xs))',
              }}
            />
            <div className="flex flex-col gap-indents-xxs">
              <span className="text-heading-h4">{s.px}px</span>
              {s.px < 0 && <span className="whitespace-nowrap text-text-grotesk text-text-secondary">negative: overlap</span>}
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

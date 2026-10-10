import { spacingTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

// Five columns: name | CSS variable | primitive | bar | px.
// name: a quarter minus indents/XXL- (84px) · variable: indents/XXL (out) + indents/L (114px,
// fits the longest variable) · primitive: indents/XXL (out) (90px) · bar: a quarter · px: the rest.
const QUARTER = '((100% - 3 * var(--indents-m)) / 4)'
const COLUMNS = [
  `calc(${QUARTER} - var(--indents-xxl-minus))`,
  'calc(var(--indents-xxl-out) + var(--indents-l))',
  'var(--indents-xxl-out)',
  `calc(${QUARTER})`,
  '1fr',
].join(' ')

export default function SpacingSection() {
  return (
    <div className="flex flex-col gap-indents-l">
      <ul className="flex flex-col">
        {spacingTokens.map(s => (
          <li key={s.cssVar} className="grid items-center gap-indents-m border-t border-divider-default py-indents-s-inner" style={{ gridTemplateColumns: COLUMNS }}>
            <CopyButton value={`var(${s.cssVar})`} className="self-center justify-self-start text-text-grotesk-bold">{s.figma}</CopyButton>
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
    </div>
  )
}

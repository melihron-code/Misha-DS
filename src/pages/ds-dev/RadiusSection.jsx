import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'

export default function RadiusSection() {
  return (
    <ul className="flex flex-wrap gap-indents-x">
      {radiusTokens.map(r => (
        <li key={r.cssVar} className="flex flex-col gap-indents-xxs">
          <div className={`flex size-indents-xxl-out items-center justify-center border border-border-strong bg-surface-card text-heading-h3 ${r.tw}`}>
            {r.px}px
          </div>
          <span className="px-indents-xxs text-text-grotesk-bold">{r.figma}</span>
          <CodeNames cssVar={r.cssVar} />
          <span className="px-indents-xxs text-text-grotesk text-text-secondary">→ {r.alias}</span>
        </li>
      ))}
    </ul>
  )
}

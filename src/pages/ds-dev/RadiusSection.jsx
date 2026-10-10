import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

export default function RadiusSection() {
  return (
    <ul className="flex flex-wrap gap-indents-x">
      {radiusTokens.map(r => (
        <li key={r.cssVar} className="flex flex-col gap-indents-xxs">
          <div className={`flex size-indents-xxl-out items-center justify-center border border-border-strong bg-surface-card text-heading-h3 ${r.tw}`}>
            {r.px}px
          </div>
          <CopyButton value={`var(${r.cssVar})`} className="self-start text-text-grotesk-bold">{r.figma}</CopyButton>
          <CodeNames cssVar={r.cssVar} />
          <span className="px-indents-xxs text-text-grotesk text-text-secondary">→ {r.alias}</span>
        </li>
      ))}
    </ul>
  )
}

import { radiusTokens } from '../../ds/foundations'
import CodeNames from './CodeNames'
import CopyButton from './CopyButton'

export default function RadiusSection() {
  return (
    <ul className="flex flex-wrap gap-indents-x">
      {radiusTokens.map(r => (
        <li key={r.cssVar} className="flex flex-col gap-indents-xxs">
          <div className={`size-indents-xxl-out border border-border-strong bg-surface-card ${r.tw}`} />
          <CopyButton value={`var(${r.cssVar})`} className="self-start text-text-grotesk-bold">{r.figma}</CopyButton>
          <CodeNames cssVar={r.cssVar} />
          <span className="px-indents-xxs text-text-grotesk">{r.px}px <span className="text-text-tertiary">→ {r.alias}</span></span>
        </li>
      ))}
    </ul>
  )
}

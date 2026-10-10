import { radiusTokens } from '../../ds/foundations'
import CopyButton from './CopyButton'

export default function RadiusSection() {
  return (
    <ul className="flex flex-wrap gap-indents-x">
      {radiusTokens.map(r => (
        <li key={r.cssVar} className="flex flex-col gap-indents-xxs">
          <div className={`size-indents-xxl-out border border-border-strong bg-surface-card ${r.tw}`} />
          <CopyButton value={r.tw} className="text-text-grotesk-bold">{r.figma}</CopyButton>
          <CopyButton value={r.tw} className="text-text-grotesk text-text-secondary">{r.tw}</CopyButton>
          <CopyButton value={`var(${r.cssVar})`} className="text-text-grotesk text-text-secondary">{r.cssVar}</CopyButton>
          <span className="px-indents-xxs text-text-grotesk">{r.px}px <span className="text-text-tertiary">→ {r.alias}</span></span>
        </li>
      ))}
    </ul>
  )
}

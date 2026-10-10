import { shadows } from '../../ds/foundations'
import { nbsp } from '../../lib/nbsp'
import CopyButton from './CopyButton'

export default function EffectsSection() {
  return (
    <div className="flex flex-col gap-indents-l">
      <p className="max-w-size-base-with text-text-grotesk text-text-secondary">
        {nbsp('Figma has no effect styles yet. This shadow is the one used in the designs (checklist panel), with its color from surface/shadow. Background blurs with radius 0 and the glass blur of library components are not included.')}
      </p>
      <ul className="flex flex-wrap gap-indents-xxl-minus py-indents-x">
        {shadows.map(s => (
          <li key={s.cssVar} className={`flex w-size-base-with max-w-full flex-col gap-indents-xs rounded-rounds-l bg-surface-card p-indents-l ${s.tw}`}>
            <CopyButton value={s.tw} className="self-start text-heading-h3">{s.name}</CopyButton>
            <div className="flex flex-wrap gap-indents-xxs">
              <CopyButton value={s.tw} className="text-text-grotesk text-text-secondary">{s.tw}</CopyButton>
              <CopyButton value={`var(${s.cssVar})`} className="text-text-grotesk text-text-secondary">{s.cssVar}</CopyButton>
            </div>
            <dl className="flex flex-wrap gap-indents-m px-indents-xxs">
              {[['X', `${s.x}px`], ['Y', `${s.y}px`], ['Blur', `${s.blur}px`], ['Spread', `${s.spread}px`], ['Color', `${s.color} (black 25%)`]].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-indents-xxxs">
                  <dt className="text-text-caps text-text-secondary">{k}</dt>
                  <dd className="text-text-grotesk">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

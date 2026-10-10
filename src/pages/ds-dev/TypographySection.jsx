import { useEffect, useRef, useState } from 'react'
import { textStyles } from '../../ds/foundations'
import { nbsp } from '../../lib/nbsp'
import CopyButton from './CopyButton'

const SAMPLE = nbsp('Hire the right people')

// Measures what the browser actually renders, to compare with Figma.
function useRendered(ref, { weight, size, family }) {
  const [m, setM] = useState(null)
  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => {
      const el = ref.current
      if (!alive || !el) return
      const cs = getComputedStyle(el)
      setM({
        size: parseFloat(cs.fontSize),
        lineHeight: parseFloat(cs.lineHeight),
        weight: Number(cs.fontWeight),
        letterSpacing: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing),
        fontLoaded: document.fonts.check(`${weight} ${size}px "${family}"`),
      })
    })
    return () => { alive = false }
  }, [ref, weight, size, family])
  return m
}

function Spec({ label, figma, rendered }) {
  const ok = rendered === undefined || rendered === figma
  return (
    <div className="flex flex-col gap-indents-xxxs">
      <dt className="text-text-caps text-text-secondary">{label}</dt>
      <dd className="text-text-grotesk">
        {figma}
        {!ok && <span className="text-status-error"> (renders {rendered})</span>}
      </dd>
    </div>
  )
}

function StyleRow({ s }) {
  const ref = useRef(null)
  const m = useRendered(ref, s)
  const lsPx = +(s.size * s.letterSpacing / 100).toFixed(2)
  return (
    <li data-measured={m ? (m.fontLoaded ? 'ok' : 'fallback') : undefined} className="flex flex-col gap-indents-s-inner border-t border-divider-default py-indents-l">
      <div className="flex flex-wrap items-baseline gap-indents-xs">
        <CopyButton value={s.tw} className="text-heading-h4 text-status-info">{s.figma}</CopyButton>
        <CopyButton value={s.tw} className="text-text-grotesk text-text-secondary">{s.tw}</CopyButton>
      </div>
      <p ref={ref} className={`${s.tw} break-words`}>{SAMPLE}</p>
      {/* Same 6 columns in every style, so each property lines up vertically. */}
      <dl className="grid grid-cols-6 gap-indents-m rounded-rounds-m bg-bg-subtle p-indents-s-inner">
        <Spec label="Font" figma={s.family} rendered={m && !m.fontLoaded ? 'fallback font' : undefined} />
        <Spec label="Size" figma={`${s.size}px`} rendered={m ? `${m.size}px` : undefined} />
        <Spec label="Weight" figma={`${s.weightName} ${s.weight}`} rendered={m ? `${s.weightName} ${m.weight}` : undefined} />
        <Spec label="Line height" figma={`${s.lineHeight}px`} rendered={m ? `${m.lineHeight}px` : undefined} />
        <Spec label="Letter spacing" figma={`${s.letterSpacing}% (${lsPx}px)`} rendered={m ? `${s.letterSpacing}% (${+m.letterSpacing.toFixed(2)}px)` : undefined} />
        <Spec label="Case" figma={s.textCase === 'uppercase' ? 'UPPER' : 'As typed'} />
      </dl>
    </li>
  )
}

export default function TypographySection() {
  return (
    <ul className="flex max-w-size-base-with flex-col">
      {textStyles.map(s => <StyleRow key={s.figma} s={s} />)}
    </ul>
  )
}

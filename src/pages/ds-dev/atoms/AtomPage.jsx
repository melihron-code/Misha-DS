import { useState } from 'react'
import { Button, Dropdown, TextInput, ToggleButton } from '../../../components/atoms'
import { nbsp } from '../../../lib/nbsp'
import { toJsx } from './jsx'

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-indents-s-inner">
      <h2 className="text-heading-h3 text-status-info">{title}</h2>
      {children}
    </section>
  )
}

// 1. Every variant × state, labelled: state names head the columns, each
// variant's name sits on its own line above its row (so five states fit the width).
function Grid({ doc }) {
  const { Component, rows, columns, wide, narrow } = doc
  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.label} scope="col" className="pb-indents-xs text-left text-text-caps text-text-secondary">{c.label}</th>
          ))}
        </tr>
      </thead>
      {rows.map(r => (
        <tbody key={r.label}>
          <tr>
            <th scope="colgroup" colSpan={columns.length} className="border-t border-divider-default pt-indents-s-inner pb-indents-xs text-left text-heading-h4 text-text-primary">
              {r.label}
            </th>
          </tr>
          <tr>
            {columns.map(c => (
              <td key={c.label} className="pr-indents-xs pb-indents-m align-middle">
                <div className={wide ? 'w-full' : narrow ? 'w-1/2' : ''}>
                  <Component {...r.props} {...c.props} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      ))}
    </table>
  )
}

// 2. Controls for the playground, built from the atoms themselves.
function Control({ control, value, onChange }) {
  const label = control.label ?? control.prop
  if (control.type === 'select') {
    return <Dropdown label={label} options={control.options} value={value} onChange={onChange} />
  }
  if (control.type === 'boolean') {
    return (
      <div className="inline-flex flex-col gap-indents-xs">
        <span className="text-text-caps text-text-primary">{label}</span>
        <ToggleButton size="sm" selected={!!value} label={value ? 'true' : 'false'} onClick={() => onChange(!value)} aria-label={label} />
      </div>
    )
  }
  if (control.type === 'number') {
    return <TextInput label={label} type="number" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} />
  }
  return <TextInput label={label} value={value ?? ''} onChange={e => onChange(e.target.value)} />
}

function CopyCode({ code }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div className="flex items-start justify-between gap-indents-m rounded-radius-m bg-surface-card p-indents-s-inner">
      <pre className="min-w-0 overflow-x-auto text-text-grotesk whitespace-pre-wrap text-text-primary"><code>{code}</code></pre>
      <Button variant="secondary" onClick={copy}>{copied ? 'copied' : 'copy'}</Button>
    </div>
  )
}

function Playground({ doc }) {
  const [props, setProps] = useState(doc.initial)
  const live = doc.toProps ? doc.toProps(props) : props
  const bound = doc.bind ? doc.bind(props, setProps) : {}
  const { Component } = doc
  return (
    <div className="flex flex-col gap-indents-m">
      <div className="flex min-h-indents-xxl-out items-center justify-center rounded-radius-m border border-border-default p-indents-x">
        <div className={doc.wide ? 'w-full' : doc.narrow ? 'w-1/3' : ''}>
          <Component {...live} {...bound} />
        </div>
      </div>
      {doc.controls.length > 0 && (
        <div className="flex flex-wrap items-end gap-indents-m">
          {doc.controls.map(c => (
            <Control key={c.prop} control={c} value={props[c.prop]} onChange={v => setProps(p => ({ ...p, [c.prop]: v }))} />
          ))}
        </div>
      )}
      <CopyCode code={toJsx(doc.name, live, doc.defaults)} />
    </div>
  )
}

export default function AtomPage({ doc }) {
  return (
    <div className="flex flex-col gap-indents-xxl">
      <p className="text-text-grotesk text-text-secondary">{nbsp(doc.about)}</p>
      <Section title="Variants and states">
        <Grid doc={doc} />
      </Section>
      <Section title="Playground">
        {/* key: a fresh playground for each atom */}
        <Playground key={doc.slug} doc={doc} />
      </Section>
    </div>
  )
}

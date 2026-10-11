import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, TextInput } from '../../../components/atoms'
import { SIZE } from '../../../components/atoms/shared'
import { nbsp } from '../../../lib/nbsp'
import Switch from '../Switch'

// `aside` sits on the title's line, flush right (the playground's controls). The title
// shares the last text baseline of the aside, i.e. the values inside the controls.
function Section({ title, level = 2, aside, className = '', children }) {
  const H = `h${level}`
  return (
    <section className={`flex flex-col gap-indents-s-inner ${className}`}>
      <div className="flex items-baseline-last justify-between gap-indents-m">
        <H className="shrink-0 text-heading-h3 text-status-info">{title}</H>
        {aside}
      </div>
      {children}
    </section>
  )
}

// 1. Every variant × state, labelled: state names head the columns, each
// variant's name sits on its own line above its row (so five states fit the width).
function Grid({ doc }) {
  const { Component, rows, columns } = doc
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
                <div className={doc.width ?? (doc.wide ? 'w-full' : doc.narrow ? 'w-1/2' : '')}>
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

// Renders `ghosts` invisibly (and inert) in the same grid cell as the children, so the
// cell is as big as the biggest of them and keeps its size when the children change.
function SizedBy({ ghosts, className = '', children }) {
  return (
    <div className={`grid ${className}`}>
      {ghosts.map((g, i) => (
        <div key={i} inert aria-hidden="true" className="invisible col-start-1 row-start-1">
          {g}
        </div>
      ))}
      <div className="col-start-1 row-start-1">{children}</div>
    </div>
  )
}

// 2. Controls for the playground: the atoms themselves (Dropdown, TextInput) and a Switch for booleans.
// Every control keeps a fixed width: text fields and switches don't change size, and a
// Dropdown is as wide as it is with its longest option.
function Control({ control, value, onChange, disabled }) {
  const label = control.label ?? control.prop
  if (control.type === 'select') {
    return (
      <SizedBy ghosts={control.options.map(o => <Dropdown key={o} label={label} options={control.options} value={o} />)}>
        <Dropdown label={label} options={control.options} value={value} onChange={onChange} disabled={disabled} className="w-full" />
      </SizedBy>
    )
  }
  if (control.type === 'boolean') {
    return <Switch label={label} checked={!!value} onChange={onChange} disabled={disabled} />
  }
  if (control.type === 'number') {
    return <TextInput label={label} type="number" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} disabled={disabled} />
  }
  const field = <TextInput label={label} value={value ?? ''} onChange={e => onChange(e.target.value)} disabled={disabled} className={control.double ? 'w-full' : ''} />
  if (!control.double) return field
  // Twice as wide: sized by two default text fields side by side.
  return (
    <SizedBy
      ghosts={[
        <div key="double" className="flex">
          <TextInput label={label} />
          <TextInput label={label} />
        </div>,
      ]}
    >
      {field}
    </SizedBy>
  )
}

// The live component, with its controls on the title's line. A control with `enabled`
// is disabled while enabled(props) is false (e.g. Button's sublabel outside node).
function Playground({ doc, level }) {
  const [props, setProps] = useState(doc.initial)
  const live = doc.toProps ? doc.toProps(props) : props
  const bound = doc.bind ? doc.bind(props, setProps) : {}
  const { Component } = doc
  const controls = doc.controls.length > 0 && (
    <div className="flex flex-wrap items-end justify-end gap-indents-m">
      {/* Baseline anchor: a field-high box with text/pixel centred like the values in the
          fields. It's the only item aligned by baseline (placed at the bottom, like the
          fields), so it sets the row's baseline for the title. The controls' own baselines
          vary (Dropdown's comes from its icon, number inputs differ). */}
      <span aria-hidden="true" className="invisible flex w-0 items-center self-baseline-last text-text-pixel" style={{ height: SIZE.control }}>
        &nbsp;
      </span>
      {doc.controls.map(c => (
        <Control
          key={c.prop}
          control={c}
          value={props[c.prop]}
          onChange={v => setProps(p => ({ ...p, [c.prop]: v }))}
          disabled={c.enabled ? !c.enabled(props) : false}
        />
      ))}
    </div>
  )
  return (
    <Section title="Playground" level={level} aside={controls} className="rounded-radius-m bg-surface-card p-indents-m">
      {/* Fixed height: the preview is as tall as the tallest variant in the grid. */}
      <div className="flex min-h-indents-xxl-out items-center justify-center rounded-radius-m border border-border-default p-indents-x">
        <SizedBy
          ghosts={doc.rows.map(r => <Component key={r.label} {...r.props} />)}
          className={doc.width ? `${doc.width} items-center` : doc.wide ? 'w-full items-center' : doc.narrow ? 'w-1/3 items-center' : 'place-items-center'}
        >
          <Component {...live} {...bound} />
        </SizedBy>
      </div>
    </Section>
  )
}

// Grid and playground for one component; `level` is the heading level of their titles.
function ComponentDocs({ doc, level }) {
  // indents/X between the grid and the playground, on every page.
  return (
    <div className="flex flex-col gap-indents-x">
      <Section title="Variants and states" level={level}>
        <Grid doc={doc} />
      </Section>
      {/* key: a fresh playground for each component */}
      <Playground key={doc.name} doc={doc} level={level} />
    </div>
  )
}

// The page description sits half a section gap (indents/XXL ÷ 2) above the content.
const ABOUT_GAP = 'calc(var(--indents-xxl) / 2)'

// "Uses: Button, Status": the atoms inside a molecule, linking to their pages.
function Uses({ uses }) {
  return (
    <p className="text-text-grotesk text-text-secondary">
      Uses:{' '}
      {uses.map((u, i) => (
        <span key={u.slug}>
          {i > 0 && ', '}
          <Link to={`/ds-dev/atoms/${u.slug}`} className="rounded-radius-s text-text-primary underline focus-ring transition-state hover:text-text-secondary">
            {u.label}
          </Link>
        </span>
      ))}
    </p>
  )
}

// One component page's docs, under its h2 title on the Atoms or Molecules page: a custom
// render, one component, or several (each under its own h3). `uses` lists the atoms inside.
export default function DocPage({ page }) {
  let content
  if (page.render) content = page.render()
  else if (page.parts.length === 1) content = <ComponentDocs doc={page.parts[0]} level={3} />
  else
    content = page.parts.map(doc => (
      <section key={doc.name} className="flex flex-col gap-indents-x">
        <div className="flex flex-col gap-indents-xs">
          <h3 className="text-heading-h2">{doc.label}</h3>
          <p className="text-text-grotesk text-text-secondary">{nbsp(doc.about)}</p>
        </div>
        <ComponentDocs doc={doc} level={4} />
      </section>
    ))
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-indents-xs" style={{ paddingBottom: ABOUT_GAP }}>
        <p className="text-text-grotesk text-text-secondary">{nbsp(page.about)}</p>
        {page.uses?.length > 0 && <Uses uses={page.uses} />}
      </div>
      <div className="flex flex-col gap-indents-xxl">{content}</div>
    </div>
  )
}

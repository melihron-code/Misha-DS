import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, TextInput, ToggleButtonGroup } from '../../../components/atoms'
import { cx, SIZE } from '../../../components/atoms/shared'
import { nbsp } from '../../../lib/nbsp'
import CopyButton from '../CopyButton'
import Switch from '../Switch'
import { toJsx } from './jsx'
import PageFrame from './PageFrame'

// Literal classes, so Tailwind generates them. GRID_COLS: the playground control grid; 2 columns
// below the desktop breakpoint (1200px window).
// (A container query can't use the size/base-with variable: CSS doesn't allow var() there.)
const GRID_COLS = { 3: 'grid-cols-3 max-desktop:grid-cols-2', 4: 'grid-cols-4 max-desktop:grid-cols-2' }
// Column spans of a control in that grid; 3 columns become the full 2 on narrow windows.
const SPAN = { 1: '', 2: 'col-span-2', 3: 'col-span-3 max-desktop:col-span-2' }
// Grid rows for the aside.
const ROW_START = ['row-start-1', 'row-start-2', 'row-start-3', 'row-start-4']

// `aside` is a list of rows (the playground's controls) stacked in a block flush right, the
// rows left-aligned with each other. The title sits in the first row's line and shares its
// last text baseline, i.e. the values inside the first row of controls.
// `baseline`: which baseline of the first aside row the title shares: 'last' (a flex row of
// controls) or 'first' (a grid of controls, see Playground).
// `fill`: the aside (one block) takes all the width after the title instead of hugging it.
function Section({ title, level = 2, aside = [], baseline = 'last', fill = false, className = '', children }) {
  const H = `h${level}`
  const align = baseline === 'first' ? 'self-baseline' : 'self-baseline-last'
  if (fill) {
    return (
      <section className={`flex flex-col gap-indents-s-inner ${className}`}>
        <div className="flex gap-indents-m">
          <H className={`shrink-0 ${align} text-heading-h3 text-status-info`}>{title}</H>
          <div className={`min-w-0 flex-1 ${align}`}>{aside[0]}</div>
        </div>
        {children}
      </section>
    )
  }
  return (
    <section className={`flex flex-col gap-indents-s-inner ${className}`}>
      <div className="grid auto-cols-auto justify-between gap-x-indents-m gap-y-indents-m">
        <H className={`col-start-1 row-start-1 ${align} text-heading-h3 text-status-info`}>{title}</H>
        {aside.map((row, i) => (
          <div key={i} className={`col-start-2 ${ROW_START[i]} ${i === 0 ? align : ''}`}>
            {row}
          </div>
        ))}
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
                {doc.frame ? (
                  // Organisms: a desktop page, scaled to the column.
                  <PageFrame width="var(--size-page)">
                    <Component {...r.props} {...c.props} />
                  </PageFrame>
                ) : (
                  <div className={doc.width ?? (doc.wide ? 'w-full' : doc.narrow ? 'w-1/2' : '')}>
                    <Component {...r.props} {...c.props} />
                  </div>
                )}
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
// `itemClassName` goes on the wrappers (e.g. 'grid', so their content is a block that fills them).
function SizedBy({ ghosts, className = '', itemClassName = '', children }) {
  return (
    <div className={`grid ${className}`}>
      {ghosts.map((g, i) => (
        <div key={i} inert aria-hidden="true" className={`invisible col-start-1 row-start-1 ${itemClassName}`}>
          {g}
        </div>
      ))}
      <div className={`col-start-1 row-start-1 ${itemClassName}`}>{children}</div>
    </div>
  )
}

// 2. Controls for the playground: the atoms themselves (Dropdown, TextInput) and a Switch for booleans.
// Every control keeps a fixed width: text fields and switches don't change size, and a
// Dropdown is as wide as it is with its longest option.
// `block`: in a control grid, the control is a block filling its cell (no inline-line offset).
function Control({ control, value, onChange, disabled, block = false }) {
  const label = control.label ?? control.prop
  const item = block ? 'grid' : ''
  if (control.type === 'select') {
    return (
      <SizedBy itemClassName={item} ghosts={control.options.map(o => <Dropdown key={o} label={label} options={control.options} value={o} />)}>
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
      itemClassName={item}
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
  // `controls` is one row, or a list of rows.
  const rows = doc.controls.length === 0 ? [] : Array.isArray(doc.controls[0]) ? doc.controls : [doc.controls]
  const control = (c, block = false) => (
    <Control
      key={c.prop}
      block={block}
      control={c}
      value={props[c.prop]}
      onChange={v => setProps(p => ({ ...p, [c.prop]: v }))}
      disabled={c.enabled ? !c.enabled(props) : false}
    />
  )
  // doc.controlGrid (a column count): the controls sit on that many equal columns, so field edges
  // line up across rows. A control spans 1 column, a double-width text field 2; each fills
  // its own columns and nothing more. Each row starts at column 1. In a window under 1280px
  // it's 2 columns, and 2-column fields span the full width.
  if (doc.controlGrid) {
    const grid = (
      <div className={`grid gap-indents-m ${GRID_COLS[doc.controlGrid]}`}>
        {/* Baseline anchor for this grid: as tall as a control (a caps-label line + indents/XS,
            then a field-high box with text/pixel centred like the values), sharing the cell of
            the first control. Its first baseline is the value line, and it's the only first-row
            item aligned by baseline, so the grid's first baseline (the title's) is the values'. */}
        <span
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 w-0 self-baseline text-text-caps"
          style={{ paddingTop: 'calc(1lh + var(--indents-xs))' }}
        >
          <span className="flex items-center text-text-pixel" style={{ height: SIZE.control }}>
            &nbsp;
          </span>
        </span>
        {rows.map((row, r) =>
          row.map((c, i) => (
            // grid: the control is a block that fills its columns (not an inline box on a text line).
            <div key={c.prop} className={cx('grid', SPAN[c.span ?? (c.double ? 2 : 1)], i === 0 && 'col-start-1', r === 0 && i === 0 && 'row-start-1')}>
              {control(c, true)}
            </div>
          )),
        )}
      </div>
    )
    return <PlaygroundBody doc={doc} live={live} bound={bound} props={props} rows={rows} level={level} aside={[grid]} baseline="first" fill={doc.controlFill} />
  }
  const aside = rows.map((row, i) => (
    <div key={i} className="flex flex-wrap items-end gap-indents-m">
      {/* Baseline anchor: a field-high box with text/pixel centred like the values in the
          fields. It's the only item aligned by baseline (placed at the bottom, like the
          fields), so it sets the row's baseline for the title. The controls' own baselines
          vary (Dropdown's comes from its icon, number inputs differ). */}
      <span aria-hidden="true" className="invisible -mr-indents-m flex w-0 items-center self-baseline-last text-text-pixel" style={{ height: SIZE.control }}>
        &nbsp;
      </span>
      {row.map(control)}
    </div>
  ))
  return <PlaygroundBody doc={doc} live={live} bound={bound} props={props} rows={rows} level={level} aside={aside} />
}

// The playground card: title and controls, the live preview, and the JSX snippet.
// Organism previews: a page of this width (size tokens), see PageFrame.
const VIEWPORTS = [
  { value: 'desktop', label: 'Desktop 1440', width: 'var(--size-page)' },
  { value: 'tablet', label: 'Tablet 768', width: 'var(--size-viewport-tablet)' },
  { value: 'mobile', label: 'Mobile 375', width: 'var(--size-viewport-mobile)' },
]

// mt-indents-s-inner doubles the space after the controls (the section gap + the same again).
function FramedPreview({ minHeight, children }) {
  const [viewport, setViewport] = useState('desktop')
  return (
    <div className="mt-indents-s-inner flex flex-col items-center gap-indents-s-inner">
      <ToggleButtonGroup label="Viewport" options={VIEWPORTS} value={viewport} onChange={setViewport} />
      <div className="w-full rounded-radius-m border border-border-default">
        <PageFrame width={VIEWPORTS.find(v => v.value === viewport).width} minHeight={minHeight}>
          {children}
        </PageFrame>
      </div>
    </div>
  )
}

function PlaygroundBody({ doc, live, bound, props, rows, level, aside, baseline, fill }) {
  const { Component } = doc
  const snippet = (
    <CopyButton
      value={toJsx(doc.name, live, new Set(rows.flat().filter(c => c.enabled && !c.enabled(props)).map(c => c.prop)), doc.snippetNames, doc.defaults)}
      className="self-start text-text-grotesk text-text-secondary"
    />
  )
  if (doc.frame) {
    return (
      <Section title="Playground" level={level} aside={aside} baseline={baseline} fill={fill} className="rounded-radius-m bg-surface-card p-indents-m">
        <FramedPreview minHeight={doc.frameMinHeight}>
          <Component {...live} {...bound} />
        </FramedPreview>
        {snippet}
      </Section>
    )
  }
  return (
    <Section title="Playground" level={level} aside={aside} baseline={baseline} fill={fill} className="rounded-radius-m bg-surface-card p-indents-m">
      {/* Fixed height: the preview is as tall as the tallest variant in the grid. */}
      <div className="flex min-h-indents-xxl-out items-center justify-center rounded-radius-m border border-border-default p-indents-x">
        <SizedBy
          ghosts={doc.rows.map(r => <Component key={r.label} {...r.props} />)}
          className={doc.width ? `${doc.width} items-center` : doc.wide ? 'w-full items-center' : doc.narrow ? 'w-1/3 items-center' : 'place-items-center'}
        >
          <Component {...live} {...bound} />
        </SizedBy>
      </div>
      {/* The JSX for the current props, styled like the CSS variables on the foundation
          pages; click to copy. Props of disabled controls are left out. */}
      {snippet}
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

// "Uses: Button, Status": the atoms (and molecules) inside a component, linking to their pages.
function Uses({ uses }) {
  return (
    <p className="text-text-grotesk text-text-secondary">
      Uses:{' '}
      {uses.map((u, i) => (
        <span key={u.slug}>
          {i > 0 && ', '}
          <Link to={`/ds-dev/${u.group ?? 'atoms'}/${u.slug}`} className="rounded-radius-s text-text-grotesk-bold text-status-info underline focus-ring transition-state hover:text-text-primary">
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

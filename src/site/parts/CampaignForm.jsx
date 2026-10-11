import { useEffect, useId, useRef, useState } from 'react'
import { Button, Dropdown, ErrorMessage, TextArea, TextInput } from '../../components/atoms'
import Tooltip from '../../components/support/Tooltip'
import { cx } from '../../components/atoms/shared'
import SkillsInput from './SkillsInput'

// CampaignForm (v0.6.9; a site part since v0.6.12, not in the design system; Figma: the "form" card on
// hiring-campaign-wizard). Built from design-system atoms, plus its own SkillsInput. A surface/card panel (radius/L,
// indents/X on top, indents/XXL (out) at the bottom) with a centered column (7/12 of the card; Figma: 482 of 830):
// sections indents/XXL (out) apart, each a title (heading/h2) over its fields, then the submit Button (primary-lg,
// full column width). Fields sit in 2 columns (indents/2XS between them, indents/L between rows); `span: 2` takes
// the row. Field types: text (TextInput), dropdown (Dropdown), textarea (TextArea, `rows`), skills (SkillsInput).
// - The form keeps the values itself (`defaultValue` per field). A text field with `min` shows its `error`
//   (ErrorMessage, at the end of its section) while the number in it is under `min`.
// - `assist` on a text area: clicking or focusing it opens a popover under it (a non-modal dialog; Figma:
//   hiring-campaign-wizard-viewport): a TextArea and a Button primary-sm. Focus stays in the field (the popover is the
//   next Tab stop); Escape or a click outside closes it (Escape puts focus back in the field). The button sets the
//   field to `onAssist(name, text)`'s result and closes it.
// - `submit`: { label, href, onClick, tooltip }.
// Responsive (container "page"): in a mobile page the column takes the card's width (indents/X at the sides) and
// the fields one column.
const SPAN = { 1: '', 2: 'col-span-2 @max-tablet/page:col-span-1' }
const numberIn = text => Number(String(text ?? '').replace(/[^0-9.]/g, ''))

function AssistTextArea({ field, value, onChange, onAssist }) {
  const { assist } = field
  const [open, setOpen] = useState(false)
  const [headLine, setHeadLine] = useState('')
  const rootRef = useRef(null)
  const fieldRef = useRef(null)
  const keepClosed = useRef(false) // focus coming back from the popover doesn't reopen it
  const popoverId = useId()

  const close = refocus => {
    setOpen(false)
    if (refocus) {
      keepClosed.current = true
      fieldRef.current?.focus()
    }
  }
  const show = () => {
    if (keepClosed.current) {
      keepClosed.current = false
      return
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && close(true)
    const onDown = e => !rootRef.current?.contains(e.target) && close(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={cx('relative', SPAN[2])}
      // Focus leaving the field and its popover closes it.
      onBlur={e => !rootRef.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <TextArea
        ref={fieldRef}
        label={field.label}
        placeholder={field.placeholder}
        rows={field.rows}
        value={value ?? ''}
        onChange={e => onChange(field.name, e.target.value)}
        onFocus={show}
        onClick={() => setOpen(true)}
        aria-controls={popoverId}
        className="w-full"
      />
      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-label={assist.title}
          className="absolute top-full left-0 z-20 mt-indents-xs flex w-3/4 flex-col items-start gap-indents-l rounded-radius-l border border-border-default bg-surface-card p-indents-m shadow-card @max-tablet/page:w-full"
        >
          <TextArea label={assist.label} placeholder={assist.placeholder} value={headLine} onChange={e => setHeadLine(e.target.value)} rows={2} className="w-full" />
          <Button
            variant="primary-sm"
            onClick={() => {
              onChange(field.name, onAssist?.(field.name, headLine) ?? value)
              close(true)
            }}
          >
            {assist.actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

function Field({ field, value, onChange, onAssist }) {
  const span = SPAN[field.span ?? 1]
  if (field.type === 'dropdown') {
    return (
      <Dropdown
        label={field.label}
        options={field.options}
        value={value}
        placeholder={field.placeholder}
        onChange={v => onChange(field.name, v)}
        className={cx('w-full', span)}
      />
    )
  }
  if (field.type === 'textarea') {
    if (field.assist) return <AssistTextArea field={field} value={value} onChange={onChange} onAssist={onAssist} />
    return <TextArea label={field.label} placeholder={field.placeholder} rows={field.rows} value={value ?? ''} onChange={e => onChange(field.name, e.target.value)} className={cx('w-full', span)} />
  }
  if (field.type === 'skills') {
    return (
      <SkillsInput
        label={field.label}
        placeholder={field.placeholder}
        addLabel={field.addLabel}
        value={value ?? []}
        onChange={v => onChange(field.name, v)}
        className={span}
      />
    )
  }
  return <TextInput label={field.label} placeholder={field.placeholder} value={value ?? ''} onChange={e => onChange(field.name, e.target.value)} className={cx('w-full', span)} />
}

export default function CampaignForm({ sections = [], submit, onAssist, label = 'Campaign form', className, ...rest }) {
  const [values, setValues] = useState(() => Object.fromEntries(sections.flatMap(s => s.fields).map(f => [f.name, f.defaultValue])))
  const set = (name, value) => setValues(v => ({ ...v, [name]: value }))

  return (
    <form
      aria-label={label}
      noValidate
      onSubmit={e => e.preventDefault()}
      className={cx('flex w-full flex-col items-center rounded-radius-l bg-surface-card pt-indents-x pb-indents-xxl-out @max-tablet/page:px-indents-x', className)}
      {...rest}
    >
      <div className="flex w-7/12 flex-col gap-indents-xxl-out @max-tablet/page:w-full">
        {sections.map(section => {
          const errors = section.fields.filter(f => f.min !== undefined && numberIn(values[f.name]) < f.min)
          return (
            <section key={section.id} aria-labelledby={`${section.id}-title`} className="flex flex-col gap-indents-l">
              <h2 id={`${section.id}-title`} className="text-heading-h2 text-text-primary">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-x-indents-2xs gap-y-indents-l @max-tablet/page:grid-cols-1">
                {section.fields.map(f => (
                  <Field key={f.name} field={f} value={values[f.name]} onChange={set} onAssist={onAssist} />
                ))}
                {errors.map(f => (
                  <ErrorMessage key={f.name} message={f.error} className={SPAN[2]} />
                ))}
              </div>
            </section>
          )
        })}
        {submit && (
          <Tooltip text={submit.tooltip} unavailable className="w-full">
            <Button variant="primary-lg" href={submit.href} onClick={submit.onClick} className="w-full">
              {submit.label}
            </Button>
          </Tooltip>
        )}
      </div>
    </form>
  )
}

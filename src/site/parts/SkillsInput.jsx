import { useState } from 'react'
import { Button, Tag, TextInput } from '../../components/atoms'
import { cx } from '../../components/atoms/shared'

// SkillsInput (v0.6.9; CampaignForm's own part since v0.6.12, not in the design system; Figma: "skills" on
// hiring-campaign-wizard). A TextInput with an "Add" Button
// (secondary) beside it, aligned to the field, then the added skills as Tags (control, with the remove icon),
// indents/3XS apart, indents/2XS under the field. Typing a skill and pressing Add or Enter adds it (no empty or
// repeated ones); a Tag removes its skill. `value` (the skills), `onChange(skills)`; `label`, `placeholder`, `addLabel`.
export default function SkillsInput({ label = 'Required skills', placeholder, addLabel = 'Add', value = [], onChange, className, ...rest }) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const skill = draft.trim()
    if (!skill) return
    if (!value.some(s => s.toLowerCase() === skill.toLowerCase())) onChange?.([...value, skill])
    setDraft('')
  }
  return (
    <div className={cx('flex w-full flex-col gap-indents-2xs', className)} {...rest}>
      <div className="flex items-end gap-indents-2xs">
        <TextInput
          label={label}
          placeholder={placeholder}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          className="min-w-0 flex-1"
        />
        <Button variant="secondary" onClick={add}>
          {addLabel}
        </Button>
      </div>
      {value.length > 0 && (
        <ul aria-label={label} className="flex flex-wrap gap-indents-3xs">
          {value.map(skill => (
            <li key={skill}>
              <Tag variant="control" label={skill} showIcon onClick={() => onChange?.(value.filter(s => s !== skill))} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

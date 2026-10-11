import { useState } from 'react'
import photo768 from '../../assets/hero/photo-768.webp'
import photo1536 from '../../assets/hero/photo-1536.webp'
import { Button, Dropdown, ToggleButtonGroup, Tooltip } from '../atoms'
import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// Figma: HeroCard. variant with-bg | no-bg | homepage, showActions. The hero of a page: a title (heading/h1, the page's
// h1), a subtitle (text/description) and actions, centered in an 830px-wide area (size/base-with).
// with-bg: a card (radius/L, padding indents/X, at least 480px = indents/M × 24) on a photo turned yellow
//   (accent/primary in "color" blend, then surface/hero-tint in "hard light"), with labels on top, and at the
//   bottom the editable tags (Dropdown on-color, no label) plus "Add" (Button accent, adds an empty
//   Dropdown to pick a value). Actions are Button on-color; the subtitle and labels are text/accent.
// no-bg: no fill (it sits on HeroSection's backdrop); actions are Button primary-sm; the team switcher
//   (ToggleButtonGroup) sits at the bottom, indents/M × 8 under the content (Figma: 160px).
// homepage (Figma: "Homepage"): no fill, at least 480px like with-bg, the content centered in it; actions are
//   Button primary-lg, indents/XS apart; no team switcher.
// An action can set its own `variant` (v0.6.7; e.g. the candidate's "Promote", a primary-sm CTA among on-color
// buttons). with-bg's photo is WebP at 768 and 1536 wide (npm run images); it's high on the page, so it loads first.
// `image`: { src, srcSet, width, height } (or a plain URL).
// An action or team option with `tooltip` has no action yet: it shows the Tooltip (e.g. "No action for now") and
// is marked unavailable (not-allowed cursor).
// Fills its container up to size/base-with (830px), centered. Responsive (container "page"): in a mobile page the gaps shrink, the minimum height goes, the tag groups
// stack; buttons and tags wrap at every size.
const MIN_HEIGHT = 'calc(var(--indents-m) * 24)' // 480px
const GAP = 'calc(var(--indents-m) * 8)' // 160px
const ACTION_VARIANT = { 'with-bg': 'on-color', 'no-bg': 'primary-sm', homepage: 'primary-lg' }
const ACTION_GAP = { 'with-bg': 'gap-indents-3xs', 'no-bg': 'gap-indents-3xs', homepage: 'gap-indents-xs' }
// One shared empty list, so a missing tags prop is the same value on every render.
const NONE = []
const PHOTO = { src: photo1536, srcSet: `${photo768} 768w, ${photo1536} 1536w`, width: 1536, height: 864 }

// The tag groups (with-bg): the start group is a 2-column grid (v0.6.8), each Dropdown filling its cell and "Add" at
// its own width; the end group wraps to the right. In a mobile page both wrap, full width (the columns would be too
// narrow for the tags there).
const GROUP = {
  start: 'grid w-fit grid-cols-2 items-center gap-indents-3xs @max-tablet/page:flex @max-tablet/page:w-full @max-tablet/page:flex-wrap',
  end: 'flex w-1/4 flex-wrap items-center justify-end gap-indents-3xs @max-tablet/page:w-full @max-tablet/page:justify-start',
}
const TAG = { start: 'w-full @max-tablet/page:w-auto', end: undefined }

function TagGroup({ tags, onChange, addLabel, onAdd, end = false }) {
  const side = end ? 'end' : 'start'
  return (
    <div className={GROUP[side]}>
      {tags.map((t, i) => (
        <Dropdown
          key={i}
          variant="on-color"
          showLabel={false}
          label={t.label}
          options={t.options}
          value={t.value}
          placeholder={`Choose ${t.label.toLowerCase()}`}
          onChange={v => onChange(i, v)}
          className={TAG[side]}
        />
      ))}
      {onAdd && (
        <Button variant="accent" onClick={onAdd} className="justify-self-start">
          {addLabel}
        </Button>
      )}
    </div>
  )
}

export default function HeroCard({
  variant = 'with-bg',
  showActions = true,
  title = 'Sarah Mitchell',
  subtitle = 'Senior Software Engineer',
  labels = { start: 'Teams', end: 'Access' },
  actions = NONE,
  tags = NONE,
  endTags = NONE,
  addLabel = 'Add',
  onTagsChange,
  image = PHOTO,
  teams = NONE,
  team,
  onTeamChange,
  className,
  style,
  ...rest
}) {
  const withBg = variant === 'with-bg'
  // The tags are editable here; onTagsChange reports { tags, endTags } after each change.
  const [own, setOwn] = useState({ tags, endTags })
  // New tags passed in (another candidate) replace the edited ones (state adjusted during render).
  const [given, setGiven] = useState({ tags, endTags })
  if (given.tags !== tags || given.endTags !== endTags) {
    setGiven({ tags, endTags })
    setOwn({ tags, endTags })
  }
  const update = next => {
    setOwn(next)
    onTagsChange?.(next)
  }
  const change = key => (i, value) => update({ ...own, [key]: own[key].map((t, j) => (j === i ? { ...t, value } : t)) })
  const add = key => () => {
    const last = own[key][own[key].length - 1]
    update({ ...own, [key]: [...own[key], { label: last?.label ?? 'Value', options: last?.options ?? [], value: undefined }] })
  }

  const heading = (
    <div className="flex w-full flex-col items-center gap-indents-x text-center">
      <div className="flex w-full flex-col gap-indents-x">
        <h1 className="text-heading-h1 text-text-primary">{nbsp(title)}</h1>
        {subtitle && <p className={cx('text-text-description', withBg ? 'text-text-accent' : 'text-text-primary')}>{nbsp(subtitle)}</p>}
      </div>
      {showActions && actions.length > 0 && (
        <div className={cx('flex flex-wrap justify-center', ACTION_GAP[variant])}>
          {actions.map(a => (
            <Tooltip key={a.label} text={a.tooltip} unavailable>
              <Button variant={a.variant ?? ACTION_VARIANT[variant]} href={a.href} onClick={a.onClick}>
                {a.label}
              </Button>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )

  if (variant === 'homepage') {
    return (
      <div
        className={cx('mx-auto flex min-h-(--hero-min) w-full max-w-size-base-with flex-col items-center justify-center p-indents-x @max-tablet/page:min-h-0 @max-tablet/page:px-0', className)}
        style={{ '--hero-min': MIN_HEIGHT, ...style }}
        {...rest}
      >
        {heading}
      </div>
    )
  }

  if (!withBg) {
    return (
      <div
        className={cx('mx-auto flex w-full max-w-size-base-with flex-col items-center justify-end gap-(--hero-gap) p-indents-x @max-tablet/page:gap-indents-x @max-tablet/page:px-0', className)}
        style={{ '--hero-gap': GAP, ...style }}
        {...rest}
      >
        {heading}
        {teams.length > 0 && <ToggleButtonGroup label="Team view" options={teams} value={team} onChange={onTeamChange} />}
      </div>
    )
  }

  return (
    <div
      className={cx(
        'relative isolate mx-auto flex min-h-(--hero-min) w-full max-w-size-base-with flex-col gap-indents-x overflow-hidden rounded-radius-l p-indents-x @max-tablet/page:min-h-0',
        className,
      )}
      style={{ '--hero-min': MIN_HEIGHT, ...style }}
      {...rest}
    >
      {/* The yellow photo: the image, turned black-and-white ("color" blend with black), then tinted. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={typeof image === 'string' ? image : image.src}
          srcSet={image.srcSet}
          sizes="100vw"
          width={image.width}
          height={image.height}
          fetchPriority="high"
          decoding="async"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-accent-primary mix-blend-color" />
        <div className="absolute inset-0 bg-surface-hero-tint mix-blend-hard-light" />
      </div>
      <div className="flex justify-between gap-indents-m text-text-pixel text-text-accent">
        <span>{labels.start}</span>
        <span>{labels.end}</span>
      </div>
      <div className="flex flex-1 items-center">{heading}</div>
      {(own.tags.length > 0 || own.endTags.length > 0) && (
        <div className="flex items-end justify-between gap-indents-m @max-tablet/page:flex-col @max-tablet/page:items-start">
          <TagGroup tags={own.tags} onChange={change('tags')} addLabel={addLabel} onAdd={own.tags.length ? add('tags') : undefined} />
          <TagGroup tags={own.endTags} onChange={change('endTags')} addLabel={addLabel} onAdd={own.endTags.length ? add('endTags') : undefined} end />
        </div>
      )}
    </div>
  )
}

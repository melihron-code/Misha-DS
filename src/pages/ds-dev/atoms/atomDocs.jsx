import {
  Avatar,
  AvatarGroup,
  Button,
  DocumentRow,
  Dropdown,
  ErrorMessage,
  Flag,
  MiniChart,
  ProgressBar,
  Status,
  Tag,
  TextArea,
  TextInput,
  ToggleButton,
  ToggleButtonGroup,
} from '../../../components/atoms'
import { ONE, STATES, STATES_NO_DISABLED, select, text, toggle, withAbout } from '../docs/docHelpers'
import IconGallery from './IconGallery'

// Docs for each atom (the format is described in ../docs/docHelpers.js).
// Disabled in the playground unless the node variant is chosen (the sublabel exists only there).
const nodeOnly = control => ({ ...control, enabled: p => p.variant === 'node' })

const BUTTON_VARIANTS = ['primary-lg', 'primary-sm', 'secondary', 'on-color', 'node']

const BUTTON = {
  name: 'Button',
  label: 'Button',
  Component: Button,
  about: 'Pill-shaped action button; node is the two-line card button. Hover and pressed lay overlay/hover (15%) or overlay/pressed (25%) over it. Disabled is the same for every variant: bg/disabled-bg and text/disabled.',
  rows: BUTTON_VARIANTS.map(v => ({ label: v, props: { variant: v } })),
  columns: STATES,
  controls: [select('variant', BUTTON_VARIANTS), text('children', 'label'), nodeOnly(text('sublabel')), nodeOnly(toggle('showSublabel')), toggle('disabled')],
  initial: { variant: 'primary-lg', children: 'More info', sublabel: 'more info', showSublabel: true, disabled: false },
}

const TOGGLE_BUTTON = {
  name: 'ToggleButton',
  label: 'Toggle button',
  Component: ToggleButton,
  about: 'A button that stays on or off (aria-pressed). Click to toggle.',
  rows: [
    { label: 'lg · selected', props: { size: 'lg', selected: true } },
    { label: 'lg · not selected', props: { size: 'lg', selected: false } },
    { label: 'sm · selected', props: { size: 'sm', selected: true } },
    { label: 'sm · not selected', props: { size: 'sm', selected: false } },
  ],
  columns: STATES_NO_DISABLED,
  controls: [toggle('selected'), select('size', ['lg', 'sm']), text('label')],
  initial: { selected: true, size: 'lg', label: 'Team' },
  bind: (p, set) => ({ onClick: () => set({ ...p, selected: !p.selected }) }),
}

const TOGGLE_BUTTON_GROUP = {
  name: 'ToggleButtonGroup',
  label: 'Toggle button group',
  Component: ToggleButtonGroup,
  about: 'Single choice from a few options (radio group). Arrow keys move the selection; Tab leaves the group.',
  rows: [{ label: 'default', props: { value: 'team-1' } }],
  columns: ONE,
  controls: [select('value', ['team-1', 'team-2', 'team-3'])],
  initial: { value: 'team-1' },
  bind: (p, set) => ({ onChange: v => set({ ...p, value: v }) }),
}

const TAG = {
  name: 'Tag',
  label: 'Tag',
  Component: Tag,
  about: 'control is clickable (with showIcon it reads "Remove <label>"); static is display-only, in yellow or green. 32px high.',
  rows: [
    { label: 'control', props: { variant: 'control' } },
    { label: 'control · showIcon', props: { variant: 'control', showIcon: true } },
    { label: 'static · yellow', props: { variant: 'static', color: 'yellow' } },
    { label: 'static · green', props: { variant: 'static', color: 'green' } },
  ],
  columns: STATES_NO_DISABLED,
  controls: [
    select('variant', ['control', 'static']),
    { ...select('color', ['yellow', 'green']), enabled: p => p.variant === 'static' },
    text('label'),
    toggle('showIcon'),
  ],
  initial: { variant: 'control', color: 'yellow', label: 'React', showIcon: false },
}

const FLAG = {
  name: 'Flag',
  label: 'Flag',
  Component: Flag,
  about: 'Bookmark toggle (aria-pressed). Click to flag or unflag.',
  rows: [{ label: 'not checked', props: { checked: false } }, { label: 'checked', props: { checked: true } }],
  columns: STATES,
  controls: [toggle('checked'), toggle('disabled')],
  initial: { checked: false, disabled: false },
  bind: (p, set) => ({ onClick: () => set({ ...p, checked: !p.checked }) }),
}

const STATUS = {
  name: 'Status',
  label: 'Status',
  Component: Status,
  about: 'Colored dot and label.',
  rows: ['growth', 'on-track', 'failing', 'stopped'].map(s => ({ label: s, props: { status: s } })),
  columns: ONE,
  controls: [select('status', ['growth', 'on-track', 'failing', 'stopped']), text('label')],
  initial: { status: 'on-track', label: 'On Track' },
}

const ERROR_MESSAGE = {
  name: 'ErrorMessage',
  label: 'Error message',
  Component: ErrorMessage,
  about: 'Inline error, announced to screen readers (role="alert").',
  rows: [{ label: 'default', props: {} }],
  columns: ONE,
  controls: [{ ...text('message'), double: true }],
  initial: { message: 'Something went wrong' },
}

const AVATAR = {
  name: 'Avatar',
  label: 'Avatar',
  Component: Avatar,
  about: 'Round 30px photo.',
  rows: ['katya', 'dog', 'petya'].map(i => ({ label: i, props: { image: i } })),
  columns: ONE,
  controls: [select('image', ['katya', 'dog', 'petya'])],
  initial: { image: 'katya' },
}

const AVATAR_GROUP = {
  name: 'AvatarGroup',
  label: 'Avatar group',
  Component: AvatarGroup,
  about: 'Overlapping avatars (indents/-XS).',
  rows: [{ label: 'default', props: {} }],
  columns: ONE,
  controls: [],
  initial: {},
}

const DOCUMENT_ROW = {
  name: 'DocumentRow',
  label: 'Document row',
  Component: DocumentRow,
  about: 'A row in a document list: title, type, author, date and an edit button.',
  rows: [{ label: 'default', props: {} }],
  columns: ONE,
  controls: [text('title'), text('author'), text('date')],
  initial: { title: 'Sarah Johnson', author: 'created by Alan', date: '24.05.2025' },
  wide: true,
}

const TEXT_INPUT = {
  name: 'TextInput',
  label: 'Text input',
  Component: TextInput,
  about: 'Single-line text field with a label.',
  rows: [{ label: 'label shown', props: {} }, { label: 'label hidden', props: { showLabel: false } }],
  columns: [
    { label: 'empty', props: { placeholder: 'Michael Lee' } },
    { label: 'filled', props: { defaultValue: 'Michael Lee' } },
    { label: 'focus', props: { defaultValue: 'Michael Lee', state: 'focus' } },
    { label: 'disabled', props: { defaultValue: 'Michael Lee', state: 'disabled' } },
  ],
  controls: [text('label'), text('value'), toggle('showLabel'), toggle('disabled')],
  initial: { label: 'head line', value: 'Michael Lee', showLabel: true, disabled: false },
  bind: (p, set) => ({ onChange: e => set({ ...p, value: e.target.value }) }),
}

const TEXT_AREA = {
  name: 'TextArea',
  label: 'Text area',
  Component: TextArea,
  about: 'Multi-line text field with a label.',
  rows: [{ label: 'label shown', props: {} }, { label: 'label hidden', props: { showLabel: false } }],
  columns: [
    { label: 'empty', props: {} },
    { label: 'filled', props: { defaultValue: 'Michael Lee' } },
    { label: 'focus', props: { state: 'focus' } },
    { label: 'disabled', props: { state: 'disabled' } },
  ],
  controls: [text('label'), text('placeholder'), toggle('showLabel'), toggle('disabled')],
  initial: { label: 'head line', placeholder: 'type something here', showLabel: true, disabled: false },
}

const DROPDOWN = {
  name: 'Dropdown',
  label: 'Dropdown',
  Component: Dropdown,
  about: 'Pick one option from a list. Keyboard: Enter, Space or arrows open; arrows move; Enter picks; Esc closes.',
  rows: [
    { label: 'default · filled', props: { variant: 'default', value: 'frontend-team' } },
    { label: 'default · not filled', props: { variant: 'default' } },
    { label: 'on-color · filled', props: { variant: 'on-color', value: 'frontend-team' } },
    { label: 'on-color · not filled', props: { variant: 'on-color' } },
  ],
  columns: STATES,
  controls: [select('variant', ['default', 'on-color']), select('value', ['frontend-team', 'backend-team', 'design-team']), text('label'), toggle('showLabel'), toggle('disabled')],
  initial: { variant: 'default', value: 'frontend-team', label: 'head line', showLabel: true, disabled: false },
  bind: (p, set) => ({ onChange: v => set({ ...p, value: v }) }),
}

const MINI_CHART = {
  name: 'MiniChart',
  label: 'Mini chart',
  Component: MiniChart,
  about: 'Small bar chart; values are 0–100 (% of the chart height). The bars are overlay/pressed (25% black), so they tint the card they sit on.',
  rows: [{ label: 'default', props: {} }],
  columns: ONE,
  controls: [{ prop: 'first', type: 'number', label: 'bar 1 (0–100)' }, { prop: 'second', type: 'number', label: 'bar 2 (0–100)' }],
  initial: { first: 100, second: 58 },
  toProps: p => ({ values: [p.first, p.second] }),
  width: 'w-1/6', // about Figma's 143px (MetricCard's chart is ~124px); the atom fills its container
}

const PROGRESS_BAR = {
  name: 'ProgressBar',
  label: 'Progress bar',
  Component: ProgressBar,
  about: 'Dotted progress; fills the width of its container. tone accent uses the green data/bar-*-accent colors.',
  rows: [
    { label: 'sm · 75', props: { size: 'sm', value: 75 } },
    { label: 'sm · 20', props: { size: 'sm', value: 20 } },
    { label: 'lg · 75', props: { size: 'lg', value: 75 } },
    { label: 'lg · 20', props: { size: 'lg', value: 20 } },
    { label: 'accent · sm · 75', props: { tone: 'accent', size: 'sm', value: 75 } },
    { label: 'accent · lg · 75', props: { tone: 'accent', size: 'lg', value: 75 } },
  ],
  columns: ONE,
  controls: [select('tone', ['default', 'accent']), select('size', ['sm', 'lg']), { prop: 'value', type: 'number', label: 'value (0–100)' }],
  initial: { tone: 'default', size: 'sm', value: 75 },
  wide: true,
}

// Pages under /ds-dev/atoms/<slug>, in sidebar order. A page shows one or more
// components (`parts`) or a custom `render`.
export const ATOM_PAGES = withAbout([
  { slug: 'button', label: 'Button', parts: [BUTTON] },
  { slug: 'input', label: 'Input', about: 'Text fields with a label: one line or several.', parts: [TEXT_INPUT, TEXT_AREA] },
  { slug: 'dropdown', label: 'Dropdown', parts: [DROPDOWN] },
  { slug: 'tabs', label: 'Tabs', about: 'A group of toggle buttons where exactly one is selected, or a toggle button on its own.', parts: [TOGGLE_BUTTON_GROUP, TOGGLE_BUTTON] },
  { slug: 'mini-chart', label: 'Mini chart', parts: [MINI_CHART] },
  { slug: 'progress-bar', label: 'Progress bar', parts: [PROGRESS_BAR] },
  { slug: 'status', label: 'Status', parts: [STATUS] },
  { slug: 'error-message', label: 'Error message', parts: [ERROR_MESSAGE] },
  { slug: 'flag', label: 'Flag', parts: [FLAG] },
  {
    slug: 'icon',
    label: 'Icon',
    about: 'Every icon, as <Icon name="play" /> or as its own component (<PlayIcon size={24} />); both follow the text color. Click a name to copy it. Temporary: these are Apple SF Symbols, to be replaced before the site goes public.',
    render: () => <IconGallery />,
  },
  { slug: 'tag', label: 'Tag', parts: [TAG] },
  { slug: 'avatar', label: 'Avatar', about: 'Several round photos overlapping, or one on its own.', parts: [AVATAR_GROUP, AVATAR] },
  { slug: 'document-row', label: 'Document row', parts: [DOCUMENT_ROW] },
])

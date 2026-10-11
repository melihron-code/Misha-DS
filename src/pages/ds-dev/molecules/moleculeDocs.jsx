import {
  AttemptCard,
  AutomationNode,
  Breadcrumbs,
  CampaignCard,
  ExperienceItem,
  MetricCard,
  Notification,
  ProfileCard,
  ProjectCard,
  StageProgress,
  StatCard,
  TeamCard,
} from '../../../components/molecules'
import { breadcrumbs } from '../../../data/navigation'
import { careerStages, developmentStages } from '../../../data/stages'
import { ONE, number, select, text, toggle, withAbout } from '../docs/docHelpers'

// Docs for each molecule (the format is described in ../docs/docHelpers.js). Molecules fill
// their container; `width` shows each one at about its Figma width in the 830px column.
// Molecules have no states of their own: the Buttons inside them carry theirs (see Button).
const STATUSES = ['on-track', 'growth', 'failing', 'stopped']
const double = control => ({ ...control, double: true })
const longOnly = control => ({ ...control, enabled: p => p.variant === 'long' })

// Atom pages a molecule uses, for its "Uses" line.
const A = {
  avatar: { slug: 'avatar', label: 'Avatar' },
  avatarGroup: { slug: 'avatar', label: 'AvatarGroup' },
  button: { slug: 'button', label: 'Button' },
  icon: { slug: 'icon', label: 'Icon' },
  miniChart: { slug: 'mini-chart', label: 'MiniChart' },
  progressBar: { slug: 'progress-bar', label: 'ProgressBar' },
  status: { slug: 'status', label: 'Status' },
  tag: { slug: 'tag', label: 'Tag' },
  textLink: { slug: 'text-link', label: 'TextLink' },
}

const PROFILE_CARD = {
  name: 'ProfileCard',
  label: 'Profile card',
  Component: ProfileCard,
  about: 'A person: long is a list row with status and progress; short and short-outlined are compact chips (red or neutral) that hug their content. Name and role stay on one line.',
  rows: ['long', 'short', 'short-outlined'].map(v => ({ label: v, props: { variant: v } })),
  columns: ONE,
  controls: [
    [select('variant', ['long', 'short', 'short-outlined']), text('name'), text('role')],
    [longOnly(select('status', STATUSES)), longOnly(number('progress', 'progress (0–100)'))],
  ],
  initial: { variant: 'long', name: 'Sarah Johnson', role: 'Senior Developer', status: 'on-track', progress: 86 },
  controlGrid: 3, // controls on 3 equal columns, edges lined up across rows
  width: 'w-5/6',
}

const AUTOMATION_NODE = {
  name: 'AutomationNode',
  label: 'Automation node',
  Component: AutomationNode,
  about: 'A step in an automation flow: its trigger and event, with an input port (grey) and an output port (black). The play and more icons are decorative for now.',
  rows: ONE,
  columns: ONE,
  controls: [text('title'), text('event')],
  initial: { title: 'Start Trigger', event: 'New application received' },
  width: 'w-1/3',
}

const CAMPAIGN_CARD = {
  name: 'CampaignCard',
  label: 'Campaign card',
  Component: CampaignCard,
  about: 'A hiring campaign: title, status and a More info button, then its numbers in equal columns.',
  rows: ONE,
  columns: ONE,
  controls: [text('title'), select('status', STATUSES), toggle('showStatus'), toggle('showButton')],
  initial: { title: 'Senior DevOps', status: 'on-track', showStatus: true, showButton: true },
  width: 'w-5/6',
}

const PROJECT_CARD = {
  name: 'ProjectCard',
  label: 'Project card',
  Component: ProjectCard,
  about: 'A project in a profile: the description and its technologies as static Tags (yellow or green).',
  rows: [
    { label: 'yellow tags', props: { tagColor: 'yellow' } },
    { label: 'green tags', props: { tagColor: 'green' } },
  ],
  columns: ONE,
  controls: [
    [double(text('description')), select('tagColor', ['yellow', 'green'], 'tag color')],
    [text('tag1', 'tag 1'), text('tag2', 'tag 2'), text('tag3', 'tag 3'), text('tag4', 'tag 4')],
  ],
  initial: {
    description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
    tag1: 'React',
    tag2: 'Node.js',
    tag3: 'MongoDB',
    tag4: 'WebSocket',
    tagColor: 'yellow',
  },
  controlGrid: 4, // controls on 4 equal columns: description = tag 1–2, tag color = tag 3
  // Empty tag fields are left out.
  toProps: ({ tag1, tag2, tag3, tag4, ...p }) => ({ ...p, tags: [tag1, tag2, tag3, tag4].map(t => t.trim()).filter(Boolean) }),
  width: 'w-5/6',
}

const EXPERIENCE_ITEM = {
  name: 'ExperienceItem',
  label: 'Experience item',
  Component: ExperienceItem,
  about: 'A job in a CV: period, role, company and what was done.',
  rows: ONE,
  columns: ONE,
  controls: [[text('period'), text('title'), text('company')], [{ ...double(text('description')), span: 3 }]],
  controlGrid: 3, // 3 equal columns filling the space after the title; description spans all 3
  controlFill: true,
  initial: {
    period: 'Jan 2022 — Present (3 years)',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    description: 'Led development of React applications, mentored junior developers, improved performance by 40%',
  },
  width: 'w-5/6',
}

const TEAM_CARD = {
  name: 'TeamCard',
  label: 'Team card',
  Component: TeamCard,
  about: 'A team: size, productivity, the week’s highlight and its members ("+N more" counts the rest).',
  rows: ONE,
  columns: ONE,
  controls: [text('name'), number('people'), number('productivity', 'productivity %'), double(text('highlight'))],
  initial: { name: 'Engineering Team', people: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week' },
  width: 'w-5/9',
}

const METRIC_CARD = {
  name: 'MetricCard',
  label: 'Metric card',
  Component: MetricCard,
  about: 'A metric with a small chart on a green card; MiniChart’s overlay bars tint the green.',
  rows: ONE,
  columns: ONE,
  controls: [text('title'), number('first', 'bar 1 (0–100)'), number('second', 'bar 2 (0–100)'), text('summary')],
  initial: { title: 'Health', first: 100, second: 58, summary: 'Overall: Good' },
  toProps: ({ first, second, ...p }) => ({ ...p, values: [first, second] }),
  width: 'w-2/9',
}

const STAT_CARD = {
  name: 'StatCard',
  label: 'Stat card',
  Component: StatCard,
  about: 'One big number with its title and what it counts.',
  rows: ONE,
  columns: ONE,
  controls: [text('title'), text('value'), text('label')],
  initial: { title: 'Applications', value: '142', label: 'Total received' },
  width: 'w-1/3',
}

const ATTEMPT_CARD = {
  name: 'AttemptCard',
  label: 'Attempt card',
  Component: AttemptCard,
  about: 'A salary negotiation round: the starting offer and the counter-offer with their perks. first shows the round’s status; next has unknown amounts.',
  rows: ['first', 'next'].map(a => ({ label: a, props: { attempt: a } })),
  columns: ONE,
  controls: [select('attempt', ['first', 'next']), { ...select('status', STATUSES), enabled: p => p.attempt === 'first' }],
  initial: { attempt: 'first', status: 'failing' },
  toProps: p => ({ ...p, statusLabel: p.status === 'failing' ? 'Failed' : undefined }),
  width: 'w-full',
}

const NOTIFICATION = {
  name: 'Notification',
  label: 'Notification',
  Component: Notification,
  about: 'A highlighted update in large pixel type; with showButton, an on-color More info button below.',
  rows: [
    { label: 'default', props: {} },
    { label: 'showButton', props: { showButton: true } },
  ],
  columns: ONE,
  controls: [double(text('message')), toggle('showButton')],
  initial: {
    message: 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
    showButton: false,
  },
  width: 'w-full',
}

const BREADCRUMBS = {
  name: 'Breadcrumbs',
  label: 'Breadcrumbs',
  Component: Breadcrumbs,
  about: 'The path to the current page (SubHeader): TextLinks separated by "•"; the last item is the current page. In a mobile page only the current page shows. New in v0.5.0.',
  rows: [{ label: 'default', props: { items: breadcrumbs.candidate } }],
  columns: ONE,
  controls: [select('path', ['candidate', 'campaign', 'teams'])],
  initial: { path: 'candidate' },
  toProps: ({ path }) => ({ items: breadcrumbs[path] }),
  snippetNames: { items: 'breadcrumbs' },
}

const STAGE_PROGRESS = {
  name: 'StageProgress',
  label: 'Stage progress',
  Component: StageProgress,
  about: 'A ProgressBar with its stages under it in equal columns (Header, the candidate’s development). In a mobile page the labels become "Stage 7 of 9: Minus one". New in v0.5.0.',
  rows: [
    { label: 'lg · career', props: { stages: careerStages, value: 45 } },
    { label: 'sm · accent · development', props: { stages: developmentStages, value: 60, size: 'sm', tone: 'accent' } },
  ],
  columns: ONE,
  controls: [select('stages', ['career', 'development']), select('size', ['lg', 'sm']), select('tone', ['default', 'accent']), number('value', 'value (0–100)')],
  initial: { stages: 'career', size: 'lg', tone: 'default', value: 45 },
  toProps: p => ({ ...p, stages: p.stages === 'career' ? careerStages : developmentStages }),
  defaults: { size: 'lg', tone: 'default' },
  snippetNames: { stages: 'stages' },
  wide: true,
}

// Pages under /ds-dev/molecules/<slug>, in the order of the Figma molecules frame (then the new ones).
export const MOLECULE_PAGES = withAbout([
  { slug: 'profile-card', label: 'Profile card', uses: [A.avatar, A.status, A.progressBar], parts: [PROFILE_CARD] },
  { slug: 'automation-node', label: 'Automation node', uses: [A.icon], parts: [AUTOMATION_NODE] },
  { slug: 'campaign-card', label: 'Campaign card', uses: [A.status, A.button], parts: [CAMPAIGN_CARD] },
  { slug: 'project-card', label: 'Project card', uses: [A.tag], parts: [PROJECT_CARD] },
  { slug: 'experience-item', label: 'Experience item', parts: [EXPERIENCE_ITEM] },
  { slug: 'team-card', label: 'Team card', uses: [A.progressBar, A.avatarGroup], parts: [TEAM_CARD] },
  { slug: 'metric-card', label: 'Metric card', uses: [A.miniChart], parts: [METRIC_CARD] },
  { slug: 'stat-card', label: 'Stat card', parts: [STAT_CARD] },
  { slug: 'attempt-card', label: 'Attempt card', uses: [A.status], parts: [ATTEMPT_CARD] },
  { slug: 'notification', label: 'Notification', uses: [A.button], parts: [NOTIFICATION] },
  { slug: 'breadcrumbs', label: 'Breadcrumbs', uses: [A.textLink], parts: [BREADCRUMBS] },
  { slug: 'stage-progress', label: 'Stage progress', uses: [A.progressBar], parts: [STAGE_PROGRESS] },
])

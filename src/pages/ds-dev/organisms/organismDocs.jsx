import { Header, HeroCard, HeroSection, KanbanBoard, SubHeader, TaskItem, TopMenu } from '../../../components/organisms'
import { breadcrumbs, topMenuTabs, userLinks } from '../../../data/navigation'
import { candidateHero, teamsHero } from '../../../data/heroes'
import { pipeline } from '../../../data/pipeline'
import { careerStages } from '../../../data/stages'
import { campaignTasks } from '../../../data/tasks'
import { ONE, select, text, toggle, withAbout } from '../docs/docHelpers'

// Docs for each organism (the format is described in ../docs/docHelpers.js). Organisms are shown in a
// page frame (`frame`): desktop in the grid, Desktop / Tablet / Mobile in the playground. Content comes
// from src/data, as the site will pass it.
const topMenu = { tabs: topMenuTabs, links: userLinks }
const header = activeTab => ({
  topMenu: { ...topMenu, activeTab },
  subHeader: { breadcrumbs: breadcrumbs.candidate },
  progress: { stages: careerStages, value: 45 },
})

// Room for the open mobile menu panel in the TopMenu and Header previews (indents/XXL × 4 = 336px).
const MENU_ROOM = 'calc(var(--indents-xxl) * 4)'

// "Uses" links: atoms, molecules and organisms.
const U = {
  button: { slug: 'button', label: 'Button' },
  dropdown: { slug: 'dropdown', label: 'Dropdown' },
  errorMessage: { slug: 'error-message', label: 'ErrorMessage' },
  flag: { slug: 'flag', label: 'Flag' },
  logo: { slug: 'logo', label: 'Logo' },
  navTab: { slug: 'nav-tab', label: 'NavTab' },
  textLink: { slug: 'text-link', label: 'TextLink' },
  toggleGroup: { slug: 'tabs', label: 'ToggleButtonGroup' },
  breadcrumbs: { group: 'molecules', slug: 'breadcrumbs', label: 'Breadcrumbs' },
  profileCard: { group: 'molecules', slug: 'profile-card', label: 'ProfileCard' },
  stageProgress: { group: 'molecules', slug: 'stage-progress', label: 'StageProgress' },
  topMenu: { group: 'organisms', slug: 'top-menu', label: 'TopMenu' },
  subHeader: { group: 'organisms', slug: 'sub-header', label: 'SubHeader' },
  header: { group: 'organisms', slug: 'header', label: 'Header' },
  heroCard: { group: 'organisms', slug: 'hero-card', label: 'HeroCard' },
}

const TOP_MENU = {
  name: 'TopMenu',
  label: 'Top menu',
  Component: TopMenu,
  about: 'The top bar: logo, Generate report, the tabs (the current page outlined) and the user’s links. Tablet: tighter gaps. Mobile: the logo and a Menu button opening a panel (closes on Escape, a click outside or a link).',
  rows: ['all-teams', 'templates', 'none'].map(t => ({ label: `activeTab ${t}`, props: { ...topMenu, activeTab: t } })),
  columns: ONE,
  controls: [select('activeTab', ['all-teams', 'templates', 'none'])],
  initial: { activeTab: 'all-teams' },
  toProps: p => ({ ...p, ...topMenu }),
  defaults: { activeTab: 'all-teams' },
  snippetNames: { tabs: 'topMenuTabs', links: 'userLinks' },
  frame: true,
  frameMinHeight: MENU_ROOM,
}

const SUB_HEADER = {
  name: 'SubHeader',
  label: 'Subheader',
  Component: SubHeader,
  about: 'The row under TopMenu. default: Back (outlined) and the breadcrumbs; builder: Back, Save and Deploy. Mobile: the breadcrumbs show only the current page.',
  rows: ['default', 'builder'].map(v => ({ label: v, props: { variant: v, breadcrumbs: breadcrumbs.candidate } })),
  columns: ONE,
  controls: [select('variant', ['default', 'builder'])],
  initial: { variant: 'default' },
  toProps: p => ({ ...p, breadcrumbs: breadcrumbs.candidate }),
  defaults: { variant: 'default' },
  snippetNames: { breadcrumbs: 'breadcrumbs' },
  frame: true,
}

const HEADER = {
  name: 'Header',
  label: 'Header',
  Component: Header,
  about: 'The page header: TopMenu, SubHeader and the stage progress. No fill, so it can sit on HeroSection’s backdrop.',
  rows: [
    { label: 'default', props: header('all-teams') },
    { label: 'showProgress false', props: { ...header('all-teams'), showProgress: false } },
    { label: 'showSubHeader false · showProgress false', props: { ...header('all-teams'), showSubHeader: false, showProgress: false } },
  ],
  columns: ONE,
  controls: [toggle('showSubHeader'), toggle('showProgress'), select('activeTab', ['all-teams', 'templates', 'none'])],
  initial: { showSubHeader: true, showProgress: true, activeTab: 'all-teams' },
  toProps: ({ activeTab, ...p }) => ({ ...p, ...header(activeTab) }),
  defaults: { showSubHeader: true, showProgress: true },
  snippetNames: { topMenu: 'topMenu', subHeader: 'subHeader', progress: 'progress' },
  frame: true,
  frameMinHeight: MENU_ROOM,
}

// The all-teams pages (backdrop, no-bg hero) and the candidate pages (with-bg hero).
const HERO_TAB = { 'no-bg': 'all-teams', 'with-bg': 'none' }
const HERO_CONTENT = { 'no-bg': teamsHero, 'with-bg': candidateHero }

const HERO_SECTION = {
  name: 'HeroSection',
  label: 'Hero section',
  Component: HeroSection,
  about: 'The top of a page: Header, then the hero at the bottom of a 660px area. showBackground adds the full-width backdrop behind both (with the "no-bg" hero); without it, use the "with-bg" hero. Mobile: no minimum height.',
  rows: [
    { label: 'showBackground · no-bg hero', props: { header: header('all-teams'), hero: teamsHero, showProgress: false } },
    { label: 'showBackground false · with-bg hero', props: { showBackground: false, heroVariant: 'with-bg', header: header('none'), hero: candidateHero } },
  ],
  columns: ONE,
  controls: [
    [toggle('showBackground'), select('heroVariant', ['no-bg', 'with-bg']), toggle('showActions')],
    [toggle('showSubHeader'), toggle('showProgress')],
  ],
  initial: { showBackground: true, heroVariant: 'no-bg', showActions: true, showSubHeader: true, showProgress: false },
  toProps: p => ({ ...p, header: header(HERO_TAB[p.heroVariant]), hero: HERO_CONTENT[p.heroVariant] }),
  defaults: { showBackground: true, heroVariant: 'no-bg', showActions: true, showSubHeader: true, showProgress: true },
  snippetNames: { header: 'header', hero: 'hero' },
  frame: true,
}

const HERO_CARD = {
  name: 'HeroCard',
  label: 'Hero card',
  Component: HeroCard,
  about: 'The hero: title (the page’s h1), subtitle and actions. with-bg: the yellow photo card with editable tags ("Add" adds a dropdown); no-bg: transparent, with the team switcher, for HeroSection’s backdrop.',
  rows: [
    { label: 'with-bg', props: { variant: 'with-bg', ...candidateHero } },
    { label: 'no-bg', props: { variant: 'no-bg', ...teamsHero } },
  ],
  columns: ONE,
  controls: [select('variant', ['with-bg', 'no-bg']), toggle('showActions'), text('title'), text('subtitle')],
  initial: { variant: 'with-bg', showActions: true, title: candidateHero.title, subtitle: candidateHero.subtitle },
  toProps: p => ({ ...HERO_CONTENT[p.variant], ...p }),
  bind: (p, set) => (p.variant === 'no-bg' ? { onTeamChange: team => set({ ...p, team }) } : {}),
  defaults: { variant: 'with-bg', showActions: true },
  snippetNames: { actions: 'hero.actions', tags: 'hero.tags', endTags: 'hero.endTags', labels: 'hero.labels', teams: 'hero.teams' },
  frame: true,
}

const KANBAN_BOARD = {
  name: 'KanbanBoard',
  label: 'Kanban board',
  Component: KanbanBoard,
  about: 'The hiring pipeline: a title, then one column per stage with its count and people (each a link). 4 columns, 2 on tablet, 1 on mobile.',
  rows: [{ label: 'default', props: { columns: pipeline } }],
  columns: ONE,
  controls: [text('title')],
  initial: { title: 'Pipeline' },
  toProps: p => ({ ...p, columns: pipeline }),
  defaults: { title: 'Pipeline' },
  snippetNames: { columns: 'pipeline' },
  frame: true,
}

const TASK_ITEM = {
  name: 'TaskItem',
  label: 'Task item',
  Component: TaskItem,
  about: 'A task in a checklist. default = done (filled flag, grey title), active = to do; the flag switches it. Optional error and button.',
  rows: [
    { label: 'default (done)', props: campaignTasks[1] },
    { label: 'active (to do)', props: { ...campaignTasks[1], state: 'active' } },
  ],
  columns: ONE,
  controls: [[select('state', ['default', 'active']), toggle('showButton'), toggle('showError')], [{ ...text('title'), double: true }]],
  initial: { state: 'active', showButton: true, showError: true, title: campaignTasks[1].title },
  toProps: p => ({ ...campaignTasks[1], ...p }),
  bind: (p, set) => ({ onToggle: state => set({ ...p, state }) }),
  defaults: { state: 'default', showButton: true, showError: true },
  frame: true,
}

// Pages under /ds-dev/organisms/<slug>, in the order of the Figma organisms frame (then HeroSection).
export const ORGANISM_PAGES = withAbout([
  { slug: 'top-menu', label: 'Top menu', uses: [U.logo, U.button, U.navTab, U.textLink], parts: [TOP_MENU] },
  { slug: 'sub-header', label: 'Subheader', uses: [U.button, U.breadcrumbs], parts: [SUB_HEADER] },
  { slug: 'header', label: 'Header', uses: [U.topMenu, U.subHeader, U.stageProgress], parts: [HEADER] },
  { slug: 'hero-section', label: 'Hero section', uses: [U.header, U.heroCard], parts: [HERO_SECTION] },
  { slug: 'hero-card', label: 'Hero card', uses: [U.button, U.dropdown, U.toggleGroup], parts: [HERO_CARD] },
  { slug: 'kanban-board', label: 'Kanban board', uses: [U.profileCard], parts: [KANBAN_BOARD] },
  { slug: 'task-item', label: 'Task item', uses: [U.flag, U.errorMessage, U.button], parts: [TASK_ITEM] },
])

import {
  CardGrid,
  AchievementsCard,
  DevelopmentCard,
  DocumentList,
  Header,
  HeroCard,
  HeroSection,
  KanbanBoard,
  PageTitle,
  PeopleList,
  SubHeader,
  TeamSummary,
  TopMenu,
} from '../../../components/organisms'
import { breadcrumbs, tabsFor, userLinks } from '../../../data/navigation'
import { candidateHero, homeHero, publishedBackground, publishedHero, teamsHero } from '../../../data/heroes'
import { pipeline } from '../../../data/pipeline'
import { careerStages } from '../../../data/stages'
import { teamMetrics } from '../../../data/metrics'
import { campaignById, campaignStatsOf, campaignsOf, teams } from '../../../data/teams'
import { allEmployees, employeeFilters } from '../../../data/people'
import { templateTypeByView, templates } from '../../../data/templates'
import { personProfile } from '../../../data/profiles'
import { number, ONE, select, text, toggle, withAbout } from '../docs/docHelpers'

// Docs for each organism (the format is described in ../docs/docHelpers.js). Organisms are shown in a
// page frame (`frame`): desktop in the grid, Desktop / Tablet / Mobile in the playground. Content comes
// from src/data, as the site will pass it.
// The selected tab is a control here (TAB_OPTIONS); on the site the page sets it.
const TAB_OPTIONS = ['all-teams', 'templates', 'none']
const topMenu = tab => ({ tabs: tabsFor(tab), links: userLinks })
const header = tab => ({
  topMenu: topMenu(tab),
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
  metricCard: { group: 'molecules', slug: 'metric-card', label: 'MetricCard' },
  teamCard: { group: 'molecules', slug: 'team-card', label: 'TeamCard' },
  documentRow: { slug: 'document-row', label: 'DocumentRow' },
  notification: { group: 'molecules', slug: 'notification', label: 'Notification' },
  campaignCard: { group: 'molecules', slug: 'campaign-card', label: 'CampaignCard' },
  statCard: { group: 'molecules', slug: 'stat-card', label: 'StatCard' },
  textInput: { slug: 'input', label: 'TextInput' },
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
  about: 'The top bar: logo, Generate report, the tabs and the user’s links. One component; the current tab is set on its NavTab (each tab’s selected). Tablet: tighter gaps. Mobile: the logo and a Menu button opening a panel (closes on Escape, a click outside or a link).',
  rows: [{ label: 'default (All teams selected)', props: topMenu('all-teams') }],
  columns: ONE,
  controls: [select('selectedTab', TAB_OPTIONS, 'selected tab')],
  initial: { selectedTab: 'all-teams' },
  toProps: ({ selectedTab }) => topMenu(selectedTab),
  snippetNames: { tabs: 'tabs', links: 'userLinks' },
  frame: true,
  frameMinHeight: MENU_ROOM,
}

const SUB_HEADER = {
  name: 'SubHeader',
  label: 'Subheader',
  Component: SubHeader,
  about: 'The row under TopMenu. default: Back (outlined) and the breadcrumbs; builder: Back, Save and Deploy. showBack off hides Back (the home page). Mobile: the breadcrumbs show only the current page.',
  rows: [
    ...['default', 'builder'].map(v => ({ label: v, props: { variant: v, breadcrumbs: breadcrumbs.candidate } })),
    { label: 'default · showBack false', props: { showBack: false, breadcrumbs: breadcrumbs.candidate } },
  ],
  columns: ONE,
  controls: [select('variant', ['default', 'builder']), toggle('showBack')],
  initial: { variant: 'default', showBack: true },
  toProps: p => ({ ...p, breadcrumbs: breadcrumbs.candidate }),
  defaults: { variant: 'default', showBack: true },
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
  controls: [toggle('showSubHeader'), toggle('showProgress'), select('selectedTab', TAB_OPTIONS, 'selected tab')],
  initial: { showSubHeader: true, showProgress: true, selectedTab: 'all-teams' },
  toProps: ({ selectedTab, ...p }) => ({ ...p, ...header(selectedTab) }),
  defaults: { showSubHeader: true, showProgress: true },
  snippetNames: { topMenu: 'topMenu', subHeader: 'subHeader', progress: 'progress' },
  frame: true,
  frameMinHeight: MENU_ROOM,
}

// The all-teams pages (backdrop, no-bg hero) and the candidate pages (with-bg hero).
const HERO_TAB = { 'no-bg': 'all-teams', 'with-bg': 'none', homepage: 'none' }
const HERO_CONTENT = { 'no-bg': teamsHero, 'with-bg': candidateHero, homepage: homeHero }

const HERO_SECTION = {
  name: 'HeroSection',
  label: 'Hero section',
  Component: HeroSection,
  about: 'The top of a page: Header, then the hero at the bottom of a 660px area (size full: the window’s height, the hero centered, no fade). showBackground adds the full-width backdrop behind both (with the "no-bg" hero); without it, use the "with-bg" hero. Mobile: no minimum height.',
  rows: [
    { label: 'showBackground · no-bg hero', props: { header: header('all-teams'), hero: teamsHero, showProgress: false } },
    { label: 'showBackground false · with-bg hero', props: { showBackground: false, heroVariant: 'with-bg', header: header('none'), hero: candidateHero } },
    { label: 'size full · homepage hero (the success page)', props: { size: 'full', background: publishedBackground, heroVariant: 'homepage', showSubHeader: false, showProgress: false, header: header('none'), hero: publishedHero } },
    { label: 'showBackground · homepage hero', props: { heroVariant: 'homepage', header: { ...header('none'), subHeader: { showBack: false, breadcrumbs: [{ label: 'Home', href: '/' }] } }, hero: homeHero, showProgress: false } },
  ],
  columns: ONE,
  controls: [toggle('showBackground'), select('heroVariant', ['no-bg', 'with-bg', 'homepage']), toggle('showActions'), toggle('showSubHeader'), toggle('showProgress')],
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
  about: 'The hero: title (the page’s h1), subtitle and actions. with-bg: the yellow photo card with editable tags ("Add" adds a dropdown); no-bg: transparent, with the team switcher, for HeroSection’s backdrop; homepage: transparent, the content centered, large buttons (the Homepage).',
  rows: [
    { label: 'with-bg', props: { variant: 'with-bg', ...candidateHero } },
    { label: 'no-bg', props: { variant: 'no-bg', ...teamsHero } },
    { label: 'homepage', props: { variant: 'homepage', ...homeHero } },
  ],
  columns: ONE,
  controls: [select('variant', ['with-bg', 'no-bg', 'homepage']), toggle('showActions'), text('title'), text('subtitle')],
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


// The site links each card to its team page; here they link to the site too.
const linkedTeams = teams.map(t => ({ id: t.id, name: t.name, people: t.people, productivity: t.productivity, highlight: t.highlight, members: t.members, href: `/teams/${t.id}` }))

// The site links each row to the person's page; here they link to the site too.
const listedPeople = allEmployees.map(p => ({ id: p.id, name: p.name, role: p.role, image: p.image, status: p.status, progress: p.progress, href: `/people/${p.id}` }))
const PEOPLE_LIST = {
  name: 'PeopleList',
  label: 'People list',
  Component: PeopleList,
  about: 'A card with an optional title (heading/h2, e.g. Team), optional filters (a small ToggleButtonGroup with its label on the left, a Dropdown on the right; with tooltip it has no action yet) and ProfileCard long rows, each a link to the person (overlay, focus ring). Mobile: the dropdown goes under the chips. New in v0.6.4 (Figma: the employees card on all-teams-employees).',
  rows: [
    { label: 'with title (a team page)', props: { title: 'Team', people: listedPeople.slice(0, 4) } },
    { label: 'with filters', props: { people: listedPeople, statusFilter: { ...employeeFilters.status, value: 'all' }, selectFilter: { ...employeeFilters.curator, tooltip: 'No action for now' } } },
  ],
  columns: ONE,
  controls: [select('status', employeeFilters.status.options.map(o => o.value)), toggle('showFilters')],
  initial: { status: 'all', showFilters: true },
  toProps: ({ status, showFilters }) => ({
    people: listedPeople.filter(p => status === 'all' || p.status === status),
    ...(showFilters && { statusFilter: { ...employeeFilters.status, value: status }, selectFilter: { ...employeeFilters.curator, tooltip: 'No action for now' } }),
  }),
  bind: (p, set) => ({ statusFilter: p.showFilters ? { ...employeeFilters.status, value: p.status, onChange: status => set({ ...p, status }) } : undefined }),
  snippetNames: { people: 'people', statusFilter: 'statusFilter', selectFilter: 'selectFilter' },
  frame: true,
}

const TEAM_SUMMARY = {
  name: 'TeamSummary',
  label: 'Team summary',
  Component: TeamSummary,
  about: 'A team’s update for the week: a Notification, full width; the message wraps. New in v0.6.6 (Figma: the summary on all-teams-one).',
  rows: [{ label: 'default', props: { message: teams[0].summary } }],
  columns: ONE,
  controls: [text('message')],
  initial: { message: teams[0].summary },
  frame: true,
}

const NO_ACTION_DOC = 'No action for now'
const ACHIEVEMENTS_CARD = {
  name: 'AchievementsCard',
  label: 'Achievements card',
  Component: AchievementsCard,
  about: 'A yellow card: title, the achievements spread across the width (2 × 2 on mobile) and a Button on-yellow. New in v0.6.7 (Figma: achievements on the candidate screen).',
  rows: [{ label: 'default', props: { achievements: personProfile.achievements.items, action: { label: 'All achievements', tooltip: NO_ACTION_DOC } } }],
  columns: ONE,
  controls: [text('title')],
  initial: { title: 'Achievements' },
  toProps: p => ({ ...p, achievements: personProfile.achievements.items, action: { label: 'All achievements', tooltip: NO_ACTION_DOC } }),
  snippetNames: { achievements: 'achievements', action: 'action' },
  frame: true,
}
const DEVELOPMENT_CARD = {
  name: 'DevelopmentCard',
  label: 'Development card',
  Component: DevelopmentCard,
  about: 'A white card: title, the stages (StageProgress), the next level, the prediction and a Button secondary. New in v0.6.7 (Figma: development on the candidate screen).',
  rows: [{ label: 'default', props: { title: personProfile.development.title, stages: personProfile.development.stages, value: personProfile.development.value, nextLevel: personProfile.development.nextLevel, prediction: personProfile.development.prediction, action: { label: 'More info', tooltip: NO_ACTION_DOC } } }],
  columns: ONE,
  controls: [number('value', 'value (0–100)'), text('nextLevel'), text('prediction')],
  initial: { value: 75, nextLevel: 'Lead Software Engineer', prediction: 'February 2026' },
  toProps: p => ({ ...p, stages: personProfile.development.stages, action: { label: 'More info', tooltip: NO_ACTION_DOC } }),
  snippetNames: { stages: 'developmentStages', action: 'action' },
  frame: true,
}
const listedCampaigns = campaignsOf('engineering').map(c => ({ id: c.id, title: c.title, status: c.status, statusLabel: c.statusLabel, stats: c.stats, href: `/campaigns/${c.id}` }))

const PAGE_TITLE = {
  name: 'PageTitle',
  label: 'Page title',
  Component: PageTitle,
  about: 'A page’s h1 when it has no hero: heading/h1, centered. New in v0.6.9 (Figma: the title on hiring-campaign-wizard).',
  rows: [{ label: 'default', props: { title: 'New Campaign' } }],
  columns: ONE,
  controls: [text('title')],
  initial: { title: 'New Campaign' },
  frame: true,
}
const sampleStats = campaignStatsOf(campaignById('forward-architect'))

const DOCUMENT_LIST = {
  name: 'DocumentList',
  label: 'Document list',
  Component: DocumentList,
  about: 'A card of DocumentRows (the templates list); editTooltip: the edit buttons have no action yet. Mobile: two-line rows. New in v0.6.5 (Figma: the document-list card on all-teams-templates).',
  rows: [{ label: 'default', props: { documents: templates.slice(0, 8), editTooltip: 'No action for now' } }],
  columns: ONE,
  controls: [select('type', ['all', 'automations', 'documents', 'access'])],
  initial: { type: 'all' },
  toProps: ({ type }) => ({ documents: templates.slice(0, 8).filter(t => !templateTypeByView[type] || t.type === templateTypeByView[type]), editTooltip: 'No action for now' }),
  snippetNames: { documents: 'templates' },
  frame: true,
}

// Pages under /ds-dev/organisms/<slug>, in the order of the Figma organisms frame, HeroCard before HeroSection.
const CARD_ITEMS = { metric: teamMetrics, stat: sampleStats, team: linkedTeams, campaign: listedCampaigns }
const CARD_GRID = {
  name: 'CardGrid',
  label: 'Card grid',
  Component: CardGrid,
  about: 'One kind of card, laid out for that kind, indents/2XS apart. card: metric (4 columns, 2 on mobile) | stat (one column each, 1 on mobile) | team (2 columns, 1 on mobile) | campaign (stacked). With href a card is a link (overlay on hover and pressed, focus ring); cardProps go to every card (e.g. buttonTooltip: More info has no action yet); emptyText when there are no items. New in v0.6.13, replacing MetricGrid, TeamGrid, StatGrid and CampaignList.',
  rows: [
    { label: 'metric', props: { card: 'metric', items: teamMetrics } },
    { label: 'stat', props: { card: 'stat', items: sampleStats } },
    { label: 'team', props: { card: 'team', items: linkedTeams } },
    { label: 'campaign', props: { card: 'campaign', items: listedCampaigns.slice(0, 2), cardProps: { buttonTooltip: 'No action for now' } } },
  ],
  columns: ONE,
  controls: [select('card', ['metric', 'stat', 'team', 'campaign'])],
  initial: { card: 'metric' },
  toProps: p => ({ card: p.card, items: CARD_ITEMS[p.card], ...(p.card === 'campaign' && { cardProps: { buttonTooltip: 'No action for now' } }) }),
  snippetNames: { items: 'items', cardProps: 'cardProps' },
  frame: true,
}

export const ORGANISM_PAGES = withAbout([
  { slug: 'top-menu', label: 'Top menu', uses: [U.logo, U.button, U.navTab, U.textLink], parts: [TOP_MENU] },
  { slug: 'sub-header', label: 'Subheader', uses: [U.button, U.breadcrumbs], parts: [SUB_HEADER] },
  { slug: 'header', label: 'Header', uses: [U.topMenu, U.subHeader, U.stageProgress], parts: [HEADER] },
  { slug: 'hero-card', label: 'Hero card', uses: [U.button, U.dropdown, U.toggleGroup], parts: [HERO_CARD] },
  { slug: 'hero-section', label: 'Hero section', uses: [U.header, U.heroCard], parts: [HERO_SECTION] },
  { slug: 'kanban-board', label: 'Kanban board', uses: [U.profileCard], parts: [KANBAN_BOARD] },
  { slug: 'card-grid', label: 'Card grid', uses: [U.metricCard, U.statCard, U.teamCard, U.campaignCard], parts: [CARD_GRID] },
  { slug: 'people-list', label: 'People list', uses: [U.toggleGroup, U.dropdown, U.profileCard], parts: [PEOPLE_LIST] },
  { slug: 'document-list', label: 'Document list', uses: [U.documentRow], parts: [DOCUMENT_LIST] },
  { slug: 'team-summary', label: 'Team summary', uses: [U.notification], parts: [TEAM_SUMMARY] },
  { slug: 'page-title', label: 'Page title', parts: [PAGE_TITLE] },
  { slug: 'achievements-card', label: 'Achievements card', uses: [U.button], parts: [ACHIEVEMENTS_CARD] },
  { slug: 'development-card', label: 'Development card', uses: [U.stageProgress, U.button], parts: [DEVELOPMENT_CARD] },
])

# Release notes

Figma → React migration of the design system.
Figma file: https://www.figma.com/design/dPIEJfY3Ma8tiCOcO9LXJO/design-system--forShare--Copy-

## v0.6.1 — Step 6, Part 1 refinements: unavailable elements, Employees connections (2026-10-11)

### Summary
Answers to the Part 1 open questions. Elements with no destination stay without pages: besides the "No action
for now" tooltip they now show the not-allowed cursor. The Employees list opens each person's page (new prototype
connections). The sample team names stay. Checked in headless Chrome: cursor, no hover overlay, tooltip by mouse
and keyboard on every no-action element; Employees → person → Back.

### Changed
- **Tooltip:** `unavailable` marks the wrapped element as having no action: `aria-disabled` (still focusable, so
  the tooltip shows on keyboard focus; screen readers announce it as unavailable), the not-allowed cursor, no hover
  overlay. Its colors don't change (it isn't the disabled state).
- **PRESSABLE:** `aria-disabled:cursor-not-allowed`, so every pressable atom shows the not-allowed cursor when marked
  unavailable.
- **TopMenu, SubHeader, HeroCard, ToggleButtonGroup:** an item with a `tooltip` is marked unavailable.
- **Employees** (`/employees`): the 10 ProfileCards open `/people/:personId?from=employees`; Back and the
  breadcrumbs on that page lead back to Employees.
- **docs/sitemap.md:** the new connections; the answered questions; CLAUDE.md rule 10 updated.

### Differences from Figma
- The "unavailable" look (cursor) and the Tooltip are code only.

### Open questions
- The popover (how it closes, what Generate does), the success screen's full-height backdrop, the parts that
  aren't components yet, the stray layers: see [docs/sitemap.md](docs/sitemap.md#open-questions).

## v0.6.0 — Step 6, Part 1: Site map and skeleton (2026-10-11)

### Summary
The site's skeleton: every page of the Figma `design` section has a route, a page file and the real top of the
page (TopMenu, SubHeader, progress or HeroSection) built from one shared place. All navigation from the prototype
works, plus Back, the breadcrumbs, the logo and the success page's "Homepage". The page content is a placeholder
for now: the page name, its Figma screen(s), what it will contain, where its elements lead (working links), and
the elements with no action yet. Every button or link that doesn't lead anywhere shows the tooltip "No action
for now" on hover and keyboard focus. The site map is in **[docs/sitemap.md](docs/sitemap.md)**: pages, routes,
screens, organisms and the full connection list. Checked in headless Chrome: every route, the 404 page, client-side
navigation (no reloads), scroll to top, tab titles, Back and breadcrumbs, tooltips by mouse and keyboard, no
sideways scroll at 1440 and 375, /ds-dev/ unchanged.

### Added
- **Pages and routes** (`src/pages/`, `src/App.jsx`):
  - `/` All teams (home), `/employees`, `/teams/:teamId`, `/teams/:teamId/campaigns`, `/templates`
  - `/campaigns/:campaignId`, `/campaigns/new`, `/campaigns/new/job-description`, `/campaigns/new/published`
  - `/people/:personId` (Figma: both `candidate` screens and `candidate-interviewed`: one template, the content
    depends on the stage), `/people/:personId/negotiate`
  - `?team=` / `?campaign=` keep where a page was opened from, for Back and the breadcrumbs.
  - The redirect from `/` to `/ds-dev/` is gone; /ds-dev/ stays at its URL.
- **Shared layout** (`src/site/`): `SiteLayout` (the page root: `@container/page`, up to `size/page`, client-side
  links, scroll to top on every page change), `SiteHeader` / `SiteHero` (the top of every page; one TopMenu, its
  current tab from the URL), `site.js` (`paths` for every route, `NO_ACTION`), `PagePlaceholder`. Each page sets
  its tab title ("Page · Hired & Wired"; React 19 `<title>`).
- **Navigation:** 14 prototype connections (41 elements) wired; Back to the parent page; breadcrumbs per page;
  logo and "Homepage" to `/`. Four inferred ones (same control as a connected one, listed in the site map):
  the All teams tab, the hero toggles Overview and Team back, Negotiate on the interview content.
- **Overlay:** the "Head line / Generate" popover on Job description (placeholder; opens from Preferred qualifications).
- **404:** a "Page not found" page for unknown URLs and unknown ids (`/teams/nope`).
- **Atom `Tooltip`** (code first, not in Figma): wraps one focusable element; accent/primary with text/on-accent,
  text/grotesk, radius/S; shown on hover and keyboard focus (`aria-describedby`); `align` start | center | end.
- **Data:** `people.js` (candidates and employees with unique ids), `teams.js` (teams and campaigns); page heroes
  in `heroes.js`; `pipeline.js` now built from `people.js`.

### Changed
- **SubHeader:** `showBack` (Figma "Show back"; off on the home page); `saveTooltip`, `deployTooltip`.
- **TopMenu:** `reportTooltip`; each link can have a `tooltip`, and a link without `href` is a button.
- **HeroCard:** each action can have a `tooltip`. **ToggleButtonGroup:** each option can have a `tooltip`.
- **TextLink:** without `href` it's a button (was a link to `#`).
- **Data:** the TopMenu tabs link to `/` and `/templates`; the user links (Profile, Log out) have no `href` yet.
- **Tab title:** set per page (removed from `index.html`; /ds-dev/ keeps "Misha DS").
- **CLAUDE.md:** the site files, rule 10 (site navigation); the page root rule now points at `SiteLayout`.

### Open questions
See [docs/sitemap.md → Open questions](docs/sitemap.md#open-questions). In short:
- **Missing connections and pages:** Report, Access, Profile, Log out, Generate report, the template views and
  rows, Add team / employee / template, and the candidate actions all show "No action for now". Should any of
  them get a page?
- **Employees list:** its ProfileCards have no connection; should they open the person's page?
- **Teams:** six identical "Engineering Team" cards in Figma; five sample names added, only Engineering has
  members and campaigns.
- **Popover:** how it closes, and what Generate does.
- **Missing organisms** (for Part 2): filter bar, Notification with avatars, achievements, next level /
  prediction, assessment results, offer form, skill input with tags, the popover, a title-only page header, the
  content section with a heading, and a full-height HeroSection for the success page.
- **Figma:** the Tooltip atom isn't in Figma yet; stray layers `Ellipse 12` and `Frame 1` in the design section.

## v0.5.1 — Step 5 refinements: TopMenu from Figma, organism playgrounds (2026-10-11)

### Summary
Review round after step 5. TopMenu follows the reworked Figma component: one component, no variants; the
current tab is set on the NavTabs inside. The organism playgrounds got a centered viewport switcher, more space
above it and single-row controls. Checked in headless Chrome: tab selection, switcher position, control rows.

### Changed
- **TopMenu** (Figma: `Top menu`, variants removed): `activeTab` is gone; each item of `tabs` has its own
  `selected` (Figma: the exposed NavTab property). `tabsFor(id)` in `data/navigation.js` builds the list with
  the current page's tab selected. "Generate report" is Button `secondary`, as in Figma (was `on-color`).
- **/ds-dev/ Organisms:**
  - The Desktop / Tablet / Mobile switcher is centered, with twice the space above it
    (`indents/S (inner)` × 2).
  - Top menu and Header playgrounds: a "selected tab" control (all-teams, templates, none); Top menu shows
    one row in the grid instead of three variants.
  - Hero section and Task item playgrounds: all controls in one row.
  - Submenu order: Hero card before Hero section.

### Differences from Figma
- None new.

### How to use
```jsx
import { tabsFor, userLinks } from './data/navigation'

<TopMenu tabs={tabsFor('all-teams')} links={userLinks} />
<TopMenu tabs={[{ label: 'All teams', href: '/teams', selected: true }, { label: 'All templates', href: '/templates' }]} />
```

## v0.5.0 — Step 5: Organisms (2026-10-11)

### Summary
The organisms of the Figma `ds-organisms` frame, plus the new HeroSection, are React components in
`src/components/organisms/`, built from molecules and atoms. They're fluid: they fill the width they're given,
up to `size/page` (1440) or, for HeroCard, `size/base-with` (830). Figma has desktop screens only, so tablet
and mobile follow the plan approved in the audit. Components respond to a **page container**
(`@container/page`), not the window. That lets the /ds-dev/ Organisms page show each one at Desktop 1440,
Tablet 768 and Mobile 375 without resizing the browser. New tokens (breakpoints, page and hero sizes, the
hero tint, the logo size, mobile text sizes), 3 new atoms, 2 new molecules and the approved molecule changes
for small screens. Sample content lives in `src/data/`. Checked in headless Chrome at 1440, 768 and 375:
nothing overflows; menus, flags, dropdowns and links work with mouse and keyboard.

### Added
- **Organisms** (all exported from `src/components/organisms/index.js`):
  - `TopMenu`: `tabs` [{ label, href, selected }], `links`, `logoHref`, `reportLabel`, `onGenerateReport`, `menuLabel`. One component in Figma (`Top menu`, no variants): the current tab is each NavTab's `selected` (`tabsFor(id)` in `data/navigation.js` builds the list). Logo, "Generate report" (Button secondary), NavTabs, TextLinks; divider/inverse below. Tablet: tighter gap after the logo. Mobile: logo + "Menu" button opening a panel (focus moves in; Escape, outside click or a link close it and focus returns; fades and slides with `duration/base`). Uses Logo, Button, NavTab, TextLink.
  - `SubHeader`: `variant` default | builder, `backLabel`, `backHref` / `onBack`, `breadcrumbs`, `saveLabel`, `deployLabel`, `onSave`, `onDeploy`. default: Back (Button on-color-outlined) + Breadcrumbs; builder: Back, Save, Deploy. Mobile: breadcrumbs show the current page only. Uses Button, Breadcrumbs.
  - `Header`: `showSubHeader`, `showProgress`, `topMenu`, `subHeader`, `progress` ({ stages, value }). TopMenu + SubHeader + StageProgress; no fill. Uses TopMenu, SubHeader, StageProgress.
  - `HeroSection` (new; in Figma as a component too): `showBackground`, `background`, `showSubHeader`, `showProgress`, `showActions`, `heroVariant`, `header`, `hero`. Header, then the hero at the bottom of a `size/hero` (660) area (Figma: Auto gap); `showBackground` adds the full-width backdrop fading into `bg/default`. Mobile: no minimum height. Uses Header, HeroCard.
  - `HeroCard`: `variant` with-bg | no-bg, `showActions`, `title` (the page's h1), `subtitle`, `labels`, `actions`, `tags`, `endTags`, `addLabel`, `onTagsChange`, `image`, `teams`, `team`, `onTeamChange`. with-bg: the yellow photo card; the tags are editable Dropdowns and "Add" (Button accent) adds an empty one to pick a value. no-bg: transparent, primary-sm actions, the team switcher (ToggleButtonGroup). Up to 830px, centered. Mobile: smaller gaps, no minimum height, tag groups stack. Uses Button, Dropdown, ToggleButtonGroup.
  - `KanbanBoard`: `title`, `columns` [{ id, title, people: [{ name, role, image, href }] }]. Title, then one column per stage with its count; people as ProfileCard short-outlined (`fill`), each a link (overlay, focus ring). 4 columns, 2 on tablet, 1 on mobile. Uses ProfileCard.
  - `TaskItem`: `state` default | active, `showButton`, `showError`, `title`, `errorMessage`, `buttonLabel`, `buttonHref` / `onButtonClick`, `onToggle`. default = done (filled Flag, grey title), active = to do (from the hiring-campaign-add screen); the Flag calls `onToggle` with the other state. Uses Flag, ErrorMessage, Button.
- **Atoms (approved):** `NavTab` (moved from the organisms frame: `selected`, `label`, `href`; a link with `aria-current`), `TextLink` (`href`, `current`; padded hit area that takes no room), `Logo` (`label`, `href`; new text style `heading/logo`). Button variants `on-color-outlined` (SubHeader's Back) and `accent` (HeroCard's Add).
- **Molecules (approved):** `Breadcrumbs` (`items`; TextLinks with "•", the last one current; mobile: current only), `StageProgress` (`stages`, `value`, `size`, `tone`; ProgressBar + equal stage labels; mobile: "Stage 7 of 9: Minus one").
- **Tokens:**
  - code and Figma: `color/colors/yellow-600` + `surface/hero-tint` (HeroCard's #FFB700 tint, now bound in Figma), `font-size/23` + `font/size/logo`, `size/1440` + `size/page`, `size/660` + `size/hero` (HeroSection and its background bound in Figma)
  - code only: breakpoints `tablet` 768 and `desktop` 1200 (media and container queries; Tailwind's defaults removed); preview widths `size/viewport-tablet` and `size/viewport-mobile`; mobile sizes for `heading/h1` (48/44), `heading/h2` (28/26) and `text/description` (20/18) in a mobile page.
- **Sample data** (`src/data/`): `navigation.js` (tabs, user links, breadcrumbs), `stages.js` (career and development stages), `pipeline.js` (the Kanban), `tasks.js` (the hiring checklist), `heroes.js` (candidate, campaign and all-teams heroes). Copy uses `nbsp()`.
- **Assets:** `src/assets/hero/backdrop.jpg` (2880px, 262 KB, from 9.9 MB) and `photo.jpg` (89 KB).
- **/ds-dev/:** an Organisms section like Atoms and Molecules. Each organism: variants (as desktop pages, scaled), a playground with a Desktop 1440 / Tablet 768 / Mobile 375 switcher (`docs/PageFrame.jsx`: a page container of that width, scaled to fit), the JSX snippet (sample data shown by name, e.g. `columns={pipeline}`), and the Uses line (atoms, molecules and organisms). New atom and molecule pages for the new components.

### Changed
- **Molecules (approved):** CampaignCard numbers 5 → 3 (tablet) → 2 (mobile) columns, header wraps; AttemptCard offers stack on mobile, status first; ProfileCard long puts the progress under the name on mobile, short gets `fill`; ProjectCard and TeamCard text goes full width on mobile.
- **Flag (bug fix, same rule as v0.3.1):** the disabled color and the checked/unchecked color no longer apply together.
- **Playground grids** switch to 2 columns under the new `desktop` breakpoint (was Tailwind's `xl`).
- **CLAUDE.md:** rule 9 (breakpoints, page container, max widths, side padding); organisms and data folders; step 5 done.

### Flagged for step 6
- **The page root needs `@container/page`,** or the responsive rules and mobile text sizes won't apply.
- **Page layouts** (from the screens): Header or HeroSection on top; content in the 830 column (`size/base-with`); KanbanBoard and backdrops at full width (`size/page`).
- **The success screen** is a full-screen HeroSection backdrop with centered content: needs a `size="full"` option (or its own layout).
- **The candidate screen** uses short ProfileCards in other colors (pink, green, violet, olive): a `color` option for ProfileCard.
- **Links and actions** are props; step 6 wires routes (`href`) and handlers.

### Differences from Figma
- **Fluid instead of fixed widths** (1440, 830, 692): organisms fill their container up to their max width.
- **Raw values → nearest tokens:**
  - SubHeader's 60px gap → `indents/XXL` (84)
  - KanbanBoard's 50px gap → `indents/XXL` (84), its 30px side padding → `indents/M` (20)
  - HeroCard's 160px gap → `indents/M` × 8, its 480px height → `indents/M` × 24 (minimum)
  - TaskItem's 10px gap → `indents/XS` + `indents/3XS`
  - NavTab's 10px padding → the same
- **Not in Figma yet** (the Figma tools can't load Akkurat or Pixform, so these need a hand or the local plugin):
  - the atoms TextLink and Logo, the molecules Breadcrumbs and StageProgress, the Button variants `on-color-outlined` and `accent`
  - the mobile text styles, and moving NavTab to the atoms section
  - from v0.4.0: the green Tag variant
- **TaskItem's ErrorMessage** fits its text; in Figma it's stretched to the title width (the atom has no full-width option).
- **TopMenu's mobile panel** (not designed): `bg/default` with `shadow-card`, items stacked.
- **Sample data:** subtitles and labels keep their Figma words; the "Some fields need your attention" message fixes Figma's "some field need your attention".

### How to use
```jsx
import { Header, HeroCard, HeroSection, KanbanBoard, SubHeader, TaskItem, TopMenu } from './components/organisms'
import { breadcrumbs, tabsFor, userLinks } from './data/navigation'
import { candidateHero, teamsHero } from './data/heroes'
import { pipeline } from './data/pipeline'
import { careerStages } from './data/stages'
import { campaignTasks } from './data/tasks'

const topMenu = { tabs: tabsFor('all-teams'), links: userLinks }

<div className="@container/page">  {/* the page root (step 6) */}
  <TopMenu {...topMenu} onGenerateReport={report} />
  <SubHeader breadcrumbs={breadcrumbs.candidate} backHref="/teams" />
  <SubHeader variant="builder" onSave={save} onDeploy={deploy} />
  <Header topMenu={topMenu} subHeader={{ breadcrumbs: breadcrumbs.candidate }} progress={{ stages: careerStages, value: 45 }} />
  <HeroSection header={{ topMenu }} hero={teamsHero} showProgress={false} />
  <HeroSection showBackground={false} heroVariant="with-bg" header={{ topMenu }} hero={candidateHero} />
  <HeroCard {...candidateHero} onTagsChange={saveTags} />
  <KanbanBoard columns={pipeline} />
  {campaignTasks.map(t => <TaskItem key={t.id} {...t} onToggle={state => setTaskState(t.id, state)} />)}
</div>
```
Docs: `/ds-dev/organisms`, or `/ds-dev/organisms/<organism>`, e.g. `/ds-dev/organisms/hero-section`.

## v0.4.1 — Step 4 refinements: Tag padding, playground layout, sidebar menu (2026-10-11)

### Summary
Review round after step 4. Tag got 20px side padding (code and Figma). The playgrounds got their code
snippets back, control rows, and a column grid on three panels. The /ds-dev/ sidebar got collapsible groups
with arrows, a fixed width and smooth expand / collapse. Checked in headless Chrome at 1400, 1200, 900, 700,
480 and 330px window sizes: alignment, baselines, menu behavior, scrolling, no sideways shift.

### Changed
- **Tag** (code and Figma): `indents/M` (20px) side padding. Figma: both variants and the set hug their
  content; the 9 tags with a fixed width on the `design` page and in ProjectCard now hug (labels fit).
- **/ds-dev/ sidebar:**
  - Atoms and Molecules are collapsible groups. The arrow (down when closed, up when open, the same icon
    turned 180°) and the title both open and close a group; opening by the title also goes to its page.
  - Opening a group closes the others, except the active one (holding the current page). A group closed that
    way collapses in 2 × `duration/base`; opening takes `duration/base`. Height and opacity animate (the new
    `collapsible` utility); nothing animates under `prefers-reduced-motion`.
  - After a group opens, the sidebar (not the page) scrolls so the whole group is visible, or its title sits
    at the top when it's taller than the sidebar; no scroll if it's already visible. On load, the active item
    is scrolled into view.
  - The selected fill covers the whole row (title and arrow); the arrow takes the title's light color.
  - **Sideways shift fixed.** Cause: the sidebar was as wide as its content, so its own scrollbar (appearing
    when the open submenus didn't fit the window) changed its width from 180 to 195px and moved the centered
    layout. Now it's a fixed 200px (`indents/M` × 10) with the scrollbar space always reserved
    (`scrollbar-stable`). The page already reserved its own scrollbar space.
- **Playgrounds:**
  - The JSX snippet is back under the preview, styled like the CSS variables on Colors and Spacing
    (`text/grotesk`, `text/secondary`); click to copy. Off switches, empty fields and props of disabled
    controls are left out.
  - Controls can come in rows (rows left-aligned with each other); the title shares the first row's value
    baseline.
  - Project card, Profile card and Experience item put their controls on a column grid (4, 3, 3 equal
    columns), so field edges line up across rows; Experience item's grid fills the width after the title.
    Under a 1280px window (Tailwind `xl`) they use 2 columns.
  - Project card: 4 separate tag fields; Team card: one row; Campaign card and Tag: fewer grid rows.
- **Uses lines:** `text/grotesk-bold` in `status/info` (purple/500).
- **MiniChart docs:** shown at 1/6 of the column (~138px, Figma 143px) instead of half.
- **`transition-state`** also animates `rotate` / `scale` / `translate` (Tailwind 4 sets them as their own properties).
- **`npm run check:classes`** now understands class names with `@`.

### Differences from Figma
- Still to do by hand in Figma: the green Tag variant (`variant=static, color=green`); see v0.4.0.

## v0.4.0 — Step 4: Molecules (2026-10-11)

### Summary
The 10 molecules of the Figma `ds-molecules` frame are React components in `src/components/molecules/`,
built only from atoms. They fill their container (no fixed widths), take their Figma texts as props, and use
tokens only. None has states of its own in Figma; the only interactive parts are Button atoms, which keep
the Button's hover, pressed, focus and disabled. Three atoms were changed first, with approval, in code and
Figma: ProgressBar `tone`, Tag colors and height, MiniChart's overlay bars. /ds-dev/ has a Molecules section
like Atoms. The plan is now 6 steps (5 organisms, 6 site).

### Added
- **Molecules** (all exported from `src/components/molecules/index.js`):
  - `ProfileCard`: `variant` long | short | short-outlined, `name`, `role`, `image` / `src`, `status`, `statusLabel`, `progress`. long is a list row (divider underneath) with status and an accent progress bar; short (`surface/tag-red`) and short-outlined (`surface/tag-neutral`) are chips that hug their content, avatar multiplied onto the fill. Name and role stay on one line (ellipsis). Uses Avatar, Status, ProgressBar.
  - `AutomationNode`: `title`, `event`. A flow step on `surface/card-red` with play and more icons (decorative for now) and two 10px ports (`icon/secondary` in, `icon/primary` out). Uses Icon.
  - `CampaignCard`: `title`, `status`, `statusLabel`, `showStatus`, `showButton`, `buttonLabel`, `onMoreInfo`, `stats` [{ value, label }]. Numbers in equal columns as `<dt>`/`<dd>`. Title on one line. Uses Status, Button (secondary).
  - `ProjectCard`: `description`, `tags`, `tagColor` yellow | green. Description wraps at 3/5 of the width; tags wrap. Uses Tag (static).
  - `ExperienceItem`: `period`, `title`, `company`, `description`. Divider on top; texts wrap.
  - `TeamCard`: `name`, `people`, `productivity`, `highlight`, `members`. "+N more" = people − members shown. Uses ProgressBar (accent), AvatarGroup.
  - `MetricCard`: `title`, `values`, `summary`. On `surface/card-green`. Uses MiniChart.
  - `StatCard`: `title`, `value`, `label`.
  - `AttemptCard`: `attempt` first | next, `title`, `start` / `end` { amount, perks }, `status`, `statusLabel`. first shows the Status ("Failed") between the offers; next has `$?` amounts. Uses Status.
  - `Notification`: `message`, `showButton`, `buttonLabel`, `onAction`. `text/description` in `status/success` on `status/success-bg`. Uses Button (on-color).
- **Atom changes (approved):**
  - `ProgressBar`: `tone` default | accent (`data/bar-filled-accent` + `data/bar-empty-accent`). Figma: new `tone` property, 4 accent variants; the bars inside ProfileCard and TeamCard now use `tone=accent`.
  - `Tag`: static is yellow (`surface/tag-yellow-bright`, yellow/200) or green (`surface/tag-green`, green/100) via `color`; red is gone. Every tag is 32px high (control tags grew from 24px). Figma: new `color` property (control = neutral, static = yellow), both variants 32px.
  - `MiniChart`: bars in `overlay/pressed` (25% black, multiplied), as in the Figma component. MetricCard's instance no longer overrides them with `data/chart-muted`.
- **/ds-dev/:**
  - Molecules: one scrolling page like Atoms (`/ds-dev/molecules/<molecule>`), with overview cards, a grid of variants, a playground with realistic content, and a "Uses" line linking to the atom pages. No code snippet (as for atoms).
  - The sidebar shows only the open section's submenu; the closed ones keep their width, so nothing shifts between sections.
  - The shared docs code moved to `src/pages/ds-dev/docs/` (page, overview, renderer, `docHelpers.js`).
- **CLAUDE.md:** the state rules (rule 5) now apply to every level; new rule 8: each level is built only from the level below.

### Flagged for step 5
- Nothing in the molecules frame is an organism. The organisms are elsewhere in the file: `Header`, `SubHeader`, `TopMenu`, `TaskItem`, `HeroCard`, `NavTab`, `KanbanBoard`.
- Cards will become links or clickable later, when screens need them (e.g. a profile card opening a candidate); then they follow rule 5.
- AutomationNode's play and more icons are decorative; making them buttons needs an icon-button atom (not in Figma yet).

### Differences from Figma
- **Widths:** molecules fill their container instead of Figma's fixed widths (701, 696, 462, 280, 274, 190, 830); inner fixed widths became fractions (ProjectCard description 3/5, TeamCard highlight 3/5, AttemptCard offers 3/8). On /ds-dev/ they're shown at about their Figma width.
- **ProfileCard short:** hugs its content (63px) instead of Figma's fixed 59px.
- **Raw values in Figma, tokens in code:** ExperienceItem's 8px gap → `indents/XS`; AutomationNode's port colors #979797 / black → `icon/secondary` / `icon/primary`; port size 10px → `indents/XS` + `indents/3XS`.
- **Typos fixed in sample content** (Figma unchanged): "recieved" → "received" (AutomationNode, StatCard), "in pgoress" → "in progress" (CampaignCard).
- **MetricCard chart:** darker than before (25% overlay instead of the muted multiply), as decided.
- **Single-line texts** (ProfileCard name and role, CampaignCard and TeamCard titles) end in an ellipsis when too long.
- **Not done in Figma yet:** the green Tag variant (`variant=static, color=green`). The Figma tools can't load Pixform, so duplicating the variant failed; it needs to be duplicated by hand (or with the local plugin). The 5 green tags on the `design` page still use the yellow variant with a green fill override, so they look right.

### How to use
```jsx
import { AttemptCard, AutomationNode, CampaignCard, ExperienceItem, MetricCard, Notification,
  ProfileCard, ProjectCard, StatCard, TeamCard } from './components/molecules'

<ProfileCard name="Sarah Johnson" role="Senior Developer" status="on-track" progress={86} />
<ProfileCard variant="short" name="Sarah Johnson" role="Senior Developer" />
<AutomationNode title="Start Trigger" event="New application received" />
<CampaignCard title="Senior DevOps" onMoreInfo={open} stats={[{ value: '142', label: 'Applied' }]} />
<ProjectCard description="Full-stack e-commerce solution" tags={['React', 'Node.js']} tagColor="green" />
<ExperienceItem period="Jan 2022 — Present" title="Senior Frontend Developer" company="TechCorp Solutions" />
<TeamCard name="Engineering Team" people={24} productivity={89} members={['katya', 'petya', 'dog']} />
<MetricCard title="Health" values={[100, 58]} summary="Overall: Good" />
<StatCard title="Applications" value="142" label="Total received" />
<AttemptCard attempt="first" start={{ amount: '$8 750', perks: ['Lead role'] }} end={{ amount: '$12 750', perks: ['Gym'] }} />
<Notification message="Sarah finalized the UX flows." showButton onAction={open} />
```
Docs: `/ds-dev/molecules`, or `/ds-dev/molecules/<molecule>`, e.g. `/ds-dev/molecules/team-card`.

## v0.3.1 — Step 3 refinements: atoms docs and disabled states (2026-10-11)

### Summary
Review round on the atoms. Disabled states are now consistent: every disabled Button is
`bg/disabled-bg` + `text/disabled`, and field labels go `text/disabled` too. Tag, ToggleButton and
ToggleButtonGroup no longer have a disabled state. The /ds-dev/ Atoms section is one scrolling page with
a submenu that follows the scroll, merged pages (Tabs, Input, Avatar), readable names, and playgrounds
that don't shift. Checked in headless Chrome: menu clicks, scroll sync, reload, back, every playground
option, disabled colors, baselines and gaps.

### Changed
- **Components:**
  - `Button`: disabled is the same for every variant (neutral/100 fill, neutral/300 text). The
    variant colors used to clash with the disabled ones, and Tailwind picked the winner by its own order.
  - `TextInput`, `TextArea`, `Dropdown`: the label turns `text/disabled` when disabled (same class-clash fix on the field).
  - `Dropdown`: the option under the pointer or arrow keys is `surface/tag-yellow-bright` (yellow/200),
    with no black overlay on options. The list doesn't highlight the selected option just because it opened.
  - `Tag`, `ToggleButton`, `ToggleButtonGroup`: no `disabled` prop or disabled state.
- **/ds-dev/ page:**
  - Sidebar: one list (the "Foundations" caption is gone). Atoms is an item with a submenu: Button, Input,
    Dropdown, Tabs, Mini chart, Progress bar, Status, Error message, Flag, Icon, Tag, Avatar, Document row.
  - Atoms is one scrolling page: overview cards, then every atom 160px apart (`indents/M` × 8). Clicking
    jumps to an atom, and scrolling updates the URL and the highlighted item.
  - Merged pages: Tabs (ToggleButtonGroup + ToggleButton), Input (TextInput + TextArea), Avatar
    (AvatarGroup + Avatar). Icon shows only the gallery of every icon.
  - Playground: a white card. Its controls sit on the title's line, flush right, and the title shares the
    values' baseline. Booleans are switches. Controls depending on other props are disabled (Button's
    sublabel outside node). The JSX snippet is gone. The preview has a fixed height and the controls a
    fixed width, so nothing shifts.
  - Spacing: half a section gap under the page description, `indents/X` between grid and playground everywhere.

### Differences from Figma
- The page names Tabs, Input and Avatar exist only in the docs; the components keep their Figma names.
- The playground switch (`src/pages/ds-dev/Switch.jsx`) is docs-only and isn't designed in Figma.
- Tag, ToggleButton and ToggleButtonGroup had a code-only disabled state in v0.3.0; it's removed.

### How to use
```jsx
<Button variant="primary-sm" disabled>Save</Button>   // same disabled look for every variant
<TextInput label="Name" disabled />                   // label and field both disabled
```
Docs: `/ds-dev/atoms` (scroll), or `/ds-dev/atoms/<atom>` to jump to one, e.g. `/ds-dev/atoms/tabs`.

## v0.3.0 — Step 3: Atoms (2026-10-10)

### Summary
All 16 Figma atoms are now React components in `src/components/atoms/`, with the Figma names and props.
Each has real hover, pressed, focus and disabled states and keyboard support, plus a `state` prop that
forces a state for the docs. They use tokens only. The 7 icons are SVG components in
`src/components/icons/`. New tokens: two overlay colors for hover and pressed (also added in Figma) and
three motion tokens (code only). The /ds-dev/ page has a new Atoms group with one page per atom (a grid
of variants × states, a playground and a copyable code snippet) and an Icons page. 31 keyboard and mouse
checks pass in headless Chrome (Tab, Enter, Space, arrows, Home/End, Esc, hover, press, click outside,
reduced motion), with no console errors.

### Added
- **Atoms** (all exported from `src/components/atoms/index.js`):
  - `Button`: `variant` primary-lg | primary-sm | secondary | on-color | node, `label` (or children), `sublabel`, `showSublabel` (node only), `disabled`, `state`, `href` (renders an `<a>`), `type`.
  - `ToggleButton`: `selected`, `size` lg | sm, `label`, `state`, `onClick` (`aria-pressed`). No disabled state.
  - `ToggleButtonGroup`: `options` [{ value, label }], `value`, `onChange`, `label`. No disabled state. A radio group: one Tab stop, and arrows, Home and End move the selection.
  - `Tag`: `variant` control (a button) | static (a span), `label`, `showIcon` (close icon, reads "Remove <label>"), `state`, `onClick`. No disabled state.
  - `Flag`: `checked`, `label` (for screen readers), `disabled`, `state`, `onClick` (`aria-pressed`).
  - `Status`: `status` growth | on-track | failing | stopped, `label`.
  - `ErrorMessage`: `message`, `prefix` (default "error!"); `role="alert"`.
  - `TextInput` / `TextArea`: `label`, `showLabel` (hidden labels stay readable for screen readers), `value` / `defaultValue`, `placeholder`, `onChange`, `disabled`, `state`; any other input attributes are passed through.
  - `Dropdown`: `variant` default | on-color, `filled` (optional; it follows from having a value), `label`, `showLabel`, `options`, `value` / `defaultValue`, `onChange`, `placeholder`, `disabled`, `state`. A select-only combobox: Enter, Space or the arrows open it; the arrows, Home and End move; Enter or Space picks; Esc or Tab closes; clicking outside closes it.
  - `Avatar`: `image` katya | dog | petya, or `src` + `alt`.
  - `AvatarGroup`: `images` (names or Avatar props), `label`.
  - `DocumentRow`: `title`, `type`, `author`, `date`, `editLabel`, `onEdit`.
  - `ProgressBar`: `size` sm | lg, `value` 0–100; `role="progressbar"`.
  - `MiniChart`: `values` (0–100 each, default [100, 58]), `label`; `role="img"`.
  - `Icon`: `name` play | user | more | arrow-down | close, `size`, `title`.
- **Icons:** `PlayIcon`, `UserIcon`, `MoreIcon`, `ArrowDownIcon`, `CloseIcon`, `BookmarkIcon` and `BookmarkFilledIcon` in `src/components/icons/`. Each takes `size` (px, default 16) and `title` (with a title it's announced, without one it's hidden from screen readers), and uses `currentColor`. `ICONS` maps the Figma names to the components. They're generated by `npm run icons` from `scripts/icons.figma.json`, the SVG export from Figma.
- **Tokens:**
  - Primitive `color/neutral/900-a15` (#00000026).
  - Tokens `overlay/hover` → 900-a15 and `overlay/pressed` → 900-a25, created in Figma as well.
  - Motion (code only, Figma has no motion variables): `--duration-fast` 120ms, `--duration-base` 200ms, `--ease-out` cubic-bezier(0.22, 1, 0.36, 1).
- **Interaction utilities** in `src/styles/interaction.css`:
  - `state-overlay`: hover and pressed lay a `::after` overlay on the control.
  - `focus-ring`: a `border/focus` outline, `indents/3XS` wide and offset.
  - `focus-ring-within`.
  - `transition-state`: color, background, border, outline, shadow and transform only, using the motion tokens.
  - Every transition is turned off under `prefers-reduced-motion: reduce`.
  - `data-state="hover|pressed|focus|disabled"` (set by the `state` prop) forces a state.
- **`trim-letter-spacing`** (`src/styles/text.css`): CSS adds letter spacing after the last character, Figma doesn't. It's applied to every control label, so the controls are exactly as wide as in Figma. The text styles now also set `--text-letter-spacing`.
- **Avatars:** `src/assets/avatars/katya.png`, `dog.png` and `petya.png` (120×120, so they stay sharp at 4×).
- **/ds-dev/:**
  - The sidebar is one list: Colors, Typography, Spacing, Radius, Effects and Atoms. Atoms has a submenu with 13 atoms: Button, Input (TextInput + TextArea), Dropdown, Tabs (ToggleButtonGroup + ToggleButton), Mini chart, Progress bar, Status, Error message, Flag, Icon, Tag, Avatar (AvatarGroup + Avatar), Document row. These names are for the docs only; the components keep their Figma names.
  - Atoms is one scrolling page (`src/pages/ds-dev/atoms/AtomsPage.jsx`): the overview cards, then every atom, 160px apart (`indents/M` × 8). A submenu item or card jumps to its atom; scrolling updates the URL and the highlighted submenu item (without adding to the back history).
  - The URL holds the page (`/ds-dev/atoms/button` …), and every `/ds-dev/*` path goes to this page.
  - For each component, an atom page has:
    - a labelled grid of variants × states
    - a playground in a white card, with its controls on the title's line, flush right; the title sits on the baseline of the values in the controls. A control can be disabled by the other props (Button's sublabel and showSublabel work only for node). Nothing shifts while you play: the preview is as tall as the tallest variant in the grid, and each Dropdown control is as wide as its longest option (invisible, inert copies size them). The controls are the atoms themselves: Dropdown for variants, TextInput for text, and for booleans a switch (`src/pages/ds-dev/Switch.jsx`, docs only, not a Figma atom: 36×20 track, 16px thumb, built from indents tokens)
  - The Icon page lists every icon component; click a component name or a Figma name to copy it.

### Differences from Figma
- **Hover, pressed, focus and disabled are new.** Figma has only the default state:
  - hover lays `overlay/hover` (15% black) over the control
  - pressed lays `overlay/pressed` (25% black) over it
  - focus shows the `border/focus` ring
  - disabled uses `bg/disabled-bg` (neutral/100) with `text/disabled` (neutral/300), the same for every variant (Tag, ToggleButton and ToggleButtonGroup have no disabled state); the labels of TextInput, TextArea and Dropdown turn `text/disabled` too
- **Fixed widths become hug or fill:**
  - These hug their content: Tag (Figma 58px fixed, code 52px, 78px with the icon), Dropdown (143 → 157), ErrorMessage (300px fixed).
  - These fill their container: TextInput and TextArea (106 and 178), DocumentRow, ProgressBar and MiniChart.
  - TextArea's height comes from `rows` (default 4), plus the label when it's shown. Figma's frame is a fixed 66px.
- **Values without a token are built from tokens with `calc()`** (`SIZE` in `atoms/shared.js`):
  - 32px control height = L + XS
  - 10px gap = XS + 3XS
  - 5px dot = 2XS − (−4XS)
  - 82px chart = XXL − 3XS
  - DocumentRow column widths: 114, 162 and 74px
  - DocumentRow bottom padding: 13px, so the 1px divider sits inside the 60px row as in Figma
- **Dropdown:** on-color with no value uses `opacity-50`, which is Figma's 50% layer opacity; there's no token for it. The open list isn't designed in Figma. It's a `surface/card` panel with `shadow-card` and `radius/S`, and its options reuse the field's text style and padding, with `surface/control` for the selected option. The option under the pointer or arrow keys is `surface/tag-yellow-bright` (yellow/200); it isn't highlighted just because the list opened on it.
- **Flag** is a 26×26 button (a 22px icon plus `indents/3XS` padding) instead of Figma's 26×18 frame, so the whole bookmark is clickable.
- **Button:** `cta` was dropped, as agreed in the audit, because `variant` covers every look. `href` was added for links.
- **Status "stopped"** reads "Stopped". In Figma that variant's text says "Failing", a copy-paste slip.
- **ErrorMessage** default text is "Something went wrong".
- **ProgressBar `value` is a percentage.** Figma's "75" variant is drawn 57% filled. The number of dots follows the width (5px dots, 2px apart).
- **New props for content that Figma hard-codes:** ToggleButtonGroup takes `options`/`value`/`onChange` (Figma has 5 buttons, 2 of them hidden), MiniChart takes `values` and AvatarGroup takes `images`.
- **`variant` props with a single value are left out.** Figma's only value for ErrorMessage, AvatarGroup, DocumentRow, TextArea, TextInput, MiniChart and ToggleButtonGroup is `default`.
- **Icons are temporary.** They're Apple SF Symbols outlines exported from Figma as SVG, and must be replaced before the site goes public (SF Symbols may only be used in Apple platform apps). The bookmark's 14×22 viewBox is padded to a centered 22×22 square.
- **Widths differ by about 1px** (primary-lg, ToggleButton sm) because of how the browser rounds text widths.

### How to use
```jsx
import { Button, ToggleButton, ToggleButtonGroup, Tag, Flag, Status, ErrorMessage, TextInput, TextArea,
  Dropdown, Avatar, AvatarGroup, DocumentRow, ProgressBar, MiniChart, Icon } from './components/atoms'
import { CloseIcon } from './components/icons'

<Button variant="primary-sm" onClick={save}>Save</Button>
<Button variant="node" sublabel="3 steps">Welcome flow</Button>
<ToggleButton selected={on} onClick={() => setOn(!on)} label="Team" />
<ToggleButtonGroup options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} value={range} onChange={setRange} label="Range" />
<Tag label="React" showIcon onClick={remove} />
<Flag checked={saved} onClick={() => setSaved(!saved)} label="Save project" />
<Status status="failing" />
<ErrorMessage message="Email is required" />
<TextInput label="name" value={name} onChange={e => setName(e.target.value)} />
<TextArea label="notes" defaultValue="" />
<Dropdown label="team" options={['frontend-team', 'backend-team']} value={team} onChange={setTeam} />
<Avatar image="petya" />
<AvatarGroup images={['katya', 'dog']} label="Reviewers" />
<DocumentRow title="Q3 plan" author="created by Alan" date="24.05.2025" onEdit={open} />
<ProgressBar size="lg" value={40} label="Upload" />
<MiniChart values={[80, 35]} label="Sign-ups" />
<Icon name="more" /> · <CloseIcon size={24} />
```
Docs: `/ds-dev/atoms/<atom>`, e.g. `/ds-dev/atoms/dropdown`. `state="hover"` (pressed, focus, disabled) forces a state, for docs and screenshots only.

## v0.2.1 — Spacing and radius renamed in Figma (2026-10-10)

### Summary
The spacing and radius primitives and some tokens were renamed in Figma (values and bindings
unchanged). Code and the /ds-dev/ page now use the new names. Every renamed variable still
resolves to the same px value, so nothing looks different.

### Changed
| Figma (old → new) | CSS variable (old → new) | Tailwind (old → new) |
|---|---|---|
| space/-sm → space/-8 | --space-neg-sm → --space-neg-8 | — |
| space/-xs → space/-1 | --space-neg-xs → --space-neg-1 | — |
| space/2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl → space/2, 4, 8, 14, 20, 24, 30, 84, 90 | --space-2xs … → --space-2 … | — |
| radius/XS, S, L, full → radius/4, 8, 12, 999 | --radius-xs … → --radius-4 … | — |
| indents/-(XS) → indents/-XS | --indents-neg-xs (same) | ml-indents-neg-xs (same) |
| indents/-1 → indents/-4XS | --indents-neg-1 → --indents-neg-4xs | ml-indents-neg-1 → ml-indents-neg-4xs |
| indents/XXXS → indents/3XS | --indents-xxxs → --indents-3xs | p-indents-xxxs → p-indents-3xs |
| indents/XXS → indents/2XS | --indents-xxs → --indents-2xs | p-indents-xxs → p-indents-2xs |
| indents/XXL- → indents/XXL | --indents-xxl-minus → --indents-xxl | p-indents-xxl-minus → p-indents-xxl |
| rounds/S, M, L, Over → radius/S, M, L, Over | --rounds-s … → --radius-s … | rounded-rounds-s … → rounded-radius-s … |

Unchanged: indents/XS, S (inner), M, L, X, XXL (out).

### Differences from Figma
- The "trailing - → -minus" naming rule is no longer needed (no Figma name ends in "-" now).
- Radius classes keep the group name (`rounded-radius-s`), because `rounded-s` and `rounded-l` are Tailwind's own corner utilities.

## v0.2.0 — Step 2: Styles and variables (2026-10-10)

### Summary
Set up the project (Vite + React in JSX, Tailwind CSS 4.3, react-router-dom, Git) and moved every
foundation from Figma into code: variables, text styles and the one shadow, read live from the file.
`src/styles/tokens.css` holds primitives as CSS variables, alias tokens that reference them with
`var()`, the Tailwind theme and text-style utilities. The /ds-dev/ page documents them and is built
with those same tokens. In the browser, all 9 text styles render with Figma's exact size, weight,
line height and letter spacing, with the real fonts loaded.

### Added
- **Primitives: 46** CSS variables: 21 colors, 11 space, 4 radius, 3 font families, 6 font sizes, 1 size.
- **Tokens: 78** alias CSS variables, Light mode: 53 colors, 11 spacing (`indents/*`), 4 radius (`rounds/*`),
  3 font families, 6 font sizes, 1 size. Every one is `var(--primitive)`; the alias chain is the same as in Figma.
- **Tailwind theme:** 53 color classes, 11 spacing keys, 4 radius keys, 3 font families, 1 width.
  Tailwind's own palette, spacing scale, radii, shadows and type scale are switched off.
- **Text styles: 9** `@utility` classes with exact px line heights and em letter spacing.
- **Effects: 1** shadow token (`--shadow-card`, class `shadow-card`).
- **Fonts:** Akkurat LL Cyr TT (Regular, Bold) and Pixform self-hosted from `src/assets/fonts/`;
  Instrument Serif and Inter (600) from Google Fonts.
- **/ds-dev/ page** (`/` redirects to it): a sidebar with Colors, Typography, Spacing, Radius and Effects.
  One section is shown at a time, and the URL holds it (`/ds-dev/colors` …), so refresh and back/forward work.
  Clicking a name copies its Tailwind class or CSS variable. Colors and typography show the values the
  browser actually computes, and the Typography section flags any mismatch with Figma.
- `CLAUDE.md` with the project rules; `npm run tokens` regenerates `tokens.css` from `src/ds/foundations.js`.

### Differences from Figma
- **CSS-safe names.** `/` and spaces become `-`, brackets are dropped, a negative value becomes `neg-`
  and a trailing `-` becomes `-minus`, all lowercase:
  `indents/S (inner)` → `--indents-s-inner`, `indents/-(XS)` → `--indents-neg-xs`, `space/-sm` → `--space-neg-sm`,
  `indents/XXL-` → `--indents-xxl-minus`, `indents/XXL (out)` → `--indents-xxl-out`, `font/size/text - gr` → `--font-size-text-gr`,
  `size/base with` → `--size-base-with` (the "with" typo is kept to stay 1:1).
- **Tailwind spacing and radius keys keep the Figma group** (`p-indents-m`, `rounded-rounds-s`). Short keys
  like `rounded-s` or `rounded-l` would clash with Tailwind's built-in side utilities.
- **`heading/H4` → `text-heading-h4`** (lowercase, like the other styles). Renaming the style in Figma to `heading/h4` is recommended.
- **No effect styles in Figma.** `--shadow-card` is the one drop shadow used in the designs (checklist panel:
  0 24 34 0, color `surface/shadow`). Not included: background blurs with radius 0 (no visible effect)
  and the glass blur inside the library `Frame 1` components.
- **Text box trim** (cap height on `heading/H4`) is not carried over: browser support is uneven, and the px line heights already match.
- **No variable in Figma** for `heading/h2` size (40), `text/pixel` size (10) or the `heading/H4` font (Inter),
  and none for any line height or letter spacing. These values are written directly in the text utilities.
- **Styles frame table text is out of date** compared with the styles (the code follows the styles):
  `text/grotesk` line height says 10 (style: 11 px); H3 weight says Semibold (style: Regular);
  H4 says Akkurat Semibold (style: Inter Semi Bold); the font column says "Akkurat LL Cyrillic" (font: Akkurat LL Cyr TT).
- **Hardcoded in the Figma Styles frame** (not variables): the 11 color swatches, the colors panel background,
  the SpacingScale bar colors and outline, and the table and spacing label text (no text style).
- `color/color/*` primitives were renamed to `color/colors/*` in Figma before this step.

### How to use
```jsx
<div className="rounded-rounds-l bg-surface-card p-indents-l shadow-card">
  <h2 className="text-heading-h2 text-text-primary">Senior DevOps</h2>
  <p className="text-text-caps text-text-secondary">applied</p>
  <button className="rounded-rounds-over bg-accent-primary px-indents-s-inner py-indents-xs text-text-pixel text-text-on-accent">More info</button>
</div>
```
```css
.custom { border-color: var(--border-default); gap: var(--indents-xs); }
```
Add or change a foundation: edit `src/ds/foundations.js`, then run `npm run tokens`.

## v0.1.0 — Step 1: Figma cleanup (2026-10-10)

### Summary
Audited both pages of the Figma file (Design, Cover). Renamed every local component, property,
variant value and layer to the code-friendly convention, and merged the two library duplicates
(`status`, `avatar`) into their local components. Variables, styles, page structure and layouts
were not touched. Each component set, screen, the styles section and the nav compared
byte-identical before and after (rendered PNG hash plus a per-instance override fingerprint,
63/63 areas, 1,002 instances).

Backup: version "Before step 1 cleanup" was saved manually in Figma version history before any change.

### Changed
- **Components renamed: 34** (33 component sets + 1 component), e.g. `btn` → `Button`,
  `card top` → `HeroCard`, `attemt` → `AttemptCard`, `canban` → `KanbanBoard`, `switch` → `ToggleButton`.
- **Properties renamed: 62.** **Variant values renamed: 57.**
- **Layers renamed: 2,562**
  - 1,929 inside components (1,602 of them are the dots of `ProgressBar`)
  - 632 in frames: 27 screens and 6 user-flow strips plus their contents, `section-nav`, color swatches
  - 1 on Cover (`Thumbnail` → `thumbnail`)
- Instances inside components and screens are named by role in kebab-case
  (e.g. `button`, `progress-bar`, `hero`, `profile-card`, `step`).

### Merged
| Kept | Removed | Instances swapped |
|---|---|---|
| local `Status` (was `status`) | library `status` (key `51bd9295…`) | 10 (nested in `ProfileCard` instances on `all-teams-employees` and `all-teams-one`; variant and text kept) |
| local `Avatar` (was `avatar`) | library `avatar` (key `ad293613…`) | 2 (`all-teams-one`) |

The library components still exist in their source library; this file no longer uses them.

### Not changed / needs my decision
- **Kept separate (decided):** `MetricCard` (chart) and `StatCard` (number), and `ToggleButton` and `NavTab`.
  They look similar but differ in content or style.
- **Library components `Frame 1` (page/system/state/done) and `Frame 5`:** used 24× and 13× (nested)
  only in the six `flow-*` user-flow strips. They can't be renamed from this file. They are
  documentation, not site UI, so they were left as they are.
- **Detached copies (not changed):**
  - `success` screen: background, title and buttons are a hand-built copy of `HeroCard` (`variant=image`).
  - `candidate`, `candidate-2`: `stage-progress` copies the progress block inside `Header`.
  - `candidate-interviewed`: 4× `skill-row` copy the progress row inside `TeamCard`.
  - `candidate`, `candidate-2`: 4× `achievement` cards repeat a pattern that has no component
    (a candidate for a new component).
  - `negotiate`: `salary-slider` is a one-off with no component.
- **Duplicate screens with identical content:** `hiring-campaign` / `-2`, `all-teams-campaigns` / `-2` / `-3`,
  `candidate` / `-2`, `automation-mail-editor` / `-2`. Only renamed with suffixes.
- **Stray layer:** a red circle `Ellipse 12` (86×86) loose in the `design` section. Not renamed or removed.
- **Typos in visible text (would change visuals, so left):** "recieved" (`AutomationNode`, `StatCard`),
  "in pgoress" (`CampaignCard`), "Febrary 2026" (`candidate`), "predicted approvement" (`negotiate`).
- **Placeholder text:** the default `message` of `ErrorMessage` is unprofessional
  ("add more money for salary, you dumb ass"). Replace it before React.
- **Single-value variant properties:** 16 sets only have `variant=default`. React can ignore this property.
- **Redundant property:** `Button.cta` is fully determined by `Button.variant`
  (`primary-sm`/`primary-lg` → `true`, others → `false`).

### Rename reference

#### Components
| Old | New | Section |
|---|---|---|
| bar | ProgressBar | atoms |
| avatar | Avatar | atoms |
| status | Status | atoms |
| icons | Icon | atoms |
| switch | ToggleButton | atoms |
| flag | Flag | atoms |
| tag | Tag | atoms |
| error | ErrorMessage | atoms |
| avatars | AvatarGroup | atoms |
| list | DocumentRow | atoms |
| text_area | TextArea | atoms |
| input | TextInput | atoms |
| dropdown | Dropdown | atoms |
| graph | MiniChart | atoms |
| switch group | ToggleButtonGroup | atoms |
| btn | Button | atoms |
| profile | ProfileCard | molecules |
| node | AutomationNode | molecules |
| campaign_preview | CampaignCard | molecules |
| project_preview | ProjectCard | molecules |
| experience_preview | ExperienceItem | molecules |
| team | TeamCard | molecules |
| card metric | MetricCard | molecules |
| Cards metrica | StatCard | molecules |
| attemt | AttemptCard | molecules |
| notify | Notification | molecules |
| second-row | SubHeader | organisms |
| topmenu | TopMenu | organisms |
| header | Header | organisms |
| task | TaskItem | organisms |
| card top | HeroCard | organisms |
| (new, 2026-10-11) | HeroSection | organisms |
| (new, 2026-10-11) HeroCard/background | HeroSection's backdrop (inside HeroSection in code, not a separate export) | organisms |
| menu_switch | NavTab | organisms (atoms in code since v0.5.0) |
| (new, v0.5.0, code first) | TextLink | atoms |
| (new, v0.5.0, code first) | Logo | atoms |
| (new, v0.5.0, code first) | Breadcrumbs | molecules |
| (new, v0.5.0, code first) | StageProgress | molecules |
| (new, v0.6.0, code first) | Tooltip | atoms |
| canban | KanbanBoard | organisms (single component, no props) |
| indents | SpacingScale | styles (docs only, 0 instances) |

#### Properties
| Component | Old → New | Type |
|---|---|---|
| ProgressBar | Property 1 → `size`; length → `value`; (new in v0.4.0) `tone` default \| accent | variant; variant; variant |
| Avatar | Property 1 → `image` | variant |
| Status | Property 1 → `status` | variant |
| Icon | Property 1 → `name` | variant |
| ToggleButton | switch → `selected`; size → `size`; name → `label` | variant; variant; text |
| Flag | Property 1 → `checked` | variant |
| Tag | Property 1 → `variant`; Show icon → `showIcon`; Text → `label`; (new in v0.4.0) `color` neutral (control) \| yellow \| green (static) | variant; boolean; text; variant |
| ErrorMessage | Property 1 → `variant`; Text → `message` | variant; text |
| AvatarGroup | Property 1 → `variant` | variant |
| DocumentRow | Property 1 → `variant`; name → `title`; created by → `author`; date → `date` | variant; text; text; text |
| TextArea | Property 1 → `variant`; Text → `value`; headline → `label`; head → `showLabel` | variant; text; text; boolean |
| TextInput | Property 1 → `variant`; input → `value`; headline → `label`; head → `showLabel` | variant; text; text; boolean |
| Dropdown | Property 1 → `variant`; filled → `filled`; Text → `value`; headline → `label`; head → `showLabel` | variant; variant; text; text; boolean |
| MiniChart | Property 1 → `variant` | variant |
| ToggleButtonGroup | Property 1 → `variant` | variant |
| Button | CTA? → `cta`; type → `variant`; name → `label`; subName → `sublabel`; subName2 → `showSublabel` | variant; variant; text; text; boolean |
| ProfileCard | Property 1 → `variant` | variant |
| AutomationNode | Property 1 → `variant` | variant |
| CampaignCard | Property 1 → `variant`; Show btn → `showButton`; Show status → `showStatus` | variant; boolean; boolean |
| ProjectCard | Property 1 → `variant`; Text → `description` | variant; text |
| ExperienceItem | Property 1 → `variant` | variant |
| TeamCard | Property 1 → `variant` | variant |
| MetricCard | Property 1 → `variant` | variant |
| StatCard | Property 1 → `variant` | variant |
| AttemptCard | Property 1 → `attempt` | variant |
| Notification | type → `variant`; Show btn → `showButton` | variant; boolean |
| SubHeader | type → `variant` | variant |
| TopMenu | Property 1 → `activeTab` (v0.5.0: removed in Figma; the NavTabs' `selected` sets the current tab, code: `tabs[].selected`) | variant |
| Header | type → `variant`; Show second-row → `showSubHeader`; Show bar → `showProgress` | variant; boolean; boolean |
| TaskItem | Property 1 → `state`; Show btn → `showButton`; Show error → `showError` | variant; boolean; boolean |
| HeroCard | Property 1 → `variant`; Show btns group → `showActions` | variant; boolean |
| HeroSection | Show bg → `showBackground`; nested Header props → `showSubHeader`, `showProgress`; nested HeroCard props → `showActions`, `heroVariant` | boolean; boolean; boolean; boolean; variant |
| NavTab | menu → `selected`; Text → `label` | variant; text |
| SpacingScale | size → `size` | variant |

#### Variant values
| Component.property | Old → New |
|---|---|
| ProgressBar.size | Default → `sm`, big → `lg` |
| ProgressBar.value | 75% → `75`, 20% → `20` |
| Avatar.image | katya, dog, petya (unchanged) |
| Status.status | green → `on-track`, red → `failing`, purple → `growth`, stopped → `stopped` |
| Icon.name | play, user, more, arrow-down, close (unchanged) |
| ToggleButton.selected | on → `true`, off → `false` |
| ToggleButton.size | big → `lg`, small → `sm` |
| Flag.checked | no → `false`, yes → `true` |
| Tag.variant | control, static (unchanged) |
| Dropdown.variant | On color → `on-color`, default → `default` |
| Dropdown.filled | on → `true`, off → `false` |
| Button.cta | no → `false`, yes → `true` |
| Button.variant | small → `primary-sm`, big → `primary-lg`, secondary → `secondary`, On color → `on-color`, node → `node` |
| ProfileCard.variant | long, short, short-outlined (unchanged) |
| AttemptCard.attempt | Default → `first`, Variant2 → `next` |
| SubHeader.variant | Default → `default`, builider → `builder` |
| TopMenu.activeTab | all → `all-teams`, templates → `templates`, off → `none` (removed in v0.5.0, see Properties) |
| SubHeader | Show back → `showBack` (v0.6.0) |
| TaskItem.state | Default → `default`, Variant2 → `active` |
| HeroCard.variant | Default → `default`, Variant2 → `image`; (2026-10-11) renamed in Figma to with bg → `with-bg`, no bg → `no-bg` |
| Button.variant | (v0.5.0, code first) + `on-color-outlined`, `accent` |
| TaskItem.state | `default` = done, `active` = to do (from the screens) |
| NavTab.selected | on → `true`, off → `false` |
| SpacingScale.size | -1 → `minus-1`, XXXS:2 → `xxxs`, XXS:4 → `xxs`, XS: 8 → `xs`, S (inner): 14 → `s`, M: 20 → `m`, L: 24 → `l`, XL: 30 → `xl`, XXL (out):90 → `xxl` |
| ErrorMessage, AvatarGroup, DocumentRow, TextArea, TextInput, MiniChart, ToggleButtonGroup, AutomationNode, CampaignCard, ProjectCard, ExperienceItem, TeamCard, MetricCard, StatCard, Notification `.variant`; Header `.variant` | Default/default → `default` |

#### Screens (frames in the `design` section)
| Old | New |
|---|---|
| Frame 1450 / Frame 1451 / Frame 1452 / Frame 1453 / `::` / Frame 1454 | flow-hiring-automation / flow-start-date / flow-quarterly-onboarding / flow-first-day-access / flow-offer-documents / flow-welcome-email |
| Hiring_campaign ×3 | hiring-campaign, hiring-campaign-2, hiring-campaign-tasks |
| All_teams_campaigns ×3 | all-teams-campaigns, -2, -3 |
| All_teams ×3 | all-teams, all-teams-employees, all-teams-templates |
| All_teams_one | all-teams-one |
| Candidate ×2 | candidate, candidate-2 |
| Candidate_interviewed | candidate-interviewed |
| Negotiate | negotiate |
| Hiring_campaign_add | hiring-campaign-add |
| Success | success |
| Automation_mail-editor ×3 | automation-mail-editor, -2, automation-mail-editor-checklist |
| Hiring_campaign_wizard / --viewport | hiring-campaign-wizard / hiring-campaign-wizard-viewport |
| Frame 1728 (page level) | section-nav |

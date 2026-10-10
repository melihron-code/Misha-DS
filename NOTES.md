# Release notes

Figma → React migration of the design system.
Figma file: https://www.figma.com/design/dPIEJfY3Ma8tiCOcO9LXJO/design-system--forShare--Copy-

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
| menu_switch | NavTab | organisms |
| canban | KanbanBoard | organisms (single component, no props) |
| indents | SpacingScale | styles (docs only, 0 instances) |

#### Properties
| Component | Old → New | Type |
|---|---|---|
| ProgressBar | Property 1 → `size`; length → `value` | variant; variant |
| Avatar | Property 1 → `image` | variant |
| Status | Property 1 → `status` | variant |
| Icon | Property 1 → `name` | variant |
| ToggleButton | switch → `selected`; size → `size`; name → `label` | variant; variant; text |
| Flag | Property 1 → `checked` | variant |
| Tag | Property 1 → `variant`; Show icon → `showIcon`; Text → `label` | variant; boolean; text |
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
| TopMenu | Property 1 → `activeTab` | variant |
| Header | type → `variant`; Show second-row → `showSubHeader`; Show bar → `showProgress` | variant; boolean; boolean |
| TaskItem | Property 1 → `state`; Show btn → `showButton`; Show error → `showError` | variant; boolean; boolean |
| HeroCard | Property 1 → `variant`; Show btns group → `showActions` | variant; boolean |
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
| TopMenu.activeTab | all → `all-teams`, templates → `templates`, off → `none` |
| TaskItem.state | Default → `default`, Variant2 → `active` |
| HeroCard.variant | Default → `default`, Variant2 → `image` |
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

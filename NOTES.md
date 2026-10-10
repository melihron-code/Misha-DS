# Release notes

Figma → React migration of the design system.
Figma file: https://www.figma.com/design/dPIEJfY3Ma8tiCOcO9LXJO/design-system--forShare--Copy-

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

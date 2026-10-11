# Site map

The reference for step 6 (the site): every page, its route and Figma screen(s), and every connection between
pages. Figma: the `design` section (node `357:58709`) of file `dPIEJfY3Ma8tiCOcO9LXJO`. All screens are desktop
(1440 wide); there are no mobile screens, so small screens follow the responsive rules of the organisms
(CLAUDE.md rule 9). There is no footer.

Routes live in `src/App.jsx`, the path helpers in `src/site/site.js` (`paths`), the pages in `src/pages/`.

**13 pages:** the Homepage, 11 pages from the design screens and the 404 page (plus /ds-dev/). The Homepage was
added to Figma on 2026-10-11 (screen `Homepage`, node `357:59066`); before that, All teams was on `/`.

**Built: 2 of 13** — Homepage (v0.6.2), All teams (v0.6.3). The rest are placeholders.

**Breakpoints:** the page container is the window minus its scrollbar, so a desktop browser exactly 768px wide
(753px of page) gets the mobile layout; tablets (no fixed scrollbar) get the tablet layout. Left as is (decided
2026-10-11).

## Pages

| Page | Route | Figma screen(s) | File | Top of the page | Content (organisms, molecules; ⚠ = not a component yet) |
|---|---|---|---|---|---|
| Homepage | `/` | Homepage | `HomePage.jsx` | HeroSection without SubHeader (decided 2026-10-11; Figma still shows one), no TopMenu tab selected | HeroCard `homepage` (title, subtitle, three large buttons). Nothing below the hero. **Built** (v0.6.2). |
| All teams | `/teams` | all-teams | `AllTeamsPage.jsx` | HeroSection, SubHeader without Back | MetricGrid (MetricCard ×4), TeamGrid (TeamCard ×6). **Built** (v0.6.3). |
| Employees | `/employees` | all-teams-employees | `EmployeesPage.jsx` | HeroSection | ⚠ filter bar (Dropdowns), ProfileCard long ×10 |
| Team | `/teams/:teamId` | all-teams-one | `TeamPage.jsx` | HeroSection | ⚠ Notification with Avatars, ProfileCard long ×10 |
| Team campaigns | `/teams/:teamId/campaigns` | all-teams-campaigns | `TeamCampaignsPage.jsx` | HeroSection | Notification, CampaignCard ×4 |
| All templates | `/templates` | all-teams-templates | `TemplatesPage.jsx` | HeroSection (Figma: Header + HeroCard + background) | DocumentRow ×16 |
| Campaign | `/campaigns/:campaignId` | hiring-campaign | `CampaignPage.jsx` | Header | HeroCard with-bg, StatCard ×3, CampaignCard, KanbanBoard |
| New campaign | `/campaigns/new?team=` | hiring-campaign-add | `NewCampaignPage.jsx` | Header | HeroCard with-bg, TaskItem ×6 |
| Job description | `/campaigns/new/job-description?team=` | hiring-campaign-wizard, hiring-campaign-wizard-viewport (popover) | `JobDescriptionPage.jsx` | Header, SubHeader builder | ⚠ page title without a hero; TextInput, Dropdown, TextArea, ErrorMessage; ⚠ skill input + tag list; Button primary-lg; ⚠ "Head line" popover |
| Campaign published | `/campaigns/new/published` | success | `CampaignPublishedPage.jsx` | Header without SubHeader | ⚠ full-screen backdrop, heading, Button primary-sm |
| Person | `/people/:personId?campaign=`, `?from=employees` or `?team=` | candidate (profile), candidate-interviewed (Interview stage) | `PersonPage.jsx` | Header with StageProgress | Profile: HeroCard with-bg, Notification, ⚠ achievements, StageProgress, ⚠ next level, ProfileCard short ×6. Interview: HeroCard with-bg, Dropdown, ExperienceItem ×3, Tag ×5, ProjectCard ×3, ⚠ assessment results, ProfileCard short ×3 |
| Negotiate | `/people/:personId/negotiate?campaign=` or `?team=` | negotiate | `NegotiatePage.jsx` | Header | HeroCard with-bg, AttemptCard ×3, ⚠ offer form, ⚠ prediction |
| Not found | any other URL, or an unknown id | — | `NotFoundPage.jsx` | Header without SubHeader | heading, Button "Homepage" to `/` |
| Design system | `/ds-dev/*` | — | `ds-dev/DsDevPage.jsx` | — | unchanged |

**Templates for many items (dynamic routes):** a team (`/teams/:teamId`, `/teams/:teamId/campaigns`), a
campaign (`/campaigns/:campaignId`), a person (`/people/:personId`, `/people/:personId/negotiate`). The
Figma screens `candidate` and `candidate-interviewed` are one page: candidates in the Interview stage get the
interview content, everyone else the profile content.

**Query parameters:** `?team=` on the new-campaign pages and `?campaign=` / `?from=employees` / `?team=` on a
person's pages keep where they were opened from, so Back and the breadcrumbs lead there.

## Shared layout

- `src/site/SiteLayout.jsx`: the page root of every site page: the container named `page`, as wide as the window,
  on `bg/default`; each section keeps its content within `size/page` (1440), centered, and only the HeroSection
  backdrop spans the whole window (e.g. 1920); client-side links (the components render `<a href>`, the layout routes the
  clicks); scroll to the top on every page change. Each page sets its tab title (`<title>`, "Page · Hired & Wired").
- `src/site/SiteHeader.jsx`: the top of every page, from one place. `SiteHeader` (Header) or `SiteHero`
  (HeroSection: the Homepage and the all-teams family). The TopMenu is the same everywhere: the logo leads to the
  Homepage (`/`), the current tab comes from the URL (none on the Homepage, All templates under `/templates`,
  All teams elsewhere).
- Overlays: only the "Head line" popover on Job description (opens from the Preferred qualifications field).

## Connections

All prototype connections are **click → navigate, instant** (no overlays, no back actions in the prototype).

### From the Figma prototype

| Source screen | Element | Destination | Route |
|---|---|---|---|
| Homepage | Hero button "All teams" | all-teams | `/teams` |
| Homepage | Hero button "All templates" | all-teams-templates | `/templates` |
| Homepage | Hero button "New campaign" | hiring-campaign-wizard (skips the task list) | `/campaigns/new/job-description` |
| all-teams | Logo "Hired & Wired" | Homepage | `/` |
| all-teams | TopMenu tab "All templates" | all-teams-templates | `/templates` |
| all-teams | Hero toggle "Employees" | all-teams-employees | `/employees` |
| all-teams | TeamCard ×6 | all-teams-one | `/teams/:teamId` |
| all-teams-one | Hero toggle "Campaigns" | all-teams-campaigns | `/teams/:teamId/campaigns` |
| all-teams-employees | ProfileCard long ×10 (added 2026-10-11) | candidate | `/people/:personId?from=employees` |
| all-teams-one | ProfileCard long ×10 (team members) | candidate | `/people/:personId?team=` |
| all-teams-campaigns | Hero button "Add campaign" | hiring-campaign-add | `/campaigns/new?team=` |
| all-teams-campaigns | CampaignCard ×3 (Forward Architect, District Integration Engineer, Product Tactics Manager) | hiring-campaign | `/campaigns/:campaignId` |
| hiring-campaign | Kanban cards: Applied ×4, Screening ×6 | candidate | `/people/:personId?campaign=` |
| hiring-campaign | Kanban cards: Interview ×3 | candidate-interviewed | `/people/:personId?campaign=` |
| hiring-campaign | Kanban card: Offer ×1 | negotiate | `/people/:personId/negotiate?campaign=` |
| candidate | Hero button "Negotiate" | negotiate | `/people/:personId/negotiate` |
| hiring-campaign-add | TaskItem button "Job description" | hiring-campaign-wizard | `/campaigns/new/job-description` |
| hiring-campaign-wizard | TextArea "Preferred qualifications" | hiring-campaign-wizard-viewport | popover on the same page (Figma: a separate screen) |
| hiring-campaign-wizard | Button "Publish" | success | `/campaigns/new/published` |
| success | Button "Homepage" (added 2026-10-11) | all-teams | `/teams` |

### Agreed (not in the prototype)

| Element | Destination |
|---|---|
| Back (every SubHeader) | the parent page: the previous breadcrumb (e.g. Employees and a team → All teams; All templates → the Homepage; a campaign → its team's campaigns; a person → the campaign, team or Employees they were opened from; Negotiate → the person; Job description → New campaign) |
| Breadcrumbs | each crumb links to its page; the last one is the current page. They start with Home (`/`); the all-teams family adds All teams (`/teams`) |
| Logo (every screen) | the Homepage, `/` (the prototype connects it on all-teams) |
| 404 "Homepage" | the Homepage, `/` |

### Inferred (same control as a connected one) — to confirm in Part 3

| Element | Destination | Why |
|---|---|---|
| TopMenu tab "All teams" (every page) | `/teams` | the other tab of the same TopMenu is connected |
| Hero toggle "Overview" (Employees) | `/teams` | same toggle as Overview → Employees |
| Hero toggle "Team" (Team campaigns) | `/teams/:teamId` | same toggle as Team → Campaigns |
| Hero button "Negotiate" on the interview content | negotiate | the same hero on the same (now one) candidate page |

### No action yet

These stay without a page (decided 2026-10-11). Each shows the tooltip "No action for now" on hover and keyboard
focus and is marked unavailable: the not-allowed cursor, no hover overlay, `aria-disabled` (still focusable, its
colors unchanged).

- **Every page:** Generate report, Profile, Log out.
- **All teams:** Add team, hero toggle "Report".
- **Employees:** Add employee, hero toggle "Report".
- **Team / Team campaigns:** hero toggle "Access", CampaignCard "Dynamic Program Liaison" (the 4th card), "More info".
- **All templates:** Add new template, hero toggles Automations / Documents / Access, the document rows, Edit.
- **Campaign:** Finish, Cancel.
- **New campaign:** Review, Generate.
- **Job description:** Save, Deploy, the skill "Add", the popover's Generate.
- **Person:** Promote, Suspend, Fire, All achievements, More info, Org. chart, Hire, Reject, the ProfileCards under
  Reports to, Mentoring and Interview history.
- **Negotiate:** Send offer.

Controls that work on the page itself (no navigation): hero tag dropdowns and "Add", TaskItem flags, filters.

## Open questions

Answered (2026-10-11): the elements with no destination stay without pages (tooltip + not-allowed cursor); the
Employees ProfileCards open the person's page (prototype updated); the sample team names stay.

1. **Popover:** how does the "Head line" popover close (outside click, Escape, Generate)? What does Generate do?
2. **Success screen:** a full-screen backdrop; HeroSection has no full-height option (flagged in v0.5.0).
3. **Not components yet** (needed in Part 2): filter bar, Notification with avatars, achievements list,
   "next level / prediction" block, assessment results, offer form and prediction, skill input with tags,
   the popover, the page title without a hero, and the white content section with a heading that most pages use.
4. **Stray layers** in the `design` section: `Ellipse 12` and `Frame 1` ("asdasd").
5. **Homepage in Figma:** the TopMenu still shows "All teams" selected and the SubHeader is still there; the code
   has neither (to be fixed in Figma).

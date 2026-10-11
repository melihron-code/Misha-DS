# Site map

The reference for step 6 (the site): every page, its route and Figma screen(s), and every connection between
pages. Figma: the `design` section (node `357:58709`) of file `dPIEJfY3Ma8tiCOcO9LXJO`. All screens are desktop
(1440 wide); there are no mobile screens, so small screens follow the responsive rules of the organisms
(CLAUDE.md rule 9). There is no footer.

Routes live in `src/App.jsx`, the path helpers in `src/site/site.js` (`paths`), the pages in `src/pages/`.

## Pages

| Page | Route | Figma screen(s) | File | Top of the page | Content (organisms, molecules; ⚠ = not a component yet) |
|---|---|---|---|---|---|
| All teams (home) | `/` | all-teams | `HomePage.jsx` | HeroSection, SubHeader without Back | MetricCard ×4, TeamCard ×6 |
| Employees | `/employees` | all-teams-employees | `EmployeesPage.jsx` | HeroSection | ⚠ filter bar (Dropdowns), ProfileCard long ×10 |
| Team | `/teams/:teamId` | all-teams-one | `TeamPage.jsx` | HeroSection | ⚠ Notification with Avatars, ProfileCard long ×10 |
| Team campaigns | `/teams/:teamId/campaigns` | all-teams-campaigns | `TeamCampaignsPage.jsx` | HeroSection | Notification, CampaignCard ×4 |
| All templates | `/templates` | all-teams-templates | `TemplatesPage.jsx` | HeroSection (Figma: Header + HeroCard + background) | DocumentRow ×16 |
| Campaign | `/campaigns/:campaignId` | hiring-campaign | `CampaignPage.jsx` | Header | HeroCard with-bg, StatCard ×3, CampaignCard, KanbanBoard |
| New campaign | `/campaigns/new?team=` | hiring-campaign-add | `NewCampaignPage.jsx` | Header | HeroCard with-bg, TaskItem ×6 |
| Job description | `/campaigns/new/job-description?team=` | hiring-campaign-wizard, hiring-campaign-wizard-viewport (popover) | `JobDescriptionPage.jsx` | Header, SubHeader builder | ⚠ page title without a hero; TextInput, Dropdown, TextArea, ErrorMessage; ⚠ skill input + tag list; Button primary-lg; ⚠ "Head line" popover |
| Campaign published | `/campaigns/new/published` | success | `CampaignPublishedPage.jsx` | Header without SubHeader | ⚠ full-screen backdrop, heading, Button primary-sm |
| Person | `/people/:personId?campaign=` or `?team=` | candidate (profile), candidate-interviewed (Interview stage) | `PersonPage.jsx` | Header with StageProgress | Profile: HeroCard with-bg, Notification, ⚠ achievements, StageProgress, ⚠ next level, ProfileCard short ×6. Interview: HeroCard with-bg, Dropdown, ExperienceItem ×3, Tag ×5, ProjectCard ×3, ⚠ assessment results, ProfileCard short ×3 |
| Negotiate | `/people/:personId/negotiate?campaign=` or `?team=` | negotiate | `NegotiatePage.jsx` | Header | HeroCard with-bg, AttemptCard ×3, ⚠ offer form, ⚠ prediction |
| Not found | any other URL, or an unknown id | — | `NotFoundPage.jsx` | Header without SubHeader | heading, Button to `/` |
| Design system | `/ds-dev/*` | — | `ds-dev/DsDevPage.jsx` | — | unchanged |

**Templates for many items (dynamic routes):** a team (`/teams/:teamId`, `/teams/:teamId/campaigns`), a
campaign (`/campaigns/:campaignId`), a person (`/people/:personId`, `/people/:personId/negotiate`). The
Figma screens `candidate` and `candidate-interviewed` are one page: candidates in the Interview stage get the
interview content, everyone else the profile content.

**Query parameters:** `?team=` on the new-campaign pages and `?campaign=` / `?team=` on a person's pages keep
where they were opened from, so Back and the breadcrumbs lead there.

## Shared layout

- `src/site/SiteLayout.jsx`: the page root of every site page: the container named `page`, up to `size/page`
  (1440) wide on `bg/default`; client-side links (the components render `<a href>`, the layout routes the
  clicks); scroll to the top on every page change. Each page sets its tab title (`<title>`, "Page · Hired & Wired").
- `src/site/SiteHeader.jsx`: the top of every page, from one place. `SiteHeader` (Header) or `SiteHero`
  (HeroSection, the all-teams family). The TopMenu is the same everywhere: the logo leads to `/`, the current
  tab comes from the URL (All templates under `/templates`, All teams elsewhere).
- Overlays: only the "Head line" popover on Job description (opens from the Preferred qualifications field).

## Connections

All prototype connections are **click → navigate, instant** (no overlays, no back actions in the prototype).

### From the Figma prototype

| Source screen | Element | Destination | Route |
|---|---|---|---|
| all-teams | TopMenu tab "All templates" | all-teams-templates | `/templates` |
| all-teams | Hero toggle "Employees" | all-teams-employees | `/employees` |
| all-teams | TeamCard ×6 | all-teams-one | `/teams/:teamId` |
| all-teams-one | Hero toggle "Campaigns" | all-teams-campaigns | `/teams/:teamId/campaigns` |
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

### Agreed (not in the prototype)

| Element | Destination |
|---|---|
| Back (every SubHeader) | the parent page: the previous breadcrumb (e.g. a campaign → its team's campaigns; a person → the campaign or team they were opened from; Negotiate → the person) |
| Breadcrumbs | each crumb links to its page; the last one is the current page |
| Logo | `/` |
| Success "Homepage" | `/` |

### Inferred (same control as a connected one) — to confirm in Part 3

| Element | Destination | Why |
|---|---|---|
| TopMenu tab "All teams" (every page) | `/` | the other tab of the same TopMenu is connected |
| Hero toggle "Overview" (Employees) | `/` | same toggle as Overview → Employees |
| Hero toggle "Team" (Team campaigns) | `/teams/:teamId` | same toggle as Team → Campaigns |
| Hero button "Negotiate" on the interview content | negotiate | the same hero on the same (now one) candidate page |

### No action yet ("No action for now" tooltip on hover and keyboard focus)

- **Every page:** Generate report, Profile, Log out.
- **All teams:** Add team, hero toggle "Report".
- **Employees:** Add employee, hero toggle "Report", the 10 ProfileCards.
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

1. **Pages with no screens:** Report, Access, Profile, a template's page, the Automations / Documents views of
   templates: should any of them become pages?
2. **Employees list:** its ProfileCards have no connection (the same people on the Team page open their page).
   Should they open the person's page?
3. **Teams:** Figma shows six identical "Engineering Team" cards and one team screen; the other five names are
   samples, and only Engineering has members and campaigns.
4. **Popover:** how does the "Head line" popover close (outside click, Escape, Generate)? What does Generate do?
5. **Success screen:** a full-screen backdrop; HeroSection has no full-height option (flagged in v0.5.0).
6. **Not components yet** (needed in Part 2): filter bar, Notification with avatars, achievements list,
   "next level / prediction" block, assessment results, offer form and prediction, skill input with tags,
   the popover, the page title without a hero, and the white content section with a heading that most pages use.
7. **Stray layers** in the `design` section: `Ellipse 12` and `Frame 1` ("asdasd").

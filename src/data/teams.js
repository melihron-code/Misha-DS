// Teams and their campaigns (Figma: TeamCards on all-teams, CampaignCards on all-teams-campaigns).
// Figma shows six identical "Engineering Team" cards; Engineering keeps Figma's content, the other five are
// samples. TeamCard content: `people` (team size), `productivity` (%), `highlight`, `members` (Avatar images).
// `summary`: the team page's weekly update; `hiringSummary`: the team campaigns page's (Notifications; Engineering's
// are Figma's).
// Engineering's members and campaigns are Figma's; the other teams have sample members (people.js) and campaigns.

export const teams = [
  { id: 'engineering', name: 'Engineering Team', people: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week', members: ['katya', 'petya', 'dog'], summary: 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.', hiringSummary: 'This month, the hiring funnel saw 250 applicants, 50 interviews, and 10 new hires.' },
  { id: 'design', name: 'Design Team', people: 9, productivity: 76, highlight: 'Katya redrew the logo for the third time', members: ['petya', 'katya', 'dog'], summary: 'Mia shipped the new icon set, Leo ran five user interviews, and the design review moved to Fridays.', hiringSummary: 'This month, design saw 103 applicants, 21 interviews, and 3 new hires.' },
  { id: 'product', name: 'Product Team', people: 12, productivity: 82, highlight: 'The roadmap survived another week', members: ['dog', 'katya', 'petya'], summary: 'Grace closed the Q3 roadmap, Ethan cleared the backlog, and two features went to beta.', hiringSummary: 'This month, product saw 52 applicants, 11 interviews, and 1 new hire.' },
  { id: 'data', name: 'Data Team', people: 7, productivity: 93, highlight: 'Every dashboard is green, nobody trusts it', members: ['katya', 'dog', 'petya'], summary: 'Noah rebuilt the data pipeline, Zoe launched the churn model, and every dashboard loads in a second.', hiringSummary: 'This month, data saw 207 applicants, 34 interviews, and 5 new hires.' },
  { id: 'marketing', name: 'Marketing Team', people: 15, productivity: 68, highlight: 'A new slogan every morning', members: ['petya', 'dog', 'katya'], summary: 'Chloe launched the spring campaign, Ella doubled organic traffic, and the team wrote 12 new posts.', hiringSummary: 'This month, marketing saw 139 applicants, 23 interviews, and 3 new hires.' },
  { id: 'operations', name: 'Operations Team', people: 11, productivity: 71, highlight: 'The coffee machine is fixed at last', members: ['dog', 'petya', 'katya'], summary: 'Ruth moved the office to the new floor, Maya hired 4 people, and the coffee machine works again.', hiringSummary: 'This month, operations saw 33 applicants, 7 interviews, and 1 new hire.' },
]

// Campaigns per team (Figma: the CampaignCards on all-teams-campaigns). `stats`: the card's five numbers (Applied,
// Rejected, In progress, Final round, Offers sent); `status` / `statusLabel`: the Status atom's key and label.
// Engineering's four are Figma's; the other teams' are samples.
export const CAMPAIGN_STAT_LABELS = ['Applied', 'Rejected', 'In progress', 'Final round', 'Offers sent']
const campaign = (id, title, teamId, numbers) => ({
  id,
  title,
  teamId,
  status: 'on-track',
  statusLabel: 'Active',
  stats: numbers.map((value, i) => ({ value: String(value), label: CAMPAIGN_STAT_LABELS[i] })),
})
export const campaigns = [
  campaign('forward-architect', 'Forward Architect', 'engineering', [45, 12, 98, 112, 6]),
  campaign('district-integration-engineer', 'District Integration Engineer', 'engineering', [78, 7, 89, 34, 1]),
  campaign('dynamic-program-liaison', 'Dynamic Program Liaison', 'engineering', [23, 678, 8, 90, 45]),
  campaign('product-tactics-manager', 'Product Tactics Manager', 'engineering', [15, 5, 167, 90, 2]),
  campaign('senior-product-designer', 'Senior Product Designer', 'design', [64, 21, 18, 6, 2]),
  campaign('ux-researcher', 'UX Researcher', 'design', [39, 12, 9, 4, 1]),
  campaign('group-product-manager', 'Group Product Manager', 'product', [52, 30, 11, 5, 1]),
  campaign('analytics-engineer', 'Analytics Engineer', 'data', [87, 40, 22, 8, 3]),
  campaign('ml-engineer', 'ML Engineer', 'data', [120, 64, 30, 12, 2]),
  campaign('growth-marketer', 'Growth Marketer', 'marketing', [95, 51, 17, 6, 2]),
  campaign('content-lead', 'Content Lead', 'marketing', [44, 19, 10, 3, 1]),
  campaign('people-partner', 'People Partner', 'operations', [33, 14, 7, 2, 1]),
]

export const teamById = id => teams.find(t => t.id === id)
export const campaignById = id => campaigns.find(c => c.id === id)
export const campaignsOf = teamId => campaigns.filter(c => c.teamId === teamId)

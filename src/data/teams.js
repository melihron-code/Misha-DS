import { candidatesOf } from './people'

// Teams and their campaigns (Figma: TeamCards on all-teams, CampaignCards on all-teams-campaigns).
// Figma shows six identical "Engineering Team" cards; Engineering keeps Figma's content, the other five are
// samples. TeamCard content: `people` (team size), `productivity` (%), `highlight`, `members` (Avatar images).
// `summary`: the team page's weekly update (Notification; Engineering's is Figma's); the Team campaigns page's hiring
// summary comes from the team's campaigns (hiringSummaryOf).
// Engineering's members and campaigns are Figma's; the other teams have sample members (people.js) and campaigns.

export const teams = [
  { id: 'engineering', name: 'Engineering Team', people: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week', members: ['katya', 'petya', 'dog'], summary: 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.' },
  { id: 'design', name: 'Design Team', people: 9, productivity: 76, highlight: 'Katya redrew the logo for the third time', members: ['petya', 'katya', 'dog'], summary: 'Mia shipped the new icon set, Leo ran five user interviews, and the design review moved to Fridays.' },
  { id: 'product', name: 'Product Team', people: 12, productivity: 82, highlight: 'The roadmap survived another week', members: ['dog', 'katya', 'petya'], summary: 'Grace closed the Q3 roadmap, Ethan cleared the backlog, and two features went to beta.' },
  { id: 'data', name: 'Data Team', people: 7, productivity: 93, highlight: 'Every dashboard is green, nobody trusts it', members: ['katya', 'dog', 'petya'], summary: 'Noah rebuilt the data pipeline, Zoe launched the churn model, and every dashboard loads in a second.' },
  { id: 'marketing', name: 'Marketing Team', people: 15, productivity: 68, highlight: 'A new slogan every morning', members: ['petya', 'dog', 'katya'], summary: 'Chloe launched the spring campaign, Ella doubled organic traffic, and the team wrote 12 new posts.' },
  { id: 'operations', name: 'Operations Team', people: 11, productivity: 71, highlight: 'The coffee machine is fixed at last', members: ['dog', 'petya', 'katya'], summary: 'Ruth moved the office to the new floor, Maya hired 4 people, and the coffee machine works again.' },
]

// Campaigns per team (Figma: the CampaignCards on all-teams-campaigns; Engineering's four are Figma's titles, the other
// teams' are samples). Every number comes from the campaign's candidates (people.js) and `rejected`, so the Team
// campaigns card, the Campaign page's stat cards, its funnel and its Kanban agree:
//   Applied = everyone who applied (the Kanban + rejected) · Rejected · In progress = Screening + Interview
//   Final round = Interview · Offers sent = Offer · Conversion rate = (Interview + Offer) ÷ Applied
// `status` / `statusLabel`: the Status atom's key and label.
export const CAMPAIGN_STAT_LABELS = ['Applied', 'Rejected', 'In progress', 'Final round', 'Offers sent']
export const funnelOf = (campaignId, rejected) => {
  const people = candidatesOf(campaignId)
  const count = stage => people.filter(p => p.stage === stage).length
  const applied = people.length + rejected
  return { applied, rejected, inProgress: count('screening') + count('interview'), finalRound: count('interview'), offers: count('offer') }
}
const campaign = (id, title, teamId, rejected) => {
  const f = funnelOf(id, rejected)
  return {
    id,
    title,
    teamId,
    status: 'on-track',
    statusLabel: 'Active',
    funnel: f,
    stats: [f.applied, f.rejected, f.inProgress, f.finalRound, f.offers].map((value, i) => ({ value: String(value), label: CAMPAIGN_STAT_LABELS[i] })),
  }
}
export const campaigns = [
  campaign('forward-architect', 'Forward Architect', 'engineering', 9),
  campaign('district-integration-engineer', 'District Integration Engineer', 'engineering', 6),
  campaign('dynamic-program-liaison', 'Dynamic Program Liaison', 'engineering', 4),
  campaign('product-tactics-manager', 'Product Tactics Manager', 'engineering', 7),
  campaign('senior-product-designer', 'Senior Product Designer', 'design', 8),
  campaign('ux-researcher', 'UX Researcher', 'design', 3),
  campaign('group-product-manager', 'Group Product Manager', 'product', 5),
  campaign('analytics-engineer', 'Analytics Engineer', 'data', 6),
  campaign('ml-engineer', 'ML Engineer', 'data', 11),
  campaign('growth-marketer', 'Growth Marketer', 'marketing', 7),
  campaign('content-lead', 'Content Lead', 'marketing', 4),
  campaign('people-partner', 'People Partner', 'operations', 3),
]

// The Campaign page's stat cards (Figma: Applications, In progress, Conversion rate).
export const campaignStatsOf = c => [
  { title: 'Applications', value: String(c.funnel.applied), label: 'Total received' },
  { title: 'In progress', value: String(c.funnel.inProgress), label: 'Active candidates' },
  {
    title: 'Conversion rate',
    value: `${(((c.funnel.finalRound + c.funnel.offers) / c.funnel.applied) * 100).toFixed(1)}%`,
    label: 'To interview stage',
  },
]

// A team's hiring summary (Team campaigns page), from its campaigns.
export const hiringSummaryOf = teamId => {
  const own = campaigns.filter(c => c.teamId === teamId)
  const sum = key => own.reduce((total, c) => total + c.funnel[key], 0)
  const n = (count, one, many) => `${count} ${count === 1 ? one : many}`
  return `This month, the hiring funnel saw ${n(sum('applied'), 'applicant', 'applicants')}, ${n(sum('finalRound'), 'interview', 'interviews')} and ${n(sum('offers'), 'offer', 'offers')} sent.`
}

export const teamById = id => teams.find(t => t.id === id)
export const campaignById = id => campaigns.find(c => c.id === id)
export const campaignsOf = teamId => campaigns.filter(c => c.teamId === teamId)

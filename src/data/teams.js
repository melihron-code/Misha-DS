// Teams and their campaigns (Figma: TeamCards on all-teams, CampaignCards on all-teams-campaigns).
// Figma shows six identical "Engineering Team" cards; Engineering keeps Figma's content, the other five are
// samples. TeamCard content: `people` (team size), `productivity` (%), `highlight`, `members` (Avatar images).
// `summary`: the team page's weekly update (Notification; Engineering's is Figma's).
// Only the Engineering team has members and campaigns so far (Figma has one team screen).

export const teams = [
  { id: 'engineering', name: 'Engineering Team', people: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week', members: ['katya', 'petya', 'dog'], summary: 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.' },
  { id: 'design', name: 'Design Team', people: 9, productivity: 76, highlight: 'Katya redrew the logo for the third time', members: ['petya', 'katya', 'dog'], summary: 'Mia shipped the new icon set, Leo ran five user interviews, and the design review moved to Fridays.' },
  { id: 'product', name: 'Product Team', people: 12, productivity: 82, highlight: 'The roadmap survived another week', members: ['dog', 'katya', 'petya'], summary: 'Grace closed the Q3 roadmap, Ethan cleared the backlog, and two features went to beta.' },
  { id: 'data', name: 'Data Team', people: 7, productivity: 93, highlight: 'Every dashboard is green, nobody trusts it', members: ['katya', 'dog', 'petya'], summary: 'Noah rebuilt the data pipeline, Zoe launched the churn model, and every dashboard loads in a second.' },
  { id: 'marketing', name: 'Marketing Team', people: 15, productivity: 68, highlight: 'A new slogan every morning', members: ['petya', 'dog', 'katya'], summary: 'Chloe launched the spring campaign, Ella doubled organic traffic, and the team wrote 12 new posts.' },
  { id: 'operations', name: 'Operations Team', people: 11, productivity: 71, highlight: 'The coffee machine is fixed at last', members: ['dog', 'petya', 'katya'], summary: 'Ruth moved the office to the new floor, Maya hired 4 people, and the coffee machine works again.' },
]

// `linked: false`: the card has no prototype connection (Figma: Dynamic Program Liaison).
export const campaigns = [
  { id: 'forward-architect', title: 'Forward Architect', teamId: 'engineering' },
  { id: 'district-integration-engineer', title: 'District Integration Engineer', teamId: 'engineering' },
  { id: 'dynamic-program-liaison', title: 'Dynamic Program Liaison', teamId: 'engineering', linked: false },
  { id: 'product-tactics-manager', title: 'Product Tactics Manager', teamId: 'engineering' },
]

export const teamById = id => teams.find(t => t.id === id)
export const campaignById = id => campaigns.find(c => c.id === id)
export const campaignsOf = teamId => campaigns.filter(c => c.teamId === teamId)

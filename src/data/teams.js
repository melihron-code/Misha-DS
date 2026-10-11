// Teams and their campaigns (Figma: TeamCards on all-teams, CampaignCards on all-teams-campaigns).
// Figma shows six identical "Engineering Team" cards; Engineering keeps Figma's content, the other five are
// samples. TeamCard content: `people` (team size), `productivity` (%), `highlight`, `members` (Avatar images).
// Only the Engineering team has members and campaigns so far (Figma has one team screen).

export const teams = [
  { id: 'engineering', name: 'Engineering Team', people: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week', members: ['katya', 'petya', 'dog'] },
  { id: 'design', name: 'Design Team', people: 9, productivity: 76, highlight: 'Katya redrew the logo for the third time', members: ['petya', 'katya', 'dog'] },
  { id: 'product', name: 'Product Team', people: 12, productivity: 82, highlight: 'The roadmap survived another week', members: ['dog', 'katya', 'petya'] },
  { id: 'data', name: 'Data Team', people: 7, productivity: 93, highlight: 'Every dashboard is green, nobody trusts it', members: ['katya', 'dog', 'petya'] },
  { id: 'marketing', name: 'Marketing Team', people: 15, productivity: 68, highlight: 'A new slogan every morning', members: ['petya', 'dog', 'katya'] },
  { id: 'operations', name: 'Operations Team', people: 11, productivity: 71, highlight: 'The coffee machine is fixed at last', members: ['dog', 'petya', 'katya'] },
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

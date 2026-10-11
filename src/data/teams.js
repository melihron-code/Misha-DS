// Teams and their campaigns (Figma: TeamCards on all-teams, CampaignCards on all-teams-campaigns).
// Figma shows six identical "Engineering Team" cards; the other five names here are sample names.
// Only the Engineering team has members and campaigns so far (Figma has one team screen).

export const teams = [
  { id: 'engineering', name: 'Engineering Team' },
  { id: 'design', name: 'Design Team' },
  { id: 'product', name: 'Product Team' },
  { id: 'data', name: 'Data Team' },
  { id: 'marketing', name: 'Marketing Team' },
  { id: 'operations', name: 'Operations Team' },
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

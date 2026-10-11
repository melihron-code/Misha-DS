import { candidatesIn } from './people'

// Hiring pipeline (Figma: KanbanBoard on hiring-campaign): one column per stage, the campaign's candidates from
// people.js. A card opens the person's page; in the Offer column it opens their negotiation (as in the prototype).
const COLUMNS = [
  ['applied', 'Applied'],
  ['screening', 'Screening'],
  ['interview', 'Interview'],
  ['offer', 'Offer'],
]

export const pipelineFor = campaignId =>
  COLUMNS.map(([id, title]) => ({
    id,
    title,
    people: candidatesIn(id, campaignId).map(p => ({
      name: p.name,
      role: p.role,
      image: p.image,
      href: id === 'offer' ? `/people/${p.id}/negotiate` : `/people/${p.id}`,
    })),
  }))

// Figma's Kanban (Forward Architect), for the docs.
export const pipeline = pipelineFor('forward-architect')

import { candidatesIn } from './people'

// Hiring pipeline (Figma: KanbanBoard on hiring-campaign): one column per stage, the candidates from people.js.
// A card opens the person's page; in the Offer column it opens their negotiation (as in the prototype).
const column = (id, title, href = p => `/people/${p.id}`) => ({
  id,
  title,
  people: candidatesIn(id).map(p => ({ name: p.name, role: p.role, image: p.image, href: href(p) })),
})

export const pipeline = [
  column('applied', 'Applied'),
  column('screening', 'Screening'),
  column('interview', 'Interview'),
  column('offer', 'Offer', p => `/people/${p.id}/negotiate`),
]

import { developmentStages } from './stages'

// A person's profile content (Figma: the candidate screen; one set, used for everyone for now; the hero shows each
// person's own name and role). Card colors are ProfileCard short colors (surface/tag-*). Achievements differ per
// person: achievementsFor(id) (sample data).
export const personProfile = {
  summary: 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
  achievements: {
    title: 'Achievements',
    items: [
      { title: 'Top performer', date: 'Q4 2024' },
      { title: 'Team player', date: 'Q4 2024' },
      { title: 'Innovator', date: 'Q4 2023' },
      { title: 'Mentor', date: 'Q4 2025' },
    ],
    actionLabel: 'All achievements',
  },
  development: {
    title: 'Personal Development',
    stages: developmentStages,
    value: 75,
    nextLevel: 'Lead Software Engineer',
    prediction: 'February 2026',
    actionLabel: 'More info',
  },
  relations: [
    {
      title: 'Reports to',
      people: [
        { name: 'Michael Lee', role: 'Product Manager', color: 'red' },
        { name: 'Emily Carter', role: 'UX Designer', color: 'green' },
        { name: 'David Smith', role: 'Data Analyst', color: 'pink' },
      ],
      actionLabel: 'Org. chart',
    },
    {
      title: 'Mentoring:',
      people: [
        { name: 'Michael Thompson', role: 'Project Manager', color: 'yellow' },
        { name: 'Emily Davis', role: 'UX Designer', color: 'violet' },
        { name: 'James Wilson', role: 'Data Analyst', color: 'red' },
      ],
    },
  ],
}

// Sample achievements: four per person, picked from this pool by the person's id, so a person always gets the same
// ones and people differ. Figma's four are part of the pool.
const ACHIEVEMENT_POOL = [
  { title: 'Top performer', date: 'Q4 2024' },
  { title: 'Team player', date: 'Q4 2024' },
  { title: 'Innovator', date: 'Q4 2023' },
  { title: 'Mentor', date: 'Q4 2025' },
  { title: 'Bug hunter', date: 'Q2 2024' },
  { title: 'Fast learner', date: 'Q1 2025' },
  { title: 'Customer hero', date: 'Q3 2024' },
  { title: 'Hackathon winner', date: 'Q2 2023' },
  { title: 'Culture keeper', date: 'Q1 2024' },
  { title: 'Big shipper', date: 'Q3 2025' },
  { title: 'Clean coder', date: 'Q4 2022' },
  { title: 'Rising star', date: 'Q2 2025' },
]
const hash = text => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
export const achievementsFor = id => {
  const n = ACHIEVEMENT_POOL.length
  const start = hash(id) % n
  const step = [1, 5, 7, 11][hash(id + '#') % 4] // steps coprime with 12, so the four never repeat
  return [0, 1, 2, 3].map(i => ACHIEVEMENT_POOL[(start + i * step) % n])
}

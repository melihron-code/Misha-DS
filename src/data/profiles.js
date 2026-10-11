import { developmentStages } from './stages'

// A person's profile content (Figma: the candidate screen; one set, used for everyone for now; the hero shows each
// person's own name and role). Card colors are ProfileCard short colors (surface/tag-*).
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

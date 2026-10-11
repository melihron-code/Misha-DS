// People (Figma: the Kanban on hiring-campaign, the team on all-teams-one, the list on all-teams-employees).
// Each has a unique `id` (used in /people/:id): the name in kebab-case, plus -2, -3… for repeated names.
// candidates: `stage` is their Kanban column (applied | screening | interview | offer).
// employees: `teamId` is their team, `status` their ProfileCard status (the Status atom's keys: on-track | growth |
// failing), `progress` their ProfileCard bar (Figma: the same for everyone).

const candidates = [
  ['Michael Thompson', 'Product Manager', 'applied', 'petya'],
  ['Emily Carter', 'UX Designer', 'applied'],
  ['James Wilson', 'Data Analyst', 'applied', 'petya'],
  ['Olivia Brown', 'Marketing Specialist', 'applied'],
  ['Michael Thompson', 'Project Manager', 'screening', 'petya'],
  ['Emily Davis', 'UX Designer', 'screening'],
  ['David Garcia', 'Data Analyst', 'screening', 'petya'],
  ['Jessica Martinez', 'Marketing Specialist', 'screening'],
  ['Daniel Lee', 'Systems Administrator', 'screening', 'dog'],
  ['Laura Wilson', 'Product Owner', 'screening'],
  ['Michael Thompson', 'Product Manager', 'interview', 'petya'],
  ['Jessica Williams', 'UI/UX Designer', 'interview'],
  ['David Brown', 'Data Scientist', 'interview', 'dog'],
  ['Sophia Martinez', 'UX Designer', 'offer'],
].map(([name, role, stage, image = 'katya']) => ({ kind: 'candidate', name, role, stage, image }))

const employees = [
  ['Sarah Johnson', 'Senior Developer', 'on-track'],
  ['Michael Smith', 'Product Manager', 'growth'],
  ['Emily Davis', 'UX Designer', 'on-track'],
  ['David Brown', 'QA Engineer', 'growth'],
  ['Linda Garcia', 'Data Analyst', 'on-track'],
  ['James Wilson', 'Software Engineer', 'failing'],
  ['Alice Thompson', 'Marketing Specialist', 'on-track'],
  ['Robert Martinez', 'Sales Executive', 'failing'],
  ['Jessica Taylor', 'Content Strategist', 'on-track'],
  ['Charles Lee', 'Systems Analyst', 'failing'],
].map(([name, role, status]) => ({ kind: 'employee', name, role, status, progress: 86, teamId: 'engineering', image: 'katya' }))

// Sample members of the other teams (Figma has one team screen, for Engineering). They show on their team's page;
// the Employees page keeps Figma's list (allEmployees).
const IMAGES = ['katya', 'petya', 'dog']
const teamMembers = {
  design: [['Mia Hoffman', 'Product Designer', 'on-track', 78], ['Leo Park', 'UX Researcher', 'growth', 92], ['Nina Ortiz', 'Visual Designer', 'on-track', 70], ['Omar Haddad', 'Design Lead', 'failing', 41]],
  product: [['Grace Liu', 'Product Manager', 'growth', 88], ['Ethan Cole', 'Product Owner', 'on-track', 74], ['Hannah Weiss', 'Business Analyst', 'on-track', 66], ['Lucas Moreau', 'Product Ops', 'failing', 38], ['Ava Brooks', 'Product Marketer', 'on-track', 80]],
  data: [['Noah Fischer', 'Data Engineer', 'growth', 94], ['Zoe Kim', 'Data Scientist', 'on-track', 83], ['Ivan Petrov', 'ML Engineer', 'on-track', 77]],
  marketing: [['Chloe Martin', 'Marketing Lead', 'on-track', 72], ['Diego Ramos', 'Content Writer', 'failing', 35], ['Ella Novak', 'SEO Specialist', 'growth', 90], ['Sam Turner', 'Social Media Manager', 'on-track', 68]],
  operations: [['Ruth Adler', 'Operations Manager', 'on-track', 75], ['Victor Lindgren', 'Office Manager', 'on-track', 64], ['Maya Singh', 'People Partner', 'growth', 87], ['Tom Becker', 'IT Support', 'failing', 44]],
}
const sampleMembers = Object.entries(teamMembers).flatMap(([teamId, list]) =>
  list.map(([name, role, status, progress], i) => ({ kind: 'employee', name, role, status, progress, teamId, image: IMAGES[i % IMAGES.length], sample: true })),
)

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const seen = {}
export const people = [...candidates, ...employees, ...sampleMembers].map(p => {
  const base = slug(p.name)
  seen[base] = (seen[base] ?? 0) + 1
  return { ...p, id: seen[base] === 1 ? base : `${base}-${seen[base]}` }
})

export const personById = id => people.find(p => p.id === id)
export const candidatesIn = stage => people.filter(p => p.kind === 'candidate' && p.stage === stage)
export const membersOf = teamId => people.filter(p => p.kind === 'employee' && p.teamId === teamId)
// The Employees page's list: Figma's ten (the sample members of the other teams aren't listed there).
export const allEmployees = people.filter(p => p.kind === 'employee' && !p.sample)

// The Employees page filters (Figma: all-teams-employees). The status chips match the employees' statuses;
// the curator dropdown has no data yet (no action for now).
export const employeeFilters = {
  status: {
    label: 'Status:',
    options: [
      { value: 'all', label: 'All' },
      { value: 'on-track', label: 'On track' },
      { value: 'growth', label: 'Rocket growth' },
      { value: 'failing', label: 'Failing' },
    ],
  },
  curator: { label: 'Choose curator', placeholder: 'Choose curator', options: [] },
}

// People (Figma: the Kanban on hiring-campaign, the team on all-teams-one, the list on all-teams-employees).
// Each has a unique `id` (used in /people/:id): the name in kebab-case, plus -2, -3… for repeated names.
// candidates: `stage` is their Kanban column (applied | screening | interview | offer).
// employees: `teamId` is their team, `status` their ProfileCard status.

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
  ['Sarah Johnson', 'Senior Developer', 'On Track'],
  ['Michael Smith', 'Product Manager', 'Rocket Growth'],
  ['Emily Davis', 'UX Designer', 'On Track'],
  ['David Brown', 'QA Engineer', 'Rocket Growth'],
  ['Linda Garcia', 'Data Analyst', 'On Track'],
  ['James Wilson', 'Software Engineer', 'Failing'],
  ['Alice Thompson', 'Marketing Specialist', 'On Track'],
  ['Robert Martinez', 'Sales Executive', 'Failing'],
  ['Jessica Taylor', 'Content Strategist', 'On Track'],
  ['Charles Lee', 'Systems Analyst', 'Failing'],
].map(([name, role, status]) => ({ kind: 'employee', name, role, status, teamId: 'engineering', image: 'katya' }))

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const seen = {}
export const people = [...candidates, ...employees].map(p => {
  const base = slug(p.name)
  seen[base] = (seen[base] ?? 0) + 1
  return { ...p, id: seen[base] === 1 ? base : `${base}-${seen[base]}` }
})

export const personById = id => people.find(p => p.id === id)
export const candidatesIn = stage => people.filter(p => p.kind === 'candidate' && p.stage === stage)
export const membersOf = teamId => people.filter(p => p.kind === 'employee' && p.teamId === teamId)
export const allEmployees = people.filter(p => p.kind === 'employee')

import { nbsp } from '../lib/nbsp'

// Hiring campaign tasks (Figma: TaskItem on hiring-campaign-add). state: default = done (filled flag,
// grey title), active = to do.
export const campaignTasks = [
  { id: 'budget', title: nbsp('Confirm budget allocation'), state: 'default', showButton: false, showError: false },
  {
    id: 'role',
    title: nbsp('Define role requirements and job description'),
    state: 'default',
    showButton: true,
    buttonLabel: 'Job description',
    showError: true,
    errorMessage: nbsp('Some fields need your attention'),
  },
  { id: 'post', title: nbsp('Post job to job boards'), state: 'active', showButton: true, buttonLabel: 'Job description', showError: false },
  { id: 'review', title: nbsp('Review applications'), state: 'active', showButton: true, buttonLabel: 'Review', showError: false },
  { id: 'interviews', title: nbsp('Conduct initial interviews'), state: 'active', showButton: false, showError: false },
  { id: 'paperwork', title: nbsp('Onboarding paperwork'), state: 'active', showButton: true, buttonLabel: 'Generate', showError: false },
]

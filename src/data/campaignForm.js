import { allEmployees } from './people'

// The new campaign's job description form (Figma: hiring-campaign-wizard). Fields per section, in order; `span: 2` takes
// the whole row; `rows`: a text area's height (9 ≈ Figma's 95px field). Labels are clearer than Figma's (which repeats
// "campaign name" and "interview duration"). The salary shows Figma's error while it's under `min`; Figma's value
// ($34 500) is under it, so the error shows at first.
// `assist` on a text area opens the "Head line" popover (Figma: hiring-campaign-wizard-viewport); its Generate
// fills the field with `generateQualifications(headLine)` (sample text).
const dates = ['24.11.2030', '15.12.2030', '31.01.2031', '28.02.2031']

export const campaignForm = {
  title: 'New Campaign',
  sections: [
    {
      id: 'details',
      title: 'Details',
      fields: [
        { type: 'text', name: 'name', label: 'Campaign name', placeholder: 'e.g. UX Researcher, Q1 2025' },
        { type: 'dropdown', name: 'department', label: 'Department', options: ['frontend-team', 'backend-team', 'design-team', 'data-team'], defaultValue: 'frontend-team' },
        { type: 'text', name: 'position', label: 'Position', placeholder: 'e.g. Senior UX Researcher' },
        { type: 'dropdown', name: 'employmentType', label: 'Employment type', options: ['Full-time', 'Part-time', 'Contract', 'Internship'], placeholder: 'Choose employment type' },
        { type: 'text', name: 'location', label: 'Location', placeholder: 'e.g. Berlin' },
        { type: 'dropdown', name: 'remote', label: 'Remote options', options: ['On-site', 'Hybrid', 'Remote'], placeholder: 'Choose remote options' },
        { type: 'textarea', name: 'description', label: 'Job description', placeholder: 'type something here', rows: 9, span: 2 },
        { type: 'text', name: 'salary', label: 'Salary', defaultValue: '$34 500', min: 40000, error: 'add more money for salary, you dumb ass' },
        { type: 'dropdown', name: 'deadline', label: 'Deadline', options: dates, defaultValue: dates[0] },
      ],
    },
    {
      id: 'requirements',
      title: 'Requirements',
      fields: [
        { type: 'skills', name: 'skills', label: 'Required skills', placeholder: 'e.g. Python, SQL, etc.', addLabel: 'Add', defaultValue: ['Python', 'SQL', 'R', 'Java'], span: 2 },
        { type: 'dropdown', name: 'experience', label: 'Experience level', options: ['Junior', 'Middle', 'Senior', 'Lead'], placeholder: 'Select experience level' },
        { type: 'dropdown', name: 'education', label: 'Education level', options: ['Any', 'Bachelor', 'Master', 'PhD'], placeholder: 'Select education level' },
        {
          type: 'textarea',
          name: 'qualifications',
          label: 'Preferred qualifications',
          placeholder: 'type something here',
          rows: 9,
          span: 2,
          assist: { title: 'Generate qualifications', label: 'Head line', placeholder: 'type something here', actionLabel: 'Generate' },
        },
        { type: 'dropdown', name: 'rounds', label: 'Interview rounds', options: ['1 round', '2 rounds', '3 rounds', '4 rounds'], placeholder: 'Choose interview rounds' },
        { type: 'dropdown', name: 'duration', label: 'Interview duration in minutes', options: ['30 mins', '45 mins', '60 mins', '90 mins'], defaultValue: '30 mins' },
        { type: 'dropdown', name: 'hiringTeam', label: 'Hiring team', options: ['developers', 'designers', 'product', 'data'], defaultValue: 'developers' },
        { type: 'dropdown', name: 'teamMember', label: 'Team member', options: allEmployees.slice(0, 6).map(p => p.name), placeholder: 'Select team member' },
      ],
    },
  ],
  publishLabel: 'Publish',
}

// Sample text for the "Head line" popover's Generate.
export const generateQualifications = headLine =>
  `${headLine.trim() ? `${headLine.trim()}. ` : ''}Experience with design systems and component libraries, comfortable presenting work to stakeholders, and a portfolio of shipped products.`

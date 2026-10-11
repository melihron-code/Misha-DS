// Hiring pipeline (Figma: KanbanBoard on hiring-campaign). Each person opens their candidate page.
const person = (name, role, image = 'katya') => ({
  name,
  role,
  image,
  href: `/candidates/${name.toLowerCase().replace(/\s+/g, '-')}`,
})

export const pipeline = [
  {
    id: 'applied',
    title: 'Applied',
    people: [
      person('Michael Thompson', 'Product Manager', 'petya'),
      person('Emily Carter', 'UX Designer'),
      person('James Wilson', 'Data Analyst', 'petya'),
      person('Olivia Brown', 'Marketing Specialist'),
    ],
  },
  {
    id: 'screening',
    title: 'Screening',
    people: [
      person('Michael Thompson', 'Project Manager', 'petya'),
      person('Emily Davis', 'UX Designer'),
      person('David Garcia', 'Data Analyst', 'petya'),
      person('Jessica Martinez', 'Marketing Specialist'),
      person('Daniel Lee', 'Systems Administrator', 'dog'),
      person('Laura Wilson', 'Product Owner'),
    ],
  },
  {
    id: 'interview',
    title: 'Interview',
    people: [
      person('Michael Thompson', 'Product Manager', 'petya'),
      person('Jessica Williams', 'UI/UX Designer'),
      person('David Brown', 'Data Scientist', 'dog'),
    ],
  },
  {
    id: 'offer',
    title: 'Offer',
    people: [person('Sophia Martinez', 'UX Designer')],
  },
]

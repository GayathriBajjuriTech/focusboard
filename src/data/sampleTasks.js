export const STATUSES = ['To do', 'In progress', 'Completed'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Design', 'Development', 'Testing', 'Research'];

export const sampleTasks = [
  { id: 101, title: 'Complete dashboard UI design', description: 'Finish the desktop and mobile layouts and review spacing.', category: 'Design', status: 'In progress', priority: 'High', dueDate: '2026-11-25' },
  { id: 102, title: 'Build reusable task card', description: 'Create a card with badges, status control and actions.', category: 'Development', status: 'Completed', priority: 'Medium', dueDate: '2026-11-20' },
  { id: 103, title: 'Fix API integration notes', description: 'Document how the app would connect to a future backend.', category: 'Research', status: 'To do', priority: 'Low', dueDate: '2026-11-30' },
  { id: 104, title: 'Test login-free flow', description: 'Check that the dashboard opens without any sign-in step.', category: 'Testing', status: 'Completed', priority: 'Medium', dueDate: '2026-11-18' },
  { id: 105, title: 'Prepare UI documentation', description: 'Write the README and list known limitations.', category: 'Research', status: 'In progress', priority: 'Medium', dueDate: '2026-11-27' },
  { id: 106, title: 'Review accessibility', description: 'Check labels, focus rings and keyboard navigation.', category: 'Testing', status: 'To do', priority: 'High', dueDate: '2026-11-26' },
  { id: 107, title: 'Deploy to Vercel', description: 'Push to GitHub and publish the live HTTPS link.', category: 'Development', status: 'To do', priority: 'High', dueDate: '2026-11-28' },
];

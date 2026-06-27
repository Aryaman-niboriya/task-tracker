export const PRIORITY_CONFIG = {
  low: { label: 'Low', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', icon: '▽' },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '◇' },
  high: { label: 'High', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: '△' },
};

export const STATUS_CONFIG = {
  todo: { label: 'To Do', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', dot: '#94a3b8' },
  'in-progress': { label: 'In Progress', color: '#818cf8', bg: 'rgba(129,140,248,0.12)', dot: '#818cf8' },
  completed: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', dot: '#22c55e' },
};

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'title', label: 'Title' },
];

export const DEFAULT_TASK_FORM = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  tags: '',
};

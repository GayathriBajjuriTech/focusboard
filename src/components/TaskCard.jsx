import { CalendarDays, CheckCircle2, Circle, Loader, Pencil, Trash2 } from 'lucide-react';
import { STATUSES } from '../data/sampleTasks';

const statusIcon = { 'To do': Circle, 'In progress': Loader, Completed: CheckCircle2 };
const slug = (s) => s.toLowerCase().replace(' ', '-');

export default function TaskCard({ task, onStatus, onEdit, onDelete }) {
  const Icon = statusIcon[task.status] || Circle;
  const due = new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <li className={`task ${task.status === 'Completed' ? 'task--done' : ''}`}>
      <div className="task__main">
        <h3 className="task__title">{task.title}</h3>
        {task.description && <p className="task__desc">{task.description}</p>}
        <div className="task__meta">
          <span className={`badge badge--${slug(task.status)}`}><Icon size={14} aria-hidden="true" /> {task.status}</span>
          <span className={`badge badge--p-${task.priority.toLowerCase()}`}>{task.priority} priority</span>
          <span className="badge badge--plain">{task.category}</span>
          <span className="task__due"><CalendarDays size={14} aria-hidden="true" /> Due {due}</span>
        </div>
      </div>
      <div className="task__actions">
        <label className="sr-only" htmlFor={`status-${task.id}`}>Status for {task.title}</label>
        <select id={`status-${task.id}`} value={task.status} onChange={(e) => onStatus(task.id, e.target.value)}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={18} /></button>
        <button className="icon-btn icon-btn--danger" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={18} /></button>
      </div>
    </li>
  );
}

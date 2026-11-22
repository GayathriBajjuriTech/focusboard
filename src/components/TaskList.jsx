import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, total, onStatus, onEdit, onDelete, onAdd }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <ClipboardList size={32} aria-hidden="true" />
        {total === 0 ? (
          <>
            <p>No tasks yet. Add your first task to get started.</p>
            <button className="btn btn--primary" onClick={onAdd}>Add task</button>
          </>
        ) : (
          <p>No tasks match your search or filters. Try a different keyword or reset the filters.</p>
        )}
      </div>
    );
  }
  return (
    <ul className="tasks">
      {tasks.map((t) => <TaskCard key={t.id} task={t} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />)}
    </ul>
  );
}

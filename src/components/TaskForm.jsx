import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../data/sampleTasks';

const blank = { title: '', description: '', category: CATEGORIES[0], status: 'To do', priority: 'Medium', dueDate: '' };

// One form for both create (task === null) and edit (task = existing record).
export default function TaskForm({ task, onSubmit, onCancel }) {
  const editing = Boolean(task);
  const [values, setValues] = useState(task ? { ...blank, ...task } : blank);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const title = values.title.trim();
    const next = {};
    if (!title) next.title = 'Enter a task title. Spaces alone are not enough.';
    if (!values.dueDate) next.dueDate = 'Choose a due date.';
    if (!STATUSES.includes(values.status)) next.status = 'Choose a status.';
    if (!PRIORITIES.includes(values.priority)) next.priority = 'Choose a priority.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ ...values, title, description: values.description.trim() });
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onSubmit={submit} noValidate>
        <div className="modal__head">
          <h2 id="form-title">{editing ? 'Edit task' : 'Create task'}</h2>
          <button type="button" className="icon-btn" onClick={onCancel} aria-label="Close form"><X size={20} /></button>
        </div>

        <div className="field">
          <label htmlFor="f-title">Title <span aria-hidden="true">*</span></label>
          <input id="f-title" ref={titleRef} value={values.title} onChange={set('title')} aria-required="true"
            aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'e-title' : undefined} placeholder="e.g. Write project README" />
          {errors.title && <p className="error" id="e-title" role="alert">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="f-desc">Description</label>
          <textarea id="f-desc" rows="3" value={values.description} onChange={set('description')} placeholder="Add a few details (optional)" />
        </div>

        <div className="grid2">
          <div className="field">
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={values.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <div className="field">
            <label htmlFor="f-priority">Priority</label>
            <select id="f-priority" value={values.priority} onChange={set('priority')}>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}</select>
          </div>
          <div className="field">
            <label htmlFor="f-cat">Category</label>
            <select id="f-cat" value={values.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div className="field">
            <label htmlFor="f-due">Due date <span aria-hidden="true">*</span></label>
            <input id="f-due" type="date" value={values.dueDate} onChange={set('dueDate')} aria-required="true"
              aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? 'e-due' : undefined} />
            {errors.dueDate && <p className="error" id="e-due" role="alert">{errors.dueDate}</p>}
          </div>
        </div>

        <div className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn--primary">{editing ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </div>
  );
}

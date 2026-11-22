import { useMemo, useState } from 'react';
import { CheckCircle2, ListTodo, Loader, Percent } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';
import useLocalStorage from './hooks/useLocalStorage';
import { sampleTasks } from './data/sampleTasks';

export default function App() {
  // Single source of truth: the complete task list, persisted to localStorage.
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  // Derived values: never stored, always computed from `tasks`.
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, percent };
  }, [tasks]);

  const q = query.trim().toLowerCase();
  const matchesBase = (t) =>
    t.title.toLowerCase().includes(q) && (priority === 'All' || t.priority === priority);

  const visible = tasks.filter((t) => matchesBase(t) && (status === 'All' || t.status === status));
  const counts = {
    All: tasks.filter(matchesBase).length,
    'To do': tasks.filter((t) => matchesBase(t) && t.status === 'To do').length,
    'In progress': tasks.filter((t) => matchesBase(t) && t.status === 'In progress').length,
    Completed: tasks.filter((t) => matchesBase(t) && t.status === 'Completed').length,
  };
  const dirty = q !== '' || status !== 'All' || priority !== 'All';
  const resetFilters = () => { setQuery(''); setStatus('All'); setPriority('All'); };

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (task) => { setEditing(task); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditing(null); };

  const saveTask = (values) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...values, id: t.id } : t)));
    } else {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setTasks((prev) => [{ ...values, id }, ...prev]);
    }
    closeForm();
  };

  const changeStatus = (id, next) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="app" id="top">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="content">
        <Header onMenu={() => setNavOpen(true)} menuOpen={navOpen} onNew={openCreate} />
        <main>
          <section className="stats" aria-label="Overview statistics">
            <StatCard title="Total tasks" value={stats.total} note="Across all projects" icon={ListTodo} tone="total" />
            <StatCard title="In progress" value={stats.inProgress} note="Keep the momentum" icon={Loader} tone="progress" />
            <StatCard title="Completed" value={stats.completed} note="Great work this week" icon={CheckCircle2} tone="done" />
            <StatCard title="Completion" value={`${stats.percent}%`} icon={Percent} tone="pct">
              <div className="bar" role="progressbar" aria-valuenow={stats.percent} aria-valuemin="0" aria-valuemax="100" aria-label="Completion">
                <span style={{ width: `${stats.percent}%` }} />
              </div>
            </StatCard>
          </section>

          <FocusNotes />

          <section className="board" aria-labelledby="tasks-h">
            <div className="board__head">
              <div>
                <h2 id="tasks-h">My tasks</h2>
                <p className="muted">Manage and track everything in one place.</p>
              </div>
              <button className="btn btn--soft" onClick={resetFilters}>View all tasks</button>
            </div>
            <SearchBar value={query} onChange={setQuery} />
            <FilterTabs status={status} onStatus={setStatus} priority={priority} onPriority={setPriority}
              counts={counts} onReset={resetFilters} dirty={dirty} />
            <TaskList tasks={visible} total={tasks.length} onStatus={changeStatus} onEdit={openEdit} onDelete={setDeleting} onAdd={openCreate} />
          </section>
        </main>
      </div>

      {formOpen && <TaskForm task={editing} onSubmit={saveTask} onCancel={closeForm} />}
      {deleting && <ConfirmDialog task={deleting} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />}
    </div>
  );
}
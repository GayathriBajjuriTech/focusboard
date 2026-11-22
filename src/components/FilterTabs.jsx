import { RotateCcw } from 'lucide-react';
import { PRIORITIES, STATUSES } from '../data/sampleTasks';

export default function FilterTabs({ status, onStatus, priority, onPriority, counts, onReset, dirty }) {
  const tabs = ['All', ...STATUSES];
  return (
    <div className="filters">
      <div className="tabs" role="group" aria-label="Filter by status">
        {tabs.map((t) => (
          <button key={t} className={`tab ${status === t ? 'tab--on' : ''}`} aria-pressed={status === t} onClick={() => onStatus(t)}>
            {t} <span className="tab__count">{counts[t]}</span>
          </button>
        ))}
      </div>
      <div className="filters__right">
        <label htmlFor="priority-filter" className="sr-only">Filter by priority</label>
        <select id="priority-filter" value={priority} onChange={(e) => onPriority(e.target.value)}>
          <option value="All">All priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p} priority</option>)}
        </select>
        <button className="btn btn--ghost" onClick={onReset} disabled={!dirty}>
          <RotateCcw size={16} aria-hidden="true" /> Reset filters
        </button>
      </div>
    </div>
  );
}

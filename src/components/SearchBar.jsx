import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="task-search" className="sr-only">Search tasks by title</label>
      <Search size={18} aria-hidden="true" />
      <input id="task-search" type="search" placeholder="Search tasks by title" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

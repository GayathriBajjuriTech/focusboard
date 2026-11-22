import { CalendarDays, CheckSquare, LayoutDashboard, Settings, X } from 'lucide-react';

const items = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My tasks', icon: CheckSquare },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`} id="site-nav">
        <div className="sidebar__brand">
          <span className="logo" aria-hidden="true">F</span>
          <span>FocusBoard</span>
          <button className="icon-btn sidebar__close" onClick={onClose} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>
        <p className="side-label" id="ws-label">WORKSPACE</p>
        <nav aria-labelledby="ws-label">
          <ul>
            {items.map(({ label, icon: Icon }, i) => (
              <li key={label}>
                <a href="#top" className="nav-link" aria-current={i === 0 ? 'page' : undefined} onClick={onClose}>
                  <Icon size={18} aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
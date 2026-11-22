import { Bell, Menu, Plus } from 'lucide-react';

export default function Header({ onMenu, menuOpen, onNew }) {
  return (
    <header className="topbar">
      <div className="topbar__row">
        <button className="icon-btn topbar__menu" onClick={onMenu} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="site-nav">
          <Menu size={22} />
        </button>
        <p className="crumbs">Workspace <span aria-hidden="true">/</span> <strong>Overview</strong></p>
        <div className="topbar__actions">
          <button className="icon-btn" aria-label="Notifications"><Bell size={20} /></button>
          <span className="avatar" role="img" aria-label="Your profile">YO</span>
        </div>
      </div>
      <div className="hero">
        <div>
          <h1>Your work, in focus.</h1>
          <p className="muted">Plan your day, stay organized, and celebrate small wins.</p>
        </div>
        <button className="btn btn--primary" onClick={onNew}>
          <Plus size={18} aria-hidden="true" /> New task
        </button>
      </div>
    </header>
  );
}
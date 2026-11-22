export default function StatCard({ title, value, note, icon: Icon, tone, children }) {
  return (
    <article className={`stat stat--${tone}`}>
      <span className="stat__icon" aria-hidden="true"><Icon size={20} /></span>
      <div>
        <p className="stat__label">{title}</p>
        <p className="stat__value">{value}</p>
        {note && <p className="stat__note">{note}</p>}
        {children}
      </div>
    </article>
  );
}
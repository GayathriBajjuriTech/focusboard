import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { title: 'Make today count.', text: 'A little focus goes a long way.', tag: 'NEXT UP', task: 'Design landing page', percent: 62 },
  { title: 'Small steps, big progress.', text: 'Keep your priorities in view.', tag: 'IN PROGRESS', task: 'Fix navigation', percent: 67 },
  { title: 'Celebrate the wins.', text: 'Every completed task moves you forward.', tag: 'COMPLETED', task: 'Onboarding copy', percent: 100 },
];

const pad = (n) => String(n).padStart(2, '0');

export default function FocusNotes() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);
  const slide = slides[active];

  return (
    <section className="notes" aria-roledescription="carousel" aria-label="Focus notes">
      <div className="notes__body" aria-live="polite">
        <p className="notes__meta">
          <span>FOCUS NOTES</span>
          <span>{pad(active + 1)} / {pad(slides.length)}</span>
        </p>
        <h2>{slide.title}</h2>
        <p className="notes__text">{slide.text}</p>
        <div className="segs">
          {slides.map((s, i) => (
            <button
              key={s.title}
              className={`seg ${i === active ? 'seg--on' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === active ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      <div className="notes__card" aria-hidden="true">
        <span className="notes__check"><Check size={18} /></span>
        <div className="notes__cardbody">
          <p className="notes__tag">{slide.tag}</p>
          <p className="notes__task">{slide.task}</p>
          <div className="notes__row">
            <span className="track"><span style={{ width: `${slide.percent}%` }} /></span>
            <span className="notes__pct">{slide.percent}%</span>
          </div>
        </div>
      </div>

      <div className="notes__btns">
        <button className="round round--prev" onClick={prev} aria-label="Previous slide"><ChevronLeft size={22} /></button>
        <button className="round round--next" onClick={next} aria-label="Next slide"><ChevronRight size={22} /></button>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal--small" role="alertdialog" aria-modal="true" aria-labelledby="del-title" aria-describedby="del-desc">
        <h2 id="del-title">Delete this task?</h2>
        <p id="del-desc">“{task.title}” will be removed permanently. This cannot be undone.</p>
        <div className="modal__foot">
          <button ref={cancelRef} className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Delete task</button>
        </div>
      </div>
    </div>
  );
}

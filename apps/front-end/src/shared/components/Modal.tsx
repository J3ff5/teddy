import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

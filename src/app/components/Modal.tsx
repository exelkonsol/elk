import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  data: { title: string; body: string } | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (data) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/88 transition-opacity duration-300 ${
        data ? 'opacity-100 backdrop-blur-xl' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex h-[min(84vh,42rem)] min-h-[22rem] w-full max-w-3xl flex-col rounded-xl border border-[var(--border)] border-t-2 border-t-[var(--gold)] bg-[var(--card)] p-6 sm:p-9 transition-all duration-300"
        style={{
          boxShadow: 'var(--shadow-card)',
          transform: data ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[var(--text3)] transition-colors hover:text-[var(--text)]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="mb-5 pr-8 font-['Cinzel'] text-3xl font-semibold" style={{ color: 'var(--text)' }}>
          {data.title}
        </h2>
        <div
          className="prose prose-invert max-w-none flex-1 overflow-y-auto pr-1 font-['Crimson_Text'] text-lg leading-relaxed"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>
    </div>
  );
};

export default Modal;

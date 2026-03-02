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
      className={`fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/88 transition-opacity duration-300 ${
        data ? 'opacity-100 backdrop-blur-xl' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] border-t-[var(--gold)] border-t-2 rounded-xl max-w-2xl w-full p-9 max-h-[90vh] overflow-y-auto transition-all duration-300"
        style={{
          boxShadow: 'var(--shadow-card)',
          transform: data ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text3)] hover:text-[var(--text)] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-['Cinzel'] text-3xl font-semibold mb-5" style={{ color: 'var(--text)' }}>
          {data.title}
        </h2>
        <div
          className="font-['Crimson_Text'] text-lg leading-relaxed prose prose-invert max-w-none"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>
    </div>
  );
};

export default Modal;

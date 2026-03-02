import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      id="toast"
      role="status"
      aria-live="polite"
      className={`fixed bottom-[90px] left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full z-[200] font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
      style={{ color: 'var(--text3)' }}
    >
      {message}
    </div>
  );
};

export default Toast;

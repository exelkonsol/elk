import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  displayToast: (message: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ displayToast }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  const copyCA = () => {
    const ca = '8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ca).then(() => displayToast('CA COPIED'));
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = ['top', 'chart', 'mechanisms', 'manifesto', 'soundscape'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.25, rootMargin: '-68px 0px -40% 0px' }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center transition-all duration-300 backdrop-blur-[20px]"
        style={{
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between">
            <a
              href="#top"
              className="font-['Cinzel'] font-bold text-[1.1rem] tracking-[0.3em] uppercase hover:text-[var(--gold)] transition-colors"
              style={{ color: 'var(--text)' }}
            >
              $ELK
            </a>

            <div className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
              {[
                { href: '#top', label: 'Home', id: 'top' },
                { href: '#chart', label: 'Chart', id: 'chart' },
                { href: '#mechanisms', label: 'Mechanisms', id: 'mechanisms' },
                { href: '#manifesto', label: 'Quotes', id: 'manifesto' },
                { href: '#soundscape', label: 'Soundscape', id: 'soundscape' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`font-['JetBrains_Mono'] text-[0.62rem] tracking-[0.3em] uppercase transition-colors py-1 relative ${
                    activeSection === link.id ? 'text-[var(--text2)]' : 'text-[var(--text3)]'
                  } hover:text-[var(--text)] ${activeSection === link.id ? 'after:scale-x-100' : 'after:scale-x-0'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[var(--gold)] after:transition-transform after:duration-300`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"
                title="Voting status"
              />
              <button
                onClick={copyCA}
                className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.15em] uppercase px-3 py-2 rounded border min-h-[36px] transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  color: 'var(--text3)',
                  borderColor: 'var(--border)',
                }}
              >
                <span className="hidden sm:inline">8DaLP…Gpump</span>
                <span className="sm:hidden">CA</span>
              </button>

              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 h-[34px] px-3 rounded-full border transition-all hover:border-[var(--gold)] hover:shadow-[0_0_12px_var(--gold-dim)] relative overflow-hidden"
                style={{
                  borderColor: 'var(--border2)',
                  background: 'var(--card2)',
                  color: 'var(--text3)',
                }}
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-br from-[var(--gold-dim)] to-transparent" />
                {theme === 'dark' ? <Moon className="w-3 h-3 relative z-10" /> : <Sun className="w-3 h-3 relative z-10" />}
                <span className="hidden sm:inline font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.12em] uppercase relative z-10">
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
                <div className="relative z-10 w-7 h-4 rounded-full border flex items-center" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                    style={{
                      background: theme === 'light' ? 'var(--gold)' : 'var(--text3)',
                      transform: theme === 'light' ? 'translateX(12px)' : 'translateX(2px)',
                    }}
                  />
                </div>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1"
                aria-label="Menu"
              >
                <span className={`block w-5 h-0.5 bg-[var(--text3)] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--text3)] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--text3)] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-[99] flex flex-col gap-1 p-4 backdrop-blur-[20px] transition-all duration-300 ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { href: '#top', label: 'Home' },
          { href: '#chart', label: 'Chart' },
          { href: '#mechanisms', label: 'Mechanisms' },
          { href: '#manifesto', label: 'Quotes' },
          { href: '#soundscape', label: 'Soundscape' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMobileMenu}
            className="font-['JetBrains_Mono'] text-[0.68rem] tracking-[0.25em] uppercase px-4 py-3 rounded-md min-h-[44px] flex items-center transition-all hover:bg-[rgba(255,255,255,0.04)]"
            style={{ color: 'var(--text3)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navigation;

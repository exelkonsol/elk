import React from 'react';
import { Twitter, Users, Activity, Link as LinkIcon } from 'lucide-react';

interface FooterProps {
  displayToast: (message: string) => void;
}

const Footer: React.FC<FooterProps> = ({ displayToast }) => {
  const copyCA = () => {
    const ca = '8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump';
    navigator.clipboard.writeText(ca).then(() => displayToast('CA COPIED'));
  };

  return (
    <footer
      className="relative overflow-hidden py-20 sm:py-24 px-6 min-h-[340px]"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="footer-bg absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            backgroundImage: "url('https://raw.githubusercontent.com/exelkonsol/elk/main/images/newpreview.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(1) contrast(1.05) brightness(1.1)',
            opacity: 0.28,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 75% at 50% 50%, transparent 0%, transparent 35%, rgba(var(--bg-rgb), 0.55) 65%, var(--bg) 100%)`,
          }}
        />
      </div>

      <div className="relative z-20 max-w-2xl mx-auto text-center space-y-10">
        <blockquote
          className="font-['Crimson_Text'] text-base sm:text-lg leading-relaxed italic px-4"
          style={{ color: 'var(--text3)' }}
        >
          "The antlers are heavy. We carry them together."
        </blockquote>

        <div className="flex justify-center gap-8">
          <a
            href="https://x.com/ElkBurden"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[var(--text2)]"
            style={{ color: 'var(--text4)' }}
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/i/communities/2014904566983094598"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Community"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[var(--text2)]"
            style={{ color: 'var(--text4)' }}
          >
            <Users className="w-5 h-5" />
          </a>
          <a
            href="https://birdeye.so/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump?chain=solana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chart"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[var(--text2)]"
            style={{ color: 'var(--text4)' }}
          >
            <Activity className="w-5 h-5" />
          </a>
          <a
            href="https://solscan.io/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solscan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[var(--text2)]"
            style={{ color: 'var(--text4)' }}
          >
            <LinkIcon className="w-5 h-5" />
          </a>
        </div>

        <div>
          <button
            onClick={copyCA}
            className="font-['JetBrains_Mono'] text-[0.6rem] tracking-widest break-all transition-colors hover:text-[var(--text3)]"
            style={{ color: 'var(--text4)' }}
          >
            8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump
          </button>
          <p
            className="font-['JetBrains_Mono'] text-[0.55rem] tracking-widest uppercase mt-4"
            style={{ color: 'var(--text5)' }}
          >
            © 2025 $ELK — The Burden We Carry Together
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

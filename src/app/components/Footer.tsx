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
        background: '#0a0a0b',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="footer-bg absolute inset-0 pointer-events-none">

        {/* Layer 1 — deep blur bloom, very low opacity for ambient color */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://raw.githubusercontent.com/exelkonsol/elk/main/images/newpreview.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 52%',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(90px) saturate(1.1) brightness(0.7)',
            transform: 'scale(1.25)',
            opacity: 0.18,
          }}
        />

        {/* Layer 2 — main image, tightly masked with a wide soft radial fade */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://raw.githubusercontent.com/exelkonsol/elk/main/images/newpreview.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center 52%',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(1.0) contrast(0.97) brightness(0.88)',
            opacity: 0.58,
            WebkitMaskImage: [
              'radial-gradient(ellipse 72% 90% at 50% 52%,',
              '  rgba(0,0,0,1)   0%,',
              '  rgba(0,0,0,0.92) 28%,',
              '  rgba(0,0,0,0.72) 48%,',
              '  rgba(0,0,0,0.38) 64%,',
              '  rgba(0,0,0,0.12) 78%,',
              '  rgba(0,0,0,0.00) 90%)',
            ].join(''),
            maskImage: [
              'radial-gradient(ellipse 72% 90% at 50% 52%,',
              '  rgba(0,0,0,1)   0%,',
              '  rgba(0,0,0,0.92) 28%,',
              '  rgba(0,0,0,0.72) 48%,',
              '  rgba(0,0,0,0.38) 64%,',
              '  rgba(0,0,0,0.12) 78%,',
              '  rgba(0,0,0,0.00) 90%)',
            ].join(''),
          }}
        />

        {/* Layer 3 — top & bottom linear fade to kill any remaining hard edges */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              '  #0a0a0b               0%,',
              '  rgba(10,10,11,0.60)  10%,',
              '  rgba(10,10,11,0.00)  28%,',
              '  rgba(10,10,11,0.00)  70%,',
              '  rgba(10,10,11,0.60)  88%,',
              '  #0a0a0b              100%)',
              ',',
              'linear-gradient(to right,',
              '  #0a0a0b               0%,',
              '  rgba(10,10,11,0.55)  10%,',
              '  rgba(10,10,11,0.00)  26%,',
              '  rgba(10,10,11,0.00)  74%,',
              '  rgba(10,10,11,0.55)  90%,',
              '  #0a0a0b              100%)',
            ].join(''),
          }}
        />
      </div>

      <div className="relative z-20 max-w-2xl mx-auto text-center space-y-10">
        <blockquote
          className="font-['Crimson_Text'] text-base sm:text-lg leading-relaxed italic px-4"
          style={{ color: 'rgba(230,222,210,0.45)' }}
        >
          "The antlers are heavy. We carry them together."
        </blockquote>

        <div className="flex justify-center gap-8">
          <a
            href="https://x.com/ElkBurden"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#c8c0b4]"
            style={{ color: 'rgba(230,222,210,0.22)' }}
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/i/communities/2014904566983094598"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Community"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#c8c0b4]"
            style={{ color: 'rgba(230,222,210,0.22)' }}
          >
            <Users className="w-5 h-5" />
          </a>
          <a
            href="https://birdeye.so/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump?chain=solana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chart"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#c8c0b4]"
            style={{ color: 'rgba(230,222,210,0.22)' }}
          >
            <Activity className="w-5 h-5" />
          </a>
          <a
            href="https://solscan.io/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solscan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#c8c0b4]"
            style={{ color: 'rgba(230,222,210,0.22)' }}
          >
            <LinkIcon className="w-5 h-5" />
          </a>
        </div>

        <div>
          <button
            onClick={copyCA}
            className="font-['JetBrains_Mono'] text-[0.6rem] tracking-widest break-all transition-colors hover:text-[rgba(230,222,210,0.45)]"
            style={{ color: 'rgba(230,222,210,0.22)' }}
          >
            8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump
          </button>
          <p
            className="font-['JetBrains_Mono'] text-[0.55rem] tracking-widest uppercase mt-4"
            style={{ color: 'rgba(230,222,210,0.12)' }}
          >
            (c) 2025 $ELK - The Burden We Carry Together
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

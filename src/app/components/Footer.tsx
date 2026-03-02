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

  const IMAGE_URL =
    'https://raw.githubusercontent.com/exelkonsol/elk/main/images/newpreview.png';

  const radialMask = [
    'radial-gradient(ellipse 70% 78% at 50% 50%,',
    '  #000 0%,',
    '  rgba(0,0,0,0.95) 20%,',
    '  rgba(0,0,0,0.80) 36%,',
    '  rgba(0,0,0,0.52) 52%,',
    '  rgba(0,0,0,0.22) 66%,',
    '  rgba(0,0,0,0.06) 78%,',
    '  transparent 88%)',
  ].join('');

  return (
    <footer
      className="relative overflow-hidden py-20 sm:py-28 px-6 min-h-[380px] sm:min-h-[440px]"
      style={{
        background: '#0a0a0b',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* ── BACKGROUND LAYERS ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">

        {/* Layer 1 — blurred ambient bloom, extended beyond bounds */}
        <div
          className="absolute inset-[-20%]"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(120px) saturate(1.1) brightness(0.5)',
            opacity: 0.10,
          }}
        />

        {/* Layer 2 — <img> with mask applied directly on the element.
            This is the KEY fix: mask tracks the actual image dimensions,
            not the container, so no edge lines survive at any viewport. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={IMAGE_URL}
            alt=""
            aria-hidden="true"
            className="w-full h-full"
            style={{
              objectFit: 'contain',
              objectPosition: 'center 50%',
              filter: 'saturate(0.92) brightness(0.75)',
              opacity: 0.38,
              WebkitMaskImage: radialMask,
              maskImage: radialMask,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              display: 'block',
            }}
          />
        </div>

        {/* Layer 3 — four-directional hard edge kill, extra aggressive */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.92) 7%,',
              '  rgba(10,10,11,0.40) 20%,',
              '  transparent 35%)',
              ',',
              'linear-gradient(to top,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.92) 7%,',
              '  rgba(10,10,11,0.40) 20%,',
              '  transparent 35%)',
              ',',
              'linear-gradient(to right,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.95) 5%,',
              '  rgba(10,10,11,0.55) 14%,',
              '  rgba(10,10,11,0.18) 26%,',
              '  transparent 38%)',
              ',',
              'linear-gradient(to left,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.95) 5%,',
              '  rgba(10,10,11,0.55) 14%,',
              '  rgba(10,10,11,0.18) 26%,',
              '  transparent 38%)',
            ].join(''),
          }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────── */}
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

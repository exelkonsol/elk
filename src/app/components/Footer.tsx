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

  // Upload newfooter.jpg to your repo/CDN and replace this URL
  const IMAGE_URL =
    'https://raw.githubusercontent.com/exelkonsol/elk/main/images/newfooter.jpg';

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

        {/* Layer 1 — soft ambient bloom behind everything */}
        <div
          className="absolute inset-[-10%]"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(80px) saturate(1.2) brightness(0.55)',
            opacity: 0.18,
          }}
        />

        {/* Layer 2 — main image, cover fill, light radial fade on edges only */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(0.95) brightness(0.82)',
            opacity: 0.52,
            // Gentle radial fade — image already has black edges so
            // we only need a soft vignette, not an aggressive crop mask
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 88% at 50% 50%, #000 0%, #000 38%, rgba(0,0,0,0.88) 56%, rgba(0,0,0,0.50) 74%, rgba(0,0,0,0.14) 88%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 90% 88% at 50% 50%, #000 0%, #000 38%, rgba(0,0,0,0.88) 56%, rgba(0,0,0,0.50) 74%, rgba(0,0,0,0.14) 88%, transparent 100%)',
          }}
        />

        {/* Layer 3 — edge reinforcement, especially top/bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.75) 6%,',
              '  rgba(10,10,11,0.18) 18%,',
              '  transparent 32%)',
              ',',
              'linear-gradient(to top,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.75) 6%,',
              '  rgba(10,10,11,0.18) 18%,',
              '  transparent 32%)',
              ',',
              'linear-gradient(to right,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.60) 4%,',
              '  rgba(10,10,11,0.12) 14%,',
              '  transparent 26%)',
              ',',
              'linear-gradient(to left,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.60) 4%,',
              '  rgba(10,10,11,0.12) 14%,',
              '  transparent 26%)',
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

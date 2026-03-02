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

  return (
    <footer
      className="relative overflow-hidden py-20 sm:py-28 px-6 min-h-[380px] sm:min-h-[420px]"
      style={{
        background: '#0a0a0b',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* ── BACKGROUND LAYERS ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">

        {/* Layer 1 — massive blur bloom: zero hard edges by design */}
        <div
          className="absolute inset-[-15%]"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(110px) saturate(1.15) brightness(0.55)',
            opacity: 0.13,
          }}
        />

        {/* Layer 2 — crisp image, killed on all 4 sides with a tight compound mask */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center 50%',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(0.95) brightness(0.80)',
            opacity: 0.42,
            /*
             * Two masks multiplied together:
             *  A) radial ellipse — fades the image outward from center
             *  B) linear top+bottom ramp — ensures the top & bottom
             *     borders of the image rectangle are fully dissolved
             *
             * WebKit requires the vendor-prefixed version too.
             */
            WebkitMaskImage: [
              /* A: radial fade */
              'radial-gradient(ellipse 62% 82% at 50% 50%,',
              '  #000 0%, #000 22%,',
              '  rgba(0,0,0,0.88) 38%,',
              '  rgba(0,0,0,0.60) 54%,',
              '  rgba(0,0,0,0.28) 68%,',
              '  rgba(0,0,0,0.08) 80%,',
              '  transparent 92%)',
            ].join(''),
            maskImage: [
              'radial-gradient(ellipse 62% 82% at 50% 50%,',
              '  #000 0%, #000 22%,',
              '  rgba(0,0,0,0.88) 38%,',
              '  rgba(0,0,0,0.60) 54%,',
              '  rgba(0,0,0,0.28) 68%,',
              '  rgba(0,0,0,0.08) 80%,',
              '  transparent 92%)',
            ].join(''),
          }}
        />

        {/* Layer 3 — solid color bleeds from ALL four edges inward,
            completely burying whatever the mask leaves behind */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              /* top bleed */
              'linear-gradient(to bottom,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.85) 8%,',
              '  rgba(10,10,11,0.30) 22%,',
              '  transparent 38%)',
              ',',
              /* bottom bleed */
              'linear-gradient(to top,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.85) 8%,',
              '  rgba(10,10,11,0.30) 22%,',
              '  transparent 38%)',
              ',',
              /* left bleed */
              'linear-gradient(to right,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.80) 6%,',
              '  rgba(10,10,11,0.25) 18%,',
              '  transparent 32%)',
              ',',
              /* right bleed */
              'linear-gradient(to left,',
              '  #0a0a0b 0%,',
              '  rgba(10,10,11,0.80) 6%,',
              '  rgba(10,10,11,0.25) 18%,',
              '  transparent 32%)',
            ].join(''),
          }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
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

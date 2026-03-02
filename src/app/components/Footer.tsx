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
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            backgroundImage: "url('https://raw.githubusercontent.com/exelkonsol/elk/main/images/newpreview.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(1.08) contrast(1.02) brightness(1.02)',
            opacity: 0.88,
            WebkitMaskImage:
              'radial-gradient(ellipse 92% 84% at 50% 52%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.76) 78%, rgba(0,0,0,0.08) 100%)',
            maskImage:
              'radial-gradient(ellipse 92% 84% at 50% 52%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.76) 78%, rgba(0,0,0,0.08) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 88% 80% at 50% 52%, rgba(10,10,11,0.04) 0%, rgba(10,10,11,0.24) 58%, rgba(10,10,11,0.56) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.18) 18%, rgba(10,10,11,0.18) 82%, rgba(10,10,11,0.92) 100%),
              linear-gradient(to bottom, rgba(10,10,11,0.94) 0%, rgba(10,10,11,0.16) 20%, rgba(10,10,11,0.16) 74%, rgba(10,10,11,0.96) 100%),
              radial-gradient(circle at 0% 0%, rgba(10,10,11,0.56) 0%, rgba(10,10,11,0) 44%),
              radial-gradient(circle at 100% 0%, rgba(10,10,11,0.56) 0%, rgba(10,10,11,0) 44%),
              radial-gradient(circle at 0% 100%, rgba(10,10,11,0.66) 0%, rgba(10,10,11,0) 46%),
              radial-gradient(circle at 100% 100%, rgba(10,10,11,0.66) 0%, rgba(10,10,11,0) 46%)
            `,
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

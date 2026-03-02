import React from 'react';
import { Twitter, Users, Activity, Link as LinkIcon } from 'lucide-react';
import footerImage from '../../../images/footerimage.png';

interface FooterProps {
  displayToast: (message: string) => void;
}

const Footer: React.FC<FooterProps> = ({ displayToast }) => {
  const copyCA = () => {
    const ca = '8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump';
    navigator.clipboard.writeText(ca).then(() => displayToast('CA COPIED'));
  };

  const IMAGE_URL = footerImage;

  return (
    <footer
      className="relative w-full overflow-hidden aspect-[3/2] md:aspect-auto md:h-[340px] lg:h-[400px] xl:h-[460px]"
      style={{ background: '#000' }}
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 58%',
            backgroundRepeat: 'no-repeat',
            filter: 'saturate(1.04) brightness(0.94)',
            opacity: 0.98,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.14) 40%, rgba(0,0,0,0.38) 100%)',
          }}
        />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center space-y-5 sm:space-y-8">
          <blockquote
            className="font-['Crimson_Text'] text-sm sm:text-lg leading-relaxed italic px-4"
            style={{ color: 'rgba(235,228,217,0.68)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            "The antlers are heavy. We carry them together."
          </blockquote>

          <div className="flex justify-center gap-6 sm:gap-8">
            <a
              href="https://x.com/ElkBurden"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#d4c7b6]"
              style={{ color: 'rgba(235,228,217,0.56)' }}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/i/communities/2014904566983094598"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Community"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#d4c7b6]"
              style={{ color: 'rgba(235,228,217,0.56)' }}
            >
              <Users className="w-5 h-5" />
            </a>
            <a
              href="https://birdeye.so/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump?chain=solana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chart"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#d4c7b6]"
              style={{ color: 'rgba(235,228,217,0.56)' }}
            >
              <Activity className="w-5 h-5" />
            </a>
            <a
              href="https://solscan.io/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solscan"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors hover:text-[#d4c7b6]"
              style={{ color: 'rgba(235,228,217,0.56)' }}
            >
              <LinkIcon className="w-5 h-5" />
            </a>
          </div>

          <div>
            <button
              onClick={copyCA}
              className="font-['JetBrains_Mono'] text-[0.52rem] sm:text-[0.6rem] tracking-[0.16em] sm:tracking-widest break-all transition-colors hover:text-[rgba(235,228,217,0.86)]"
              style={{ color: 'rgba(235,228,217,0.70)', textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
            >
              8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump
            </button>
            <p
              className="font-['JetBrains_Mono'] text-[0.48rem] sm:text-[0.55rem] tracking-[0.18em] sm:tracking-widest uppercase mt-3 sm:mt-4"
              style={{ color: 'rgba(235,228,217,0.52)', textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
            >
              (c) 2025 $ELK - The Burden We Carry Together
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

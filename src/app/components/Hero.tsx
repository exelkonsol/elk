import React, { useState, useEffect } from 'react';

const heroQuotes = [
  { q: "The tragedy of a species becoming unfit for life by over-evolving one ability.", s: "Zapffe // The Last Messiah" },
  { q: "Man is a biological paradox, armed too heavily by spirit for his own good.", s: "Zapffe // The Last Messiah" },
  { q: "Consciousness does not calm the storm; it makes the storm legible.", s: "After Zapffe" },
  { q: "To endure ourselves, we anchor, distract, and reshape sorrow into form.", s: "After Zapffe's Four Mechanisms" },
  { q: "The task is not to erase despair, but to sublimate it into creation.", s: "After Zapffe" },
  { q: "Silence is where the unbearable starts to speak clearly.", s: "After Zapffe" },
  { q: "A burden carried consciously can become a language.", s: "After Zapffe" },
  { q: "What we call meaning is often shelter built against the cold of lucidity.", s: "After Zapffe" },
];

const Hero: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % heroQuotes.length);
        setFading(false);
      }, 300);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = heroQuotes[quoteIndex];

  return (
    <section id="top">
      <div
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6 py-24 sm:py-32 overflow-hidden"
      >
        {/* Fog Effects */}
        <div
          className="absolute pointer-events-none rounded-full z-0 w-[65vw] h-[45vw] max-w-[900px] -left-[10%] top-[20%] animate-[fog-drift-a_14s_ease-in-out_infinite_alternate]"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,26,26,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full z-0 w-[55vw] h-[40vw] max-w-[750px] -right-[10%] top-[30%] animate-[fog-drift-b_18s_ease-in-out_infinite_alternate]"
          style={{
            background: 'radial-gradient(ellipse, rgba(184,134,11,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-[860px] w-full animate-[hero-in_1.2s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="flex justify-center mb-10">
            <div className="hero-logo-wrap relative">
              <img
                src="https://raw.githubusercontent.com/exelkonsol/elk/main/images/headerlogo.png"
                alt="$ELK"
                className="hero-logo w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] object-contain select-none transition-all duration-700 hover:scale-105"
                style={{
                  filter: 'brightness(1.1) contrast(1.03) drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
                }}
                loading="eager"
              />
            </div>
          </div>

          <div className="space-y-4 mb-12 max-w-2xl mx-auto px-4">
            <p
              className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.55em] uppercase"
              style={{ color: 'var(--text4)' }}
            >
              Peter Wessel Zapffe // The Last Messiah
            </p>
            <h1
              className={`font-['Cinzel'] text-[clamp(1.1rem,3.5vw,2.2rem)] font-normal leading-relaxed transition-all duration-500 ${fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              style={{ color: 'var(--text)' }}
            >
              "{currentQuote.q}"
            </h1>
            <p
              className={`font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.3em] uppercase transition-all duration-500 ${fading ? 'opacity-0' : 'opacity-100'
                }`}
              style={{ color: 'var(--text4)' }}
            >
              {currentQuote.s}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
            <a
              href="https://pump.fun/coin/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-buy-btn inline-flex items-center justify-center font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.2em] uppercase px-7 py-4 rounded min-h-[48px] w-full sm:w-auto transition-all duration-250 hover:translate-y-[-2px]"
              style={{
                background: 'var(--red-dim)',
                borderWidth: '1px',
                borderColor: 'rgba(196,30,58,0.3)',
                color: 'rgba(220,140,150,0.9)',
                boxShadow: '0 0 0 rgba(139,26,26,0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139,26,26,0.4)';
                e.currentTarget.style.borderColor = 'rgba(196,30,58,0.55)';
                e.currentTarget.style.color = 'rgba(255,180,185,1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(139,26,26,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--red-dim)';
                e.currentTarget.style.borderColor = 'rgba(196,30,58,0.3)';
                e.currentTarget.style.color = 'rgba(220,140,150,0.9)';
                e.currentTarget.style.boxShadow = '0 0 0 rgba(139,26,26,0)';
              }}
            >
              Buy $ELK
            </a>

            <a
              href="https://x.com/i/communities/2014904566983094598"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.2em] uppercase px-6 py-4 rounded border min-h-[48px] w-full sm:w-auto transition-all hover:bg-[rgba(255,255,255,0.03)]"
              style={{
                color: 'var(--text3)',
                borderColor: 'var(--border)',
              }}
            >
              Join The Silence
            </a>

            <a
              href="https://birdeye.so/token/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump?chain=solana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.2em] uppercase px-6 py-4 rounded border min-h-[48px] w-full sm:w-auto transition-all hover:bg-[rgba(255,255,255,0.03)]"
              style={{
                color: 'var(--text3)',
                borderColor: 'var(--border)',
              }}
            >
              Live Chart
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fog-drift-a {
          0% {
            transform: translateX(-15px) translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateX(15px) translateY(-18px) scale(1.08);
            opacity: 1;
          }
        }
        @keyframes fog-drift-b {
          0% {
            transform: translateX(12px) translateY(-8px) scale(0.95);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-12px) translateY(12px) scale(1.05);
            opacity: 0.9;
          }
        }
        @keyframes hero-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(1.04);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

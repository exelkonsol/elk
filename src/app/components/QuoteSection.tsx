import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

const quotesExistential = [
  "We built machines to save time, and now we kill time staring at them, waiting for something to happen.",
  "Man is the only animal that refuses to be what he is.",
  "Anxiety is the dizziness of freedom.",
  "To live is to suffer, to survive is to find some meaning in the suffering.",
  "He who has a why to live can bear almost any how.",
  "We are condemned to be free.",
  "The struggle itself towards the heights is enough to fill a man's heart.",
  "One must imagine Sisyphus happy.",
  "The absurd is born of this confrontation between the human need and the unreasonable silence of the world.",
  "There is but one truly serious philosophical problem, and that is suicide.",
  "Freedom is what you do with what's been done to you.",
  "We are our choices.",
  "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
  "The mass of men lead lives of quiet desperation.",
  "Nothing matters very much, and most things don't matter at all.",
  "The cure for pain is in the pain.",
  "To be conscious is to be sick.",
  "The eternal silence of these infinite spaces frightens me.",
  "Every existing thing is born without reason, prolongs itself out of weakness, and dies by chance.",
  "The meaning of life is that it stops.",
  "The consciousness of the nothingness of our being is the heaviest burden we carry.",
  "God is dead! He remains dead! And we have killed him.",
  "When you look into an abyss, the abyss also gazes into you.",
  "Without music, life would be a mistake.",
  "The thought of suicide is a great consolation: by means of it one gets successfully through many a bad night.",
  "We have art in order not to die of the truth.",
];

const quotesDegen = [
  "Buy high, sell low, cry in the shower.",
  "My portfolio is red, my eyes are too.",
  "Sleep is for those without leverage.",
  "I checked the chart 400 times today, nothing changed but my sanity.",
  "WAGMI is a lie we tell ourselves to keep holding.",
  "Diamond hands? More like heavy bags.",
  "I'm in it for the tech (I'm down 90%).",
  "Liquidation emails are my morning alarm.",
  "Just one more pump, I promise I'll exit.",
  "The devs did something... they sold.",
  "Sir, your bags are leaking.",
  "My therapist accepts Solana now.",
  "I sold the bottom and bought the top, perfectly balanced.",
  "NGMI is not a state of mind, it's a lifestyle.",
  "The chart looks like my EKG after my third energy drink.",
];

const quotesElk = [
  "The antlers are heavy, but they are ours.",
  "We do not choose the burden, we only choose how to carry it.",
  "In the forest of the market, the Elk stands still.",
  "The herd survives not by speed, but by endurance.",
  "Shedding velvet is painful, but growth requires blood.",
  "The wilderness cares not for your wallet.",
  "We graze on the volatility of the world.",
  "To be an Elk is to carry the weight of the sky on your head.",
  "The clearing comes only after the thickest woods.",
  "Tracks in the snow fade, but the path remains.",
  "The mountain does not move, yet we climb it still.",
  "In silence, the herd finds its strength.",
  "The antlers are not for fighting, but for remembering.",
  "Winter tests the herd; only the patient survive.",
  "We do not run from the storm; we lower our heads and push through.",
];

type QuoteMode = 'existential' | 'degen' | 'elk';

interface QuoteSectionProps {
  displayToast: (message: string) => void;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ displayToast }) => {
  const [mode, setMode] = useState<QuoteMode>('existential');
  const [currentQuote, setCurrentQuote] = useState('');
  const [fading, setFading] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);

  const getQuotePool = () => {
    switch (mode) {
      case 'degen':
        return quotesDegen;
      case 'elk':
        return quotesElk;
      default:
        return quotesExistential;
    }
  };

  const generateQuote = () => {
    const pool = getQuotePool();
    const available = pool.map((_, i) => i).filter((i) => !history.includes(i));
    const availableIndices = available.length > 0 ? available : pool.map((_, i) => i);
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    setFading(true);
    setTimeout(() => {
      setCurrentQuote(`"${pool[randomIndex]}"`);
      setHistory([...history.slice(-50), randomIndex]);
      setFading(false);
    }, 300);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(currentQuote).then(() => displayToast('WISDOM COPIED'));
  };

  useEffect(() => {
    generateQuote();
  }, [mode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('manifesto');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="manifesto" className="py-24 sm:py-32 px-4 sm:px-6 quote-section-wrapper">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 reveal ${visible ? 'visible' : ''}`}>
          <span
            className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.55em] uppercase block mb-3"
            style={{ color: 'var(--text4)' }}
          >
            Echoes of the Present Void
          </span>
          <h2
            className="font-['Cinzel'] font-normal text-[clamp(2rem,5vw,3.5rem)] leading-tight"
            style={{ color: 'var(--text)' }}
          >
            Generate Echo
          </h2>
        </div>

        <div
          className={`relative overflow-hidden rounded-2xl reveal ${visible ? 'visible' : ''}`}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border2)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-0"
            style={{
              backgroundImage: "url('https://raw.githubusercontent.com/exelkonsol/elk/main/images/generatewisdom.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(0.4)',
            }}
          />

          <div className="relative z-10 p-12 sm:p-14 text-center min-h-[480px] flex flex-col items-center justify-center">
            <div className="flex gap-2 flex-wrap justify-center mb-9">
              {(['existential', 'degen', 'elk'] as QuoteMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded border min-h-[40px] transition-all ${mode === m ? 'border-[var(--gold)]' : 'border-[var(--border)]'
                    }`}
                  style={{
                    color: mode === m ? 'var(--text)' : 'var(--text3)',
                    background: mode === m ? 'var(--gold-dim)' : 'transparent',
                  }}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            <div
              className={`quote-text-shadow font-['Cinzel'] text-[clamp(1.05rem,2.8vw,1.8rem)] font-normal leading-relaxed max-w-[780px] min-h-[120px] flex items-center justify-center text-center mb-9 transition-all duration-450 ${fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              style={{
                color: 'var(--text)',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {currentQuote}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={generateQuote}
                className="font-['JetBrains_Mono'] text-[0.62rem] tracking-[0.25em] uppercase px-7 py-3 rounded border min-h-[44px] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold-dim)]"
                style={{
                  color: 'var(--text3)',
                  borderColor: 'var(--border2)',
                }}
              >
                Generate Echo
              </button>
              <button
                onClick={copyQuote}
                className="font-['JetBrains_Mono'] text-[0.62rem] tracking-[0.25em] uppercase px-4 py-3 rounded border min-h-[44px] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold-dim)]"
                style={{
                  color: 'var(--text3)',
                  borderColor: 'var(--border2)',
                }}
                aria-label="Copy quote"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;

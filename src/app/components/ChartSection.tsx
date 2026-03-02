import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink } from 'lucide-react';

interface ChartSectionProps {
  displayToast: (message: string) => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({ displayToast }) => {
  const [chartType, setChartType] = useState('price');
  const [resolution, setResolution] = useState('60');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const POOL = 'DMhjxjETWp4qNnQXhaojQ9h4ycf3DegJ231wKcY2c9pi';

  const buildSrc = () =>
    `https://www.geckoterminal.com/solana/pools/${POOL}?embed=1&info=0&swaps=1&light_chart=0&chart_type=${chartType}&resolution=${resolution}&bg_color=000000&chart_bg_color=000000`;

  const copyCA = () => {
    const ca = '8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump';
    navigator.clipboard.writeText(ca).then(() => displayToast('CA COPIED'));
  };

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

    const section = document.getElementById('chart');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="chart" className="py-24 sm:py-32 px-4 sm:px-6 chart-section">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 reveal ${visible ? 'visible' : ''}`}>
          <span
            className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.55em] uppercase block mb-3"
            style={{ color: 'var(--text4)' }}
          >
            On-Chain Reality
          </span>
          <h2
            className="font-['Cinzel'] font-normal text-[clamp(2rem,5vw,3.5rem)] leading-tight"
            style={{ color: 'var(--text)' }}
          >
            Live Chart
          </h2>
        </div>

        <div
          className={`reveal ${visible ? 'visible' : ''}`}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            height: '660px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2"
            style={{
              background: 'rgba(var(--bg-rgb), 0.6)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setChartType('price');
                  setLoading(true);
                }}
                className={`font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.2em] uppercase px-3 py-2 rounded border transition-all ${
                  chartType === 'price' ? 'border-[rgba(212,160,23,0.4)]' : 'border-transparent'
                }`}
                style={{
                  color: chartType === 'price' ? 'var(--text)' : 'var(--text3)',
                  background: chartType === 'price' ? 'var(--gold-dim)' : 'transparent',
                }}
              >
                Price
              </button>
              <button
                onClick={() => {
                  setChartType('market_cap');
                  setLoading(true);
                }}
                className={`font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.2em] uppercase px-3 py-2 rounded border transition-all ${
                  chartType === 'market_cap' ? 'border-[rgba(212,160,23,0.4)]' : 'border-transparent'
                }`}
                style={{
                  color: chartType === 'market_cap' ? 'var(--text)' : 'var(--text3)',
                  background: chartType === 'market_cap' ? 'var(--gold-dim)' : 'transparent',
                }}
              >
                Mkt Cap
              </button>
            </div>

            <div className="flex gap-0.5">
              {['1', '5', '15', '60', '240', '1D'].map((res) => (
                <button
                  key={res}
                  onClick={() => {
                    setResolution(res);
                    setLoading(true);
                  }}
                  className={`font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.15em] uppercase px-2.5 py-1.5 rounded transition-all ${
                    resolution === res ? 'bg-[var(--gold-dim)]' : 'bg-transparent'
                  }`}
                  style={{
                    color: resolution === res ? 'var(--gold)' : 'var(--text4)',
                  }}
                >
                  {res === '1D' ? '1D' : `${res}${res === '240' ? 'h' : 'm'}`}
                </button>
              ))}
            </div>

            <a
              href={`https://www.geckoterminal.com/solana/pools/${POOL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 font-['JetBrains_Mono'] text-[0.55rem] tracking-widest uppercase transition-colors hover:text-[var(--text3)]"
              style={{ color: 'var(--text4)' }}
            >
              <ExternalLink className="w-3 h-3" />
              GeckoTerminal
            </a>
          </div>

          <iframe
            src={buildSrc()}
            className="absolute top-[41px] left-0 right-0 bottom-0 w-full"
            style={{ height: 'calc(100% - 41px)' }}
            frameBorder="0"
            allow="clipboard-write"
            allowFullScreen
            onLoad={() => setLoading(false)}
          />

          {loading && (
            <div
              className="absolute inset-0 top-[41px] flex items-center justify-center z-20 pointer-events-none"
              style={{ background: 'rgba(var(--bg-rgb), 0.6)' }}
            >
              <span
                className="font-['JetBrains_Mono'] text-[0.6rem] tracking-widest uppercase animate-pulse"
                style={{ color: 'var(--text4)' }}
              >
                Loading Chart…
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
          <button
            onClick={copyCA}
            className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-[0.55rem] tracking-[0.2em] uppercase px-6 py-4 rounded border min-h-[48px] transition-all hover:bg-[rgba(255,255,255,0.03)]"
            style={{
              color: 'var(--text3)',
              borderColor: 'var(--border)',
            }}
          >
            <Copy className="w-3 h-3" />
            8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump
          </button>
          <a
            href="https://pump.fun/coin/8DaLPxatThHR6ZMx62QtvA6vZ1oJaEKA6gWoQxjGpump"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.2em] uppercase px-5 py-3 rounded transition-all"
            style={{
              background: 'var(--red-dim)',
              borderWidth: '1px',
              borderColor: 'rgba(196,30,58,0.3)',
              color: 'rgba(220,140,150,0.9)',
            }}
          >
            Buy on Pump.fun
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;

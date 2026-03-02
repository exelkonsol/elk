import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { voteSupabase, voteLocal, hasVotedThisCycle, markVoted, getVotedMechanism } from '../utils/supabase';
import type { Mechanism, Votes } from '../utils/supabase';

interface MechanismsSectionProps {
  votes: Votes;
  setVotes: (votes: Votes) => void;
  currentCycle: number;
  useSupabase: boolean;
  displayToast: (message: string) => void;
  openModal: (data: { title: string; body: string }) => void;
}

const modalData: Record<Mechanism, { title: string; body: string }> = {
  isolation: {
    title: 'Isolation',
    body: `<p>Isolation is the deliberate thinning of noise - the conscious decision to wall off disturbing thoughts and reduce the overwhelming complexity of existence to manageable fragments. In Zapffe's philosophy, isolation functions as a psychological defense mechanism where we compartmentalize unbearable truths about our condition.</p><p>Within the $ELK ecosystem, isolation manifests through token burns and supply reduction. By removing tokens from circulation, we compress the system until only what matters remains. Scarcity becomes structure, and structure becomes psychological relief.</p><p>Isolation also defines attention. Communities survive by deciding what not to amplify: empty narratives, panic cycles, and performative outrage. If everything is urgent, nothing is meaningful. Isolation restores hierarchy to signal.</p><p>On-chain, this mechanism appears as subtraction with intent. The act is visible, irreversible, and public. That visibility matters: it turns private fear into a shared rite and gives the community a measurable symbol of discipline.</p><p>At a human level, isolation is not cowardice. It is triage. We narrow the frame so we can keep moving without collapse. The mind does this internally; the project mirrors it externally.</p><p>The burn is not destruction - it is selective forgetting, a mercy we grant ourselves so that purpose can survive contact with chaos.</p><p><em>"We survive by refusing to see the whole picture."</em></p>`,
  },
  anchoring: {
    title: 'Anchoring',
    body: `<p>Anchoring is the mechanism by which we attach ourselves to fixed points in a reality that offers none. Zapffe observed that humans need stable references - values, roles, routines - to prevent the drift into existential vertigo.</p><p>In the $ELK framework, anchoring appears as permanent liquidity, locked structures, and persistent rituals. These are not cosmetic features. They are anti-fragile coordinates that keep the community legible when sentiment fractures.</p><p>An anchor is useful precisely when pressure rises. During volatility, people search for what cannot be moved. Durable liquidity, transparent token rails, and repeatable community behavior create that psychological floor.</p><p>Anchoring also reduces social fragmentation. Without common points of return, discourse splinters into private timelines and isolated panic. Anchors synchronize participants around shared evidence and shared memory.</p><p>Operationally, anchoring means choosing commitments that outlast mood: documented rules, visible treasury behavior, and predictable cadence. Stability is less about promises and more about repeatability under stress.</p><p>When everything is uncertain, the anchor remains. Structure against entropy. Order against chaos. A stake driven into shifting sand.</p><p><em>"We build monuments not because they will last, but because building them gives us something to hold."</em></p>`,
  },
  distraction: {
    title: 'Distraction',
    body: `<p>Distraction is motion as mercy - the continuous activity that prevents the mind from settling too long on its own abyss. Zapffe recognized that silence can become unbearable when consciousness turns inward without buffer.</p><p>For $ELK, distraction appears as campaigns, raids, meme production, storytelling, and relentless publishing. These actions are not only marketing outputs. They are social metabolism: movement that keeps paralysis from taking root.</p><p>In high-volatility environments, idle attention becomes hostile attention. People invent threats, magnify rumors, and spiral. Constructive distraction channels that energy into coordinated tasks with visible progress markers.</p><p>This mechanism also scales belonging. Shared activity creates synchronization: the same jokes, the same references, the same cadence of response. Culture compounds faster when people build in public, together, in real time.</p><p>Healthy distraction is directional, not random. It turns anxiety into work and work into identity. The objective is not to avoid truth forever, but to stay functional long enough to transform it.</p><p>Distraction is not denial - it is strategic avoidance. The community that moves together survives together.</p><p><em>"We fill the void with noise because the void's silence tells us too much."</em></p>`,
  },
  sublimation: {
    title: 'Sublimation',
    body: `<p>Sublimation is the highest of Zapffe's mechanisms: the transformation of suffering into form. Where isolation narrows, anchoring stabilizes, and distraction redirects, sublimation converts. It turns raw pain into artifacts that can be shared, studied, and carried.</p><p>Within $ELK, sublimation is the foundation of the whole narrative stack. Losses, volatility, absurdity, and uncertainty are not hidden. They are translated into language, symbols, audio, and ritual so the experience becomes coherent instead of chaotic.</p><p>Sublimation is what allows the community to metabolize failure without collapsing into cynicism. A bad cycle can still produce meaning if it yields craft, memory, and stronger collective pattern recognition.</p><p>This mechanism also upgrades identity. Participants are not only speculators reacting to price. They become co-authors of a philosophy-driven system where creation itself is a response to existential pressure.</p><p>In practical terms, sublimation means building things that outlast the moment: narratives, media, archives, and design choices that carry emotional truth forward. Art becomes infrastructure for endurance.</p><p>The burden becomes the badge. The weight becomes the wings.</p><p><em>"Pain becomes meaning when we refuse to let it be meaningless."</em></p>`,
  },
};

const mechanisms = [
  {
    id: 'isolation' as Mechanism,
    title: 'Isolation',
    desc: 'Remove tokens from circulation. Confine anxiety to manageable compartments.',
    tagline: 'Suppression through reduction',
    accent: 'Burns / Isolation',
    color: 'rgba(74,158,255,0.85)',
    hoverBorder: 'rgba(74,158,255,0.3)',
  },
  {
    id: 'anchoring' as Mechanism,
    title: 'Anchoring',
    desc: 'Permanent liquidity. Fixed points preventing drift into the chaotic void.',
    tagline: 'Structure against entropy',
    accent: 'Lock / Anchor',
    color: 'rgba(212,160,23,0.85)',
    hoverBorder: 'rgba(212,160,23,0.3)',
  },
  {
    id: 'distraction' as Mechanism,
    title: 'Distraction',
    desc: 'Marketing, raids, content. Keep the mind moving against the abyss.',
    tagline: 'Motion against stillness',
    accent: 'Meme / Distract',
    color: 'rgba(255,107,53,0.85)',
    hoverBorder: 'rgba(255,107,53,0.3)',
  },
  {
    id: 'sublimation' as Mechanism,
    title: 'Sublimation',
    desc: 'Transform suffering into art. Philosophy as evolutionary bypass.',
    tagline: 'Pain becomes meaning',
    accent: 'Learn / Sublimate',
    color: 'rgba(155,89,182,0.85)',
    hoverBorder: 'rgba(155,89,182,0.3)',
  },
];

const MechanismsSection: React.FC<MechanismsSectionProps> = ({
  votes,
  setVotes,
  currentCycle,
  useSupabase,
  displayToast,
  openModal,
}) => {
  const [visible, setVisible] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votedMech, setVotedMech] = useState<Mechanism | null>(null);

  useEffect(() => {
    if (hasVotedThisCycle(currentCycle)) {
      setVotedMech(getVotedMechanism());
    } else {
      setVotedMech(null);
    }
  }, [currentCycle]);

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

    const section = document.getElementById('mechanisms');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleVote = async (mechanism: Mechanism) => {
    if (isVoting) {
      displayToast('PROCESSING...');
      return;
    }

    if (hasVotedThisCycle(currentCycle)) {
      displayToast('ALREADY VOTED THIS CYCLE');
      return;
    }

    setIsVoting(true);
    displayToast('VOTING...');

    try {
      if (useSupabase) {
        await voteSupabase(mechanism);
      } else {
        const newVotes = voteLocal(mechanism);
        setVotes(newVotes);
      }

      markVoted(mechanism, currentCycle);
      setVotedMech(mechanism);
      displayToast('VOTE RECORDED');
    } catch (e) {
      console.error('Voting failed:', e);
      displayToast('VOTE FAILED - RETRY');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <section id="mechanisms" className="py-24 sm:py-32 px-4 sm:px-6 mechanisms-section">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <span
            className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.55em] uppercase block mb-3"
            style={{ color: 'var(--text4)' }}
          >
            Survival Architecture
          </span>
          <h2
            className="font-['Cinzel'] font-normal text-[clamp(2rem,5vw,3.5rem)] leading-tight"
            style={{ color: 'var(--text)' }}
          >
            Four Mechanisms
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {mechanisms.map((mech, index) => (
            <div
              key={mech.id}
              className={`reveal h-full ${visible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div
                className="bg-[var(--card)] border rounded-xl p-7 h-[24rem] sm:h-[24.5rem] md:h-[25rem] flex flex-col justify-between cursor-pointer transition-all duration-250 hover:-translate-y-1 group relative overflow-hidden"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${mech.color}, transparent)` }}
                />

                <div onClick={() => openModal(modalData[mech.id])} className="flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="font-['Cinzel'] text-2xl font-semibold" style={{ color: 'var(--text2)' }}>
                      {mech.title}
                    </h3>
                    <Info className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: 'var(--text4)' }} />
                  </div>
                  <p className="text-[0.95rem] leading-relaxed mb-3 min-h-[5.8rem]" style={{ color: 'var(--text3)' }}>
                    {mech.desc}
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.2em] uppercase mb-3 min-h-[1.8rem]" style={{ color: 'var(--text4)' }}>
                    {mech.tagline}
                  </p>
                  <p className="font-['JetBrains_Mono'] text-xs tracking-widest uppercase min-h-[1.25rem]" style={{ color: mech.color }}>
                    {mech.accent}
                  </p>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text4)' }}>
                      Global Votes
                    </span>
                    <span className="font-['JetBrains_Mono'] text-2xl" style={{ color: 'var(--text2)' }}>
                      {(votes[mech.id] || 0).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleVote(mech.id)}
                    disabled={!!votedMech}
                    className="w-full py-3 font-['JetBrains_Mono'] text-[0.6rem] tracking-[0.25em] uppercase rounded border min-h-[44px] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-[rgba(255,255,255,0.04)]"
                    style={{
                      color: votedMech === mech.id ? mech.color : 'var(--text3)',
                      borderColor: votedMech === mech.id ? mech.color : 'var(--border)',
                      background: votedMech === mech.id ? `${mech.color}15` : 'transparent',
                    }}
                  >
                    {votedMech === mech.id ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MechanismsSection;

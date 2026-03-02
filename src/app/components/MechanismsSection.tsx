import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { ALLOWED_MECHANISMS, voteSupabase, voteLocal, hasVotedThisCycle, markVoted, getVotedMechanism } from '../utils/supabase';
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
    body: `<p>Isolation is the deliberate thinning of noise—the conscious decision to wall off disturbing thoughts and reduce the overwhelming complexity of existence to manageable fragments. In Zapffe's philosophy, isolation functions as a psychological defense mechanism where we compartmentalize the unbearable truths about our condition.</p><p>Within the $ELK ecosystem, isolation manifests through token burns and supply reduction. By removing tokens from circulation, we compress the system until only what matters remains. This scarcity reflects the deeper fear of nothingness—the void we desperately try to avoid confronting.</p><p>The burn is not destruction—it is selective forgetting, a mercy we grant ourselves.</p><p><em>"We survive by refusing to see the whole picture."</em></p>`,
  },
  anchoring: {
    title: 'Anchoring',
    body: `<p>Anchoring is the mechanism by which we attach ourselves to fixed points in a reality that offers none. Zapffe understood that humans require stable reference points—values, beliefs, routines—to prevent the vertiginous drift into cosmic meaninglessness.</p><p>In the $ELK framework, anchoring takes the form of permanent liquidity and locked pools. These immutable structures serve as gravitational centers, preventing the community from scattering into the chaotic void of speculation.</p><p>When everything is uncertain, when markets crash and narratives collapse, the anchor remains. Structure against entropy. Order against chaos. A stake driven into shifting sand.</p><p><em>"We build monuments not because they will last, but because building them gives us something to hold."</em></p>`,
  },
  distraction: {
    title: 'Distraction',
    body: `<p>Distraction is motion as mercy—the perpetual activity that prevents the mind from settling into contemplation of its own predicament. Zapffe recognized that humanity fills every silence with noise, every pause with action, because stillness invites the awareness we cannot bear.</p><p>For $ELK, distraction manifests as marketing campaigns, community raids, meme creation, and the endless production of content. These activities are not merely promotional—they are existential. The raid is a ritual. The meme is a prayer.</p><p>Distraction is not denial—it is strategic avoidance. The community that moves together survives together.</p><p><em>"We fill the void with noise because the void's silence tells us too much."</em></p>`,
  },
  sublimation: {
    title: 'Sublimation',
    body: `<p>Sublimation is the highest of Zapffe's mechanisms—the transformation of suffering into something greater. Where isolation hides, anchoring steadies, and distraction averts, sublimation transmutes. It takes the raw material of existential pain and forges it into art, philosophy, community, and meaning.</p><p>Within $ELK, sublimation is the philosophical foundation itself. The project transforms the brutal realities of memecoin speculation—the losses, the volatility, the absurdity—into a shared mythology. We do not deny the suffering; we make it sacred.</p><p>The burden becomes the badge. The weight becomes the wings.</p><p><em>"Pain becomes meaning when we refuse to let it be meaningless."</em></p>`,
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
      displayToast('VOTE FAILED — RETRY');
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {mechanisms.map((mech, index) => (
            <div
              key={mech.id}
              className={`reveal ${visible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div
                className="bg-[var(--card)] border rounded-xl p-7 min-h-[320px] flex flex-col justify-between cursor-pointer transition-all duration-250 hover:-translate-y-1 group relative overflow-hidden"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${mech.color}, transparent)` }} />
                
                <div onClick={() => openModal(modalData[mech.id])} className="flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="font-['Cinzel'] text-2xl font-semibold" style={{ color: 'var(--text2)' }}>
                      {mech.title}
                    </h3>
                    <Info className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: 'var(--text4)' }} />
                  </div>
                  <p className="text-[0.95rem] leading-relaxed mb-3" style={{ color: 'var(--text3)' }}>
                    {mech.desc}
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text4)' }}>
                    {mech.tagline}
                  </p>
                  <p className="font-['JetBrains_Mono'] text-xs tracking-widest uppercase" style={{ color: mech.color }}>
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

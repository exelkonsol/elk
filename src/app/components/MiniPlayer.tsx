import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { tracks, getTrackArtUrl } from '../data/tracks';

const MiniPlayer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex] = useState(0);
  const [playing] = useState(false);
  const [progress] = useState(0);

  useEffect(() => {
    const soundscapeSection = document.getElementById('soundscape');
    if (!soundscapeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (playing) {
            setVisible(!e.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(soundscapeSection);

    return () => observer.disconnect();
  }, [playing]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[98] h-[68px] flex items-center px-5 gap-4 backdrop-blur-[20px] transition-transform duration-400 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background: 'var(--nav-bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={getTrackArtUrl(currentIndex)}
          alt=""
          className="w-full h-full object-cover"
          decoding="async"
        />
      </div>

      <div className="min-w-0 flex-1 hidden sm:block">
        <div
          className="font-['Cinzel'] text-[0.75rem] whitespace-nowrap overflow-hidden"
          style={{ color: 'var(--text2)' }}
        >
          {tracks[currentIndex]?.title}
        </div>
        <div className="mt-1 flex-1 max-w-[200px] h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full"
            style={{
              background: 'var(--gold)',
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="ctrl-btn w-9 h-9" aria-label="Previous">
          <SkipBack className="w-4 h-4" />
        </button>
        <button className="ctrl-btn w-9 h-9" aria-label="Play/Pause">
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button className="ctrl-btn w-9 h-9" aria-label="Next">
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => {
          const section = document.getElementById('soundscape');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="ctrl-btn w-8 h-8 ml-1"
        title="Open player"
      >
        <Music className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default MiniPlayer;

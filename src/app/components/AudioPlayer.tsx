import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, VolumeX, Volume1, Volume } from 'lucide-react';
import { tracks, getTrackArtUrl, getTrackAudioUrl } from '../data/tracks';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [shuffleQueue, setShuffleQueue] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);

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

    const section = document.getElementById('soundscape');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    buildShuffleQueue();
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    startVisualization();
  }, [playing]);

  const buildShuffleQueue = () => {
    const queue = tracks
      .map((_, i) => i)
      .filter((i) => i !== currentIndex);
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    setShuffleQueue(queue);
  };

  const loadTrack = (index: number, autoPlay = false) => {
    if (index < 0 || index >= tracks.length) return;
    setCurrentIndex(index);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      const track = tracks[index];
      audioRef.current.src = getTrackAudioUrl(track);
      audioRef.current.load();

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };

      if (autoPlay) {
        setTimeout(() => {
          doPlay();
        }, 100);
      }
    }
  };

  const doPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch((err) => {
        console.warn('Play blocked:', err);
      });
    }
  };

  const doPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const togglePlay = () => {
    playing ? doPause() : doPlay();
  };

  const nextTrack = () => {
    if (shuffle) {
      if (shuffleQueue.length === 0) buildShuffleQueue();
      const next = shuffleQueue.pop() || 0;
      setShuffleQueue([...shuffleQueue]);
      loadTrack(next, true);
    } else {
      loadTrack((currentIndex + 1) % tracks.length, true);
    }
  };

  const prevTrack = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else {
      loadTrack((currentIndex - 1 + tracks.length) % tracks.length, playing);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
    if (!shuffle) buildShuffleQueue();
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
    if (audioRef.current) {
      audioRef.current.loop = !repeat;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration) {
      audioRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const BARS = 48;
    const phases = Array.from({ length: BARS }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: BARS }, () => 0.6 + Math.random() * 1.4);
    const baseH = Array.from({ length: BARS }, (_, i) => {
      const centre = Math.abs(i - BARS / 2) / (BARS / 2);
      return 0.15 + 0.5 * (1 - centre * centre);
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
    };
    
    resize();

    let rafId: number;
    let last = 0;

    const frame = (ts: number) => {
      rafId = requestAnimationFrame(frame);
      if (ts - last < 40) return;
      last = ts;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (!playing) return;

      const t = ts / 1000;
      const bw = (W / dpr) / BARS;

      for (let i = 0; i < BARS; i++) {
        const wave = Math.sin(t * speeds[i] + phases[i]) * 0.35 + Math.sin(t * speeds[i] * 0.5 + phases[i] * 1.3) * 0.2;
        const h = (baseH[i] + wave) * H * 0.65;
        const alpha = 0.12 + baseH[i] * 0.25 + (wave + 0.55) * 0.08;
        const x = i * bw * dpr;
        ctx.fillStyle = `rgba(200,190,170,${Math.max(0.04, alpha)})`;
        ctx.fillRect(x + 1, H - h, bw * dpr - 2, Math.max(2, h));
      }
    };

    frame(0);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  };

  useEffect(() => {
    loadTrack(0, false);
  }, []);

  const currentTrack = tracks[currentIndex];

  return (
    <section id="soundscape" className="py-24 sm:py-28 px-4 sm:px-6 soundscape-section">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 reveal ${visible ? 'visible' : ''}`}>
          <span
            className="font-['JetBrains_Mono'] text-[0.58rem] tracking-[0.55em] uppercase block mb-3"
            style={{ color: 'var(--text4)' }}
          >
            Auditory Space
          </span>
          <h2
            className="font-['Cinzel'] font-normal text-[clamp(2rem,5vw,3.5rem)] leading-tight"
            style={{ color: 'var(--text)' }}
          >
            Hymns for the Herd
          </h2>
        </div>

        <div className={`player-card reveal ${visible ? 'visible' : ''}`}>
          <div
            id="player-art-bg"
            style={{
              backgroundImage: `url('${getTrackArtUrl(currentIndex)}')`,
            }}
          />
          <canvas
            ref={canvasRef}
            id="viz-canvas"
            className="opacity-[0.18]"
          />

          <div className="player-inner">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center sm:items-start mb-8">
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div
                  className={`vinyl ${playing ? 'playing' : ''}`}
                  onClick={togglePlay}
                  role="button"
                  aria-label="Play/Pause"
                >
                  <div className="vinyl-label">
                    <img
                      src={getTrackArtUrl(currentIndex)}
                      alt="Album Art"
                      decoding="async"
                    />
                  </div>
                  <div className="vinyl-hole" />
                </div>

                <div className="flex items-center gap-2">
                  <span className={`status-dot ${playing ? 'playing' : ''}`} />
                  <span
                    className="font-['JetBrains_Mono'] text-xs tracking-widest uppercase"
                    style={{ color: 'var(--text4)' }}
                  >
                    {playing ? 'Playing' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col gap-5 min-w-0">
                <div className="text-center sm:text-left">
                  <div
                    className="font-['JetBrains_Mono'] text-[0.58rem] tracking-widest mb-1"
                    style={{ color: 'var(--text4)' }}
                  >
                    TRACK {(currentIndex + 1).toString().padStart(2, '0')} / {tracks.length.toString().padStart(2, '0')}
                  </div>
                  <h3
                    className="font-['Cinzel'] text-2xl sm:text-3xl leading-tight mb-1 truncate"
                    style={{ color: 'var(--text)' }}
                  >
                    {currentTrack.title}
                  </h3>
                  <p
                    className="text-sm italic truncate"
                    style={{ color: 'var(--text3)' }}
                  >
                    "{currentTrack.desc}"
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div
                    className="progress-bar"
                    onClick={handleSeek}
                    role="slider"
                    aria-label="Seek"
                    tabIndex={0}
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    >
                      <div className="progress-handle" />
                    </div>
                  </div>
                  <div
                    className="flex justify-between font-['JetBrains_Mono'] text-[0.6rem]"
                    style={{ color: 'var(--text4)' }}
                  >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <button
                    onClick={toggleShuffle}
                    className={`ctrl-btn ${shuffle ? 'on' : ''}`}
                    aria-label="Shuffle"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={prevTrack}
                    className="ctrl-btn"
                    aria-label="Previous"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="play-btn"
                    aria-label="Play/Pause"
                  >
                    {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="ctrl-btn"
                    aria-label="Next"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleRepeat}
                    className={`ctrl-btn ${repeat ? 'on' : ''}`}
                    aria-label="Repeat"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="ctrl-btn"
                    aria-label="Mute"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : volume < 0.01 ? <VolumeX className="w-4 h-4" /> : volume < 0.4 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                    className="vol-slider flex-1"
                    aria-label="Volume"
                  />
                  <Volume2 className="w-3 h-3" style={{ color: 'var(--text4)' }} />
                </div>
              </div>
            </div>

            <div className="border-t pt-5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-['JetBrains_Mono'] text-[0.58rem] tracking-widest uppercase"
                  style={{ color: 'var(--text4)' }}
                >
                  Playlist — {tracks.length} Tracks
                </span>
                <span
                  className="font-['JetBrains_Mono'] text-[0.55rem]"
                  style={{ color: 'var(--text5)' }}
                >
                  $ELK Soundscape
                </span>
              </div>
              <div className="overflow-y-auto max-h-56 space-y-0.5 pr-1 playlist-scroll">
                {tracks.map((track, index) => (
                  <div
                    key={index}
                    onClick={() => loadTrack(index, true)}
                    className={`track-item ${index === currentIndex ? 'active' : ''}`}
                  >
                    <span
                      className="font-['JetBrains_Mono'] text-[0.58rem] w-6 flex-shrink-0"
                      style={{ color: 'var(--text4)' }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span
                      className="font-['JetBrains_Mono'] text-xs truncate flex-1"
                      style={{ color: 'var(--text2)' }}
                    >
                      {track.title}
                    </span>
                    <span
                      className="font-['JetBrains_Mono'] text-[0.58rem] italic hidden sm:block flex-shrink-0 ml-2 truncate max-w-[130px]"
                      style={{ color: 'var(--text4)' }}
                    >
                      {track.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          if (!repeat) nextTrack();
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        preload="metadata"
      />
    </section>
  );
};

export default AudioPlayer;

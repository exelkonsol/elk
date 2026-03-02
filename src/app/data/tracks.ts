export interface Track {
  title: string;
  desc: string;
}

const IMG_BASE = 'https://raw.githubusercontent.com/exelkonsol/elk/main/images/';
const AUD_BASE = 'https://raw.githubusercontent.com/exelkonsol/elk/main/music/';

export const tracks: Track[] = [
  { title: "Before the Clearing", desc: "The silence before revelation" },
  { title: "Crimson Twilight", desc: "Dusk bleeds into the void" },
  { title: "Echoes Where Meaning Was", desc: "Resonance of the lost" },
  { title: "Eternal Weight", desc: "The burden without end" },
  { title: "Forest Depths", desc: "Where the light forgets itself" },
  { title: "Herd Gathering", desc: "The convergence of the burdened" },
  { title: "Herd Through the Valley", desc: "Together into the unknown" },
  { title: "Migration of the Burdened", desc: "Moving forward, always forward" },
  { title: "Mountain Echo", desc: "Words that return changed" },
  { title: "No Elk Walks Alone", desc: "The weight is shared" },
  { title: "Signal from the Ridge", desc: "A call across the dark" },
  { title: "The Burden", desc: "What we carry defines us" },
  { title: "The Herd Remembers", desc: "Memory lives in the herd" },
  { title: "The Weight of Knowing", desc: "Consciousness is the cost" },
  { title: "Turning Ash to Altar", desc: "Transformation through suffering" },
  { title: "What Consciousness Costs", desc: "The price of awareness" },
];

export const getTrackArtUrl = (index: number): string => {
  return `${IMG_BASE}${encodeURIComponent(tracks[index].title)}.png`;
};

export const getTrackAudioUrl = (track: Track): string => {
  return `${AUD_BASE}${encodeURIComponent(track.title)}.mp3`;
};

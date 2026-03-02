import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zbugvtypukklxpvrzxra.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidWd2dHlwdWtrbHhwdnJ6eHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MjMwNzgsImV4cCI6MjA4NTk5OTA3OH0.aHYE5M0NOsxqJakcKmKTi2MfaxZbPhmMsiz9Hi6zQMc';

export const ALLOWED_MECHANISMS = ['isolation', 'anchoring', 'distraction', 'sublimation'] as const;
export type Mechanism = typeof ALLOWED_MECHANISMS[number];

const CYCLE_LENGTH_DAYS = 14;
export const CYCLE_LENGTH_MS = CYCLE_LENGTH_DAYS * 24 * 60 * 60 * 1000;

export const STORAGE_KEYS = {
  HAS_VOTED: 'elk_has_voted',
  VOTED_MECH: 'elk_voted_mech',
  VOTED_CYCLE: 'elk_voted_cycle',
  LOCAL_VOTES: 'elk_local_votes'
};

export interface Votes {
  isolation: number;
  anchoring: number;
  distraction: number;
  sublimation: number;
}

let supabaseClient: SupabaseClient | null = null;
let useSupabase = false;

export const initSupabase = async (): Promise<{ client: SupabaseClient | null; enabled: boolean; votes: Votes; cycle: number }> => {
  const defaultVotes: Votes = { isolation: 0, anchoring: 0, distraction: 0, sublimation: 0 };
  
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const { data, error } = await supabaseClient
      .from('elk_votes')
      .select('*')
      .eq('id', 'current')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        await createInitialVoteRecord(supabaseClient);
        useSupabase = true;
        return { client: supabaseClient, enabled: true, votes: defaultVotes, cycle: 1 };
      }
      throw error;
    }

    const votes: Votes = {
      isolation: data.isolation || 0,
      anchoring: data.anchoring || 0,
      distraction: data.distraction || 0,
      sublimation: data.sublimation || 0,
    };

    useSupabase = true;
    return { client: supabaseClient, enabled: true, votes, cycle: data.cycle || 1 };
  } catch (e) {
    console.error('Supabase init failed:', e);
    return { client: null, enabled: false, votes: getLocalVotes(), cycle: 1 };
  }
};

const createInitialVoteRecord = async (client: SupabaseClient) => {
  const now = new Date();
  const cycleEnd = new Date(now.getTime() + CYCLE_LENGTH_MS);
  
  await client.from('elk_votes').insert({
    id: 'current',
    isolation: 0,
    anchoring: 0,
    distraction: 0,
    sublimation: 0,
    cycle: 1,
    cycle_started_at: now.toISOString(),
    cycle_ends_at: cycleEnd.toISOString(),
  });
};

export const voteSupabase = async (mechanism: Mechanism): Promise<any> => {
  if (!supabaseClient) throw new Error('Supabase not initialized');
  
  const { data, error } = await supabaseClient.rpc('increment_vote', {
    mechanism_name: mechanism,
  });
  
  if (error) throw error;
  return data;
};

export const getLocalVotes = (): Votes => {
  const s = localStorage.getItem(STORAGE_KEYS.LOCAL_VOTES);
  if (s) {
    try {
      return JSON.parse(s);
    } catch (e) {
      // Ignore parse errors
    }
  }
  return { isolation: 0, anchoring: 0, distraction: 0, sublimation: 0 };
};

export const saveLocalVotes = (votes: Votes) => {
  localStorage.setItem(STORAGE_KEYS.LOCAL_VOTES, JSON.stringify(votes));
};

export const voteLocal = (mechanism: Mechanism): Votes => {
  const votes = getLocalVotes();
  votes[mechanism] = (votes[mechanism] || 0) + 1;
  saveLocalVotes(votes);
  return votes;
};

export const hasVotedThisCycle = (currentCycle: number): boolean => {
  const hasVoted = localStorage.getItem(STORAGE_KEYS.HAS_VOTED) === 'true';
  const votedCycle = parseInt(localStorage.getItem(STORAGE_KEYS.VOTED_CYCLE) || '0');
  return hasVoted && votedCycle === currentCycle;
};

export const markVoted = (mechanism: Mechanism, cycle: number) => {
  localStorage.setItem(STORAGE_KEYS.HAS_VOTED, 'true');
  localStorage.setItem(STORAGE_KEYS.VOTED_MECH, mechanism);
  localStorage.setItem(STORAGE_KEYS.VOTED_CYCLE, String(cycle));
};

export const getVotedMechanism = (): Mechanism | null => {
  return localStorage.getItem(STORAGE_KEYS.VOTED_MECH) as Mechanism | null;
};

export const resetVote = () => {
  localStorage.removeItem(STORAGE_KEYS.HAS_VOTED);
  localStorage.removeItem(STORAGE_KEYS.VOTED_MECH);
  localStorage.removeItem(STORAGE_KEYS.VOTED_CYCLE);
};

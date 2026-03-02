import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ChartSection from './components/ChartSection';
import MechanismsSection from './components/MechanismsSection';
import QuoteSection from './components/QuoteSection';
import AudioPlayer from './components/AudioPlayer';
import Footer from './components/Footer';
import MiniPlayer from './components/MiniPlayer';
import Toast from './components/Toast';
import Modal from './components/Modal';
import { initSupabase, Votes, getLocalVotes } from './utils/supabase';

export default function App() {
  const [votes, setVotes] = useState<Votes>({ isolation: 0, anchoring: 0, distraction: 0, sublimation: 0 });
  const [currentCycle, setCurrentCycle] = useState(1);
  const [useSupabase, setUseSupabase] = useState(false);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [modalData, setModalData] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const init = async () => {
      const result = await initSupabase();
      setVotes(result.votes);
      setCurrentCycle(result.cycle);
      setUseSupabase(result.enabled);
      setSupabaseClient(result.client);

      if (result.enabled && result.client) {
        const channel = result.client
          .channel('elk_votes_changes')
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'elk_votes',
            filter: 'id=eq.current'
          }, (payload: any) => {
            if (payload.new) {
              setVotes({
                isolation: payload.new.isolation || 0,
                anchoring: payload.new.anchoring || 0,
                distraction: payload.new.distraction || 0,
                sublimation: payload.new.sublimation || 0,
              });
              if (payload.new.cycle) setCurrentCycle(payload.new.cycle);
            }
          })
          .subscribe();

        return () => {
          channel.unsubscribe();
        };
      }
    };

    init();
  }, []);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const openModal = (data: { title: string; body: string }) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <ThemeProvider>
      <div className="size-full antialiased">
        {/* Atmosphere Layers */}
        <div className="global-bg" />
        <div className="global-tint" />
        <div className="vignette" />
        <div className="noise" />

        {/* Toast */}
        <Toast message={toastMessage} show={showToast} />

        {/* Modal */}
        <Modal data={modalData} onClose={closeModal} />

        {/* Navigation */}
        <Navigation displayToast={displayToast} />

        {/* Main Content */}
        <main>
          <Hero />
          <ChartSection displayToast={displayToast} />
          <MechanismsSection 
            votes={votes}
            setVotes={setVotes}
            currentCycle={currentCycle}
            useSupabase={useSupabase}
            displayToast={displayToast}
            openModal={openModal}
          />
          <QuoteSection displayToast={displayToast} />
          <AudioPlayer />
        </main>

        {/* Footer */}
        <Footer displayToast={displayToast} />

        {/* Mini Player */}
        <MiniPlayer />
      </div>
    </ThemeProvider>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioController } from '../../utils/AudioController';
import './AudioToggle.css';
export default function AudioToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    const handleAudioStarted = () => {
      setIsVisible(true);
      setIsMuted(audioController.getIsMuted());
    };
    const handleMuteToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsMuted(customEvent.detail.isMuted);
    };
    const handleHide = () => {
      setIsVisible(false);
    };
    window.addEventListener('insanbermakna:audioStarted', handleAudioStarted);
    window.addEventListener('insanbermakna:muteToggle', handleMuteToggle);
    window.addEventListener('insanbermakna:hideAudioToggle', handleHide);
    return () => {
      window.removeEventListener('insanbermakna:audioStarted', handleAudioStarted);
      window.removeEventListener('insanbermakna:muteToggle', handleMuteToggle);
      window.removeEventListener('insanbermakna:hideAudioToggle', handleHide);
    };
  }, []);
  const toggleMute = () => {
    audioController.toggleMute();
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="audio-toggle"
          onClick={toggleMute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="audio-icon audio-icon--muted">
              <rect x="3" y="11" width="3" height="2" rx="1" />
              <rect x="8" y="11" width="3" height="2" rx="1" />
              <rect x="13" y="11" width="3" height="2" rx="1" />
              <rect x="18" y="11" width="3" height="2" rx="1" />
              <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="audio-icon audio-icon--playing">
              <rect x="3" y="8" width="3" height="8" rx="1" className="bar bar-1" />
              <rect x="8" y="4" width="3" height="16" rx="1" className="bar bar-2" />
              <rect x="13" y="6" width="3" height="12" rx="1" className="bar bar-3" />
              <rect x="18" y="9" width="3" height="6" rx="1" className="bar bar-4" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

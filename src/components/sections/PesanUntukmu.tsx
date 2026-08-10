import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { pesanHeadline, pesanSupporting } from '../../content/copy';
import { getRandomMessage } from '../../content/messages';
import type { Message } from '../../content/messages';
import { audioController } from '../../utils/AudioController';
import DecorativeLeaf from '../shared/DecorativeLeaf';
import './PesanUntukmu.css';
const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export default function PesanUntukmu() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const [entryState, setEntryState] = useState<'hidden' | 'entering' | 'visible'>('hidden');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
  useEffect(() => {
    setMessage(getRandomMessage([]));
  }, []);
  useEffect(() => {
    if (isInView && entryState === 'hidden') {
      setEntryState('entering');
      const sequenceDuration = reduced ? 1000 : 2500;
      const timeout = setTimeout(() => {
        setEntryState('visible');
      }, sequenceDuration);
      return () => clearTimeout(timeout);
    }
  }, [isInView, entryState, reduced]);
  const handleOpen = () => {
    if (isOpen) return;
    audioController.playSFX('unfold');
    setIsOpen(true);
  };
  const dotAnimation = entryState === 'entering' 
    ? { y: [ -100, 0 ], opacity: [0, 1] }
    : entryState === 'visible'
      ? { y: 0, opacity: 1 }
      : { y: -100, opacity: 0 };
  return (
    <motion.section
      id="pesan-untukmu"
      className="pesan"
      aria-label="Pesan Untukmu"
      ref={sectionRef}
      initial={{ backgroundColor: 'var(--color-bg-primary)' }}
      animate={{ backgroundColor: 'var(--color-bg-primary)' }}
      transition={{ duration: 1.5, ease: EASE_GENTLE }}
    >
      <DecorativeLeaf position="top-right" reduced={reduced} />
      {}
      <div className="pesan__entry-dot-container" aria-hidden="true">
        <motion.div
          className="pesan__entry-dot"
          initial={{ y: -100, opacity: 0 }}
          animate={dotAnimation}
          transition={{ duration: reduced ? 0.4 : 1.5, ease: EASE_GENTLE }}
        />
      </div>
      <div className="pesan__envelope-container">
        <motion.div 
          className="pesan__envelope-wrapper"
          onClick={handleOpen}
          initial={{ y: 50, opacity: 0 }}
          animate={
            entryState === 'hidden'
              ? { y: 50, opacity: 0 }
              : entryState === 'entering'
                ? { y: 0, opacity: 1, transition: { delay: reduced ? 0 : 1.5, duration: 1 } }
                : { y: 0, opacity: 1 }
          }
          whileHover={!reduced && !isOpen ? { y: -4 } : {}}
          whileTap={!reduced && !isOpen ? { y: -1 } : {}}
        >
          {}
          <motion.div 
            className="pesan__envelope-back"
            animate={{ opacity: isOpen ? 0.3 : 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          {}
          <motion.div 
            className="pesan__envelope-front-group"
            animate={{ opacity: isOpen ? 0.3 : 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="pesan__envelope-front" />
            <div className="pesan__envelope-bottom" />
          </motion.div>
          {}
          <motion.div 
            className="pesan__envelope-flap"
            initial={{ rotateX: 0 }}
            animate={{ 
              rotateX: isOpen ? 180 : 0,
              opacity: isOpen ? 0.3 : 1 
            }}
            transition={{ 
              rotateX: { duration: 0.8, ease: "easeInOut" },
              opacity: { duration: 1, delay: 1 }
            }}
          />
          {}
          <motion.div 
            className="pesan__stamp"
            animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pesan__stamp-inner" />
          </motion.div>
          {}
          <motion.div 
            className="pesan__paper"
            initial={{ y: 20, scale: 0.8, opacity: 0, zIndex: 2 }}
            animate={isOpen ? { y: -90, scale: 1, opacity: 1, zIndex: 10 } : { y: 20, scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, delay: isOpen ? 0.6 : 0, ease: EASE_GENTLE }}
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed"
                  className="pesan__closed"
                  initial={{ opacity: 0 }}
                >
                  <h2 className="pesan__headline">{pesanHeadline}</h2>
                  <p className="pesan__supporting">{pesanSupporting}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="opened"
                  className="pesan__opened"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: reduced ? 0.3 : 0.6, delay: 1.2, ease: EASE_GENTLE }}
                >
                  <div className="pesan__text-container">
                    {message?.lines.map((line, i) => (
                      <p key={i} className="pesan__text-line">{line}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        {}
        <AnimatePresence>
          {!isOpen && entryState === 'visible' && (
            <motion.div
              className="pesan__instruction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="pesan__headline">{pesanHeadline}</h2>
              <p className="pesan__supporting">{pesanSupporting}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

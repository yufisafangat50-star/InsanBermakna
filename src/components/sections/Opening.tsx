import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { openingLines, openingCta } from '../../content/copy';
import { audioController } from '../../utils/AudioController';
import DecorativeLeaf from '../shared/DecorativeLeaf';
import './Opening.css';
const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
type Phase = 'black' | 'dot' | 'expanding' | 'paper' | 'text' | 'cta';
export default function Opening() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const [phase, setPhase] = useState<Phase>('black');
  const [visibleLines, setVisibleLines] = useState(0);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);
  const [showJourneyStart, setShowJourneyStart] = useState(false);
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    audioController.init();
  }, []);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (reduced) {
      switch (phase) {
        case 'black':
          timeout = setTimeout(() => setPhase('paper'), 200);
          break;
        case 'paper':
          timeout = setTimeout(() => setPhase('text'), 400);
          break;
      }
    } else {
      switch (phase) {
        case 'black':
          timeout = setTimeout(() => setPhase('dot'), 1500);
          break;
        case 'dot':
          break;
        case 'expanding':
          timeout = setTimeout(() => setPhase('paper'), 2000);
          break;
        case 'paper':
          timeout = setTimeout(() => setPhase('text'), 1000);
          break;
      }
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [phase, reduced]);
  useEffect(() => {
    if (phase !== 'text') return;
    const lineDelays = reduced
      ? [0, 300, 600, 1000]       
      : [0, 1500, 3000, 5500];    
    const timeouts = lineDelays.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );
    const ctaDelay = reduced ? 1400 : 7500;
    const ctaTimeout = setTimeout(() => setPhase('cta'), ctaDelay);
    timeouts.push(ctaTimeout);
    return () => timeouts.forEach(clearTimeout);
  }, [phase, reduced]);
  useEffect(() => {
    if (scrollUnlocked) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [scrollUnlocked]);
  const handleCtaClick = useCallback(() => {
    setCtaClicked(true);
    audioController.play();
    window.dispatchEvent(new CustomEvent('insanbermakna:startJourney'));
    const fadeOutDuration = reduced ? 300 : 800;
    setTimeout(() => {
      setShowJourneyStart(true);
      const journeyAnimationDuration = reduced ? 1000 : 2500;
      setTimeout(() => {
        setScrollUnlocked(true);
        setTimeout(() => {
          const kenanganSection = document.getElementById('kenangan');
          if (kenanganSection) {
            kenanganSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }, journeyAnimationDuration);
    }, fadeOutDuration);
  }, [reduced]);
  const overlayVisible = reduced
    ? phase === 'black'
    : ['black', 'dot', 'expanding'].includes(phase);
  const showText = (phase === 'text' || phase === 'cta') && !ctaClicked;
  const showCta = phase === 'cta' && !ctaClicked;
  const handleOverlayClick = useCallback(() => {
    if (phase === 'dot') {
      audioController.unlock();
      setPhase('expanding');
    }
  }, [phase]);
  return (
    <section id="opening" className="opening" aria-label="Opening">
      {}
      <DecorativeLeaf position="top-left" reduced={reduced} />
      {}
      <motion.div
        className="opening__overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: overlayVisible ? 1 : 0 }}
        transition={{
          duration: reduced ? 0.4 : 1,
          ease: EASE_GENTLE,
        }}
        aria-hidden="true"
        style={{ pointerEvents: phase === 'dot' ? 'auto' : 'none', cursor: phase === 'dot' ? 'pointer' : 'default' }}
        onClick={handleOverlayClick}
      >
        {}
        {!reduced && (
          <motion.div
            className="opening__dot"
            initial={{ scale: 0, opacity: 0, boxShadow: '0 0 12px 4px rgba(245, 240, 232, 0.2)' }}
            animate={{
              scale:
                phase === 'black'
                  ? 0
                  : phase === 'dot'
                    ? [1, 1.2, 1]
                    : 400, 
              opacity: phase === 'black' ? 0 : 1,
              boxShadow:
                phase === 'dot'
                  ? [
                      '0 0 12px 2px rgba(245, 240, 232, 0.15)',
                      '0 0 20px 6px rgba(245, 240, 232, 0.35)',
                      '0 0 12px 2px rgba(245, 240, 232, 0.15)',
                    ]
                  : '0 0 16px 4px rgba(245, 240, 232, 0.12)',
            }}
            transition={{
              scale: {
                duration: phase === 'dot' ? 2 : (phase === 'expanding' || !['black', 'dot'].includes(phase) ? 2 : 0.8),
                ease: phase === 'dot' ? 'easeInOut' : EASE_GENTLE,
                repeat: phase === 'dot' ? Infinity : 0,
              },
              boxShadow: {
                duration: phase === 'dot' ? 2 : 0.8,
                ease: 'easeInOut',
                repeat: phase === 'dot' ? Infinity : 0,
              },
              opacity: {
                duration: 0.6,
                ease: EASE_GENTLE,
              },
            }}
          />
        )}
      </motion.div>
      {}
      <div className="opening__content">
        {openingLines.map((line, index) => (
          <TypewriterLine
            key={index}
            text={line}
            show={showText && visibleLines > index}
            reduced={reduced}
          />
        ))}
        {}
        <motion.button
          className="opening__cta"
          type="button"
          onClick={handleCtaClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: showCta ? 1 : 0 }}
          transition={{
            duration: reduced ? 0.3 : 1,
            ease: EASE_GENTLE,
          }}
          style={{ pointerEvents: showCta ? 'auto' : 'none' }}
          tabIndex={showCta ? 0 : -1}
        >
          {openingCta}
        </motion.button>
      </div>
      {}
      {showJourneyStart && (
        <div className="opening__journey-start" aria-hidden="true">
          <motion.div
            className="opening__journey-dot"
            initial={{ y: '-50vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10, 
              mass: 1,
              duration: reduced ? 0.4 : 1.5
            }}
          />
          <motion.div
            className="opening__journey-line"
            initial={{ height: 0 }}
            animate={{ height: '20vh' }}
            transition={{ 
              delay: reduced ? 0.4 : 1.5, 
              duration: reduced ? 0.6 : 1, 
              ease: "easeInOut" 
            }}
          />
        </div>
      )}
    </section>
  );
}
function TypewriterLine({ text, show, reduced }: { text: string, show: boolean, reduced: boolean }) {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    if (!show) return;
    if (reduced) {
      setDisplayedText(text);
      return;
    }
    let i = 0;
    audioController.playSFX('typewriter');
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        audioController.stopSFX('typewriter');
      }
    }, 45); 
    return () => {
      clearInterval(interval);
      audioController.stopSFX('typewriter');
    };
  }, [show, text, reduced]);
  return (
    <motion.p
      className="opening__line"
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : (reduced ? 0 : 12),
      }}
      transition={{
        duration: reduced ? 0.3 : 0.8,
        ease: EASE_GENTLE,
      }}
    >
      {displayedText}
      {show && displayedText.length < text.length && !reduced && (
        <span className="opening__cursor">|</span>
      )}
    </motion.p>
  );
}

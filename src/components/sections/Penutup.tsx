import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { penutupLines, penutupFinal } from '../../content/copy';
import DecorativeLeaf from '../shared/DecorativeLeaf';
import './Penutup.css';
const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const NORMAL_DELAYS = [
  0.2, 0.8, 
  0,        
  1.4, 2.0, 2.6, 3.2, 3.8, 
  0,        
  4.8,      
  0,        
  6.0      
];
export default function Penutup() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });
  const [dissolvePhase, setDissolvePhase] = useState(0); 
  const [showText, setShowText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [showFinalDot, setShowFinalDot] = useState(false);
  const [fadeAll, setFadeAll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= totalHeight - 50) {
        setHasReachedBottom(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (!isInView) return;
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= 8; i++) {
      timeouts.push(
        setTimeout(() => {
          setDissolvePhase(i);
        }, reduced ? i * 100 : i * 200)
      );
    }
    const textStartDelay = reduced ? 800 : 1600;
    timeouts.push(
      setTimeout(() => {
        setShowText(true);
      }, textStartDelay)
    );
    const textDuration = reduced ? 3000 : 7500;
    const baseTiming = textStartDelay + textDuration;

    const silenceDuration = reduced ? 1000 : 2000;
    timeouts.push(
      setTimeout(() => {
        setShowFinalText(true);
      }, baseTiming + silenceDuration)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [isInView, reduced]);
  const finalSequenceStarted = useRef(false);
  useEffect(() => {
    if (showFinalText && hasReachedBottom && !finalSequenceStarted.current) {
      finalSequenceStarted.current = true;
      window.dispatchEvent(new CustomEvent('insanbermakna:fadeOutMusic'));
      window.dispatchEvent(new CustomEvent('insanbermakna:hideAudioToggle'));
      const t1 = setTimeout(() => {
        setShowFinalDot(true);
      }, reduced ? 500 : 1000);
      const t2 = setTimeout(() => {
        setFadeAll(true);
      }, reduced ? 2000 : 3000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [showFinalText, hasReachedBottom, reduced]);
  useEffect(() => {
    if (fadeAll) {
      const lockScroll = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 1000); 
      return () => {
        clearTimeout(lockScroll);
        document.body.style.overflow = ''; 
      };
    }
  }, [fadeAll]);
  const accumulatedPoints = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <section id="penutup" className="penutup" ref={ref} aria-label="Penutup">
      <DecorativeLeaf position="top-left" reduced={reduced} />
      {}
      <div className="penutup__journey" aria-hidden="true">
        <motion.div
          className="penutup__journey-line"
          initial={{ opacity: 1 }}
          animate={{ opacity: dissolvePhase >= 8 ? 0 : 0.3 }}
          transition={{ duration: 2, ease: EASE_GENTLE }}
        >
          {accumulatedPoints.map((i) => {
            const isDissolved = dissolvePhase > i;
            return (
              <motion.div
                key={i}
                className="penutup__journey-dot"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: isDissolved ? 0 : 1, 
                  scale: isDissolved ? 0 : 1 
                }}
                transition={{ duration: 1, ease: EASE_GENTLE }}
              />
            );
          })}
        </motion.div>
      </div>
      {}
      <div className="penutup__content">
        {penutupLines.map((line, index) => {
          if (line === '') {
            return <div key={index} className="penutup__spacer" aria-hidden="true" />;
          }
          const delay = reduced ? index * 0.2 : NORMAL_DELAYS[index];
          return (
            <motion.p
              key={index}
              className="penutup__text"
              initial={{ opacity: 0, y: reduced ? 0 : 15 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 15 }}
              transition={{
                duration: reduced ? 0.4 : 1.5,
                delay: showText ? delay : 0,
                ease: EASE_GENTLE,
              }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>
      {}
      <div className="penutup__final">
        <motion.p
          className="penutup__final-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: showFinalText ? 1 : 0 }}
          transition={{ duration: 2, ease: EASE_GENTLE }}
        >
          {penutupFinal}
        </motion.p>
        {}
        <motion.div
          className="penutup__final-dot"
          initial={{ scale: 0, opacity: 0, y: -10 }}
          animate={
             fadeAll 
               ? { scale: 1500, opacity: 1, y: 0, backgroundColor: 'var(--color-black-opening)' } 
               : showFinalDot 
                 ? { scale: 1, opacity: 0.8, y: 0, backgroundColor: 'var(--color-accent-warm)' } 
                 : { scale: 0, opacity: 0, y: -10, backgroundColor: 'var(--color-accent-warm)' }
          }
          transition={{ 
             scale: { duration: fadeAll ? 2.5 : 2, ease: EASE_GENTLE },
             opacity: { duration: fadeAll ? 0.5 : 2 },
             backgroundColor: { duration: fadeAll ? 0.5 : 0 }
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

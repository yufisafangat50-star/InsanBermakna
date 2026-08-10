import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { reflectionLines } from '../../content/copy';
import DecorativeLeaf from '../shared/DecorativeLeaf';
import './Reflection.css';
const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export default function Reflection() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    timeouts.push(setTimeout(() => setPhase(1), reduced ? 300 : 800));
    timeouts.push(setTimeout(() => setPhase(2), reduced ? 600 : 1600));
    timeouts.push(setTimeout(() => setPhase(3), reduced ? 900 : 2400));
    return () => timeouts.forEach(clearTimeout);
  }, [isInView, reduced]);
  const showQuote = phase >= 3;
  return (
    <section id="reflection" className="reflection" ref={ref} aria-label="Reflection">
      <DecorativeLeaf position="bottom-left" reduced={reduced} />
      {}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '-4px', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-warm)',
          boxShadow: '0 0 0 4px var(--color-bg-primary)'
        }}
      />
      {}
      <div className="reflection__journey-simplification" aria-hidden="true">
        <motion.div
          className="reflection__line"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase < 3 ? 0.3 : 0 }}
          transition={{ duration: 1.5, ease: EASE_GENTLE }}
        >
          {}
          {[0, 1, 2, 3, 4].map((i) => {
            let isVisible = false;
            if (phase === 0) isVisible = true;
            else if (phase === 1 && i >= 1 && i <= 3) isVisible = true;
            else if (phase === 2 && i === 2) isVisible = true;
            return (
              <motion.div
                key={i}
                className="reflection__dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 1.0, ease: EASE_GENTLE }}
              />
            );
          })}
        </motion.div>
      </div>
      {}
      <div className="reflection__content">
        {reflectionLines.map((line, index) => {
          if (line === '') {
            return <div key={index} className="reflection__spacer" aria-hidden="true" />;
          }
          return (
            <motion.p
              key={index}
              className="reflection__text"
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={showQuote ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
              transition={{
                duration: reduced ? 0.4 : 1.5,
                delay: reduced ? index * 0.2 : 0.5 + index * 0.8,
                ease: EASE_GENTLE,
              }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
}

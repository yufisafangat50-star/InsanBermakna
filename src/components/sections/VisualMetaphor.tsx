import { motion } from 'framer-motion';
interface VisualMetaphorProps {
  index: number;
  isInView: boolean;
  reduced: boolean;
}
const METAPHOR_STYLE = {
  width: '32px',
  height: '32px',
  stroke: 'var(--color-text-secondary)',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  opacity: 0.6
};
const EASE_GENTLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export default function VisualMetaphor({ index, isInView, reduced }: VisualMetaphorProps) {
  const baseTransition = { duration: reduced ? 0.4 : 1.5, ease: EASE_GENTLE, delay: reduced ? 0 : 0.2 };
  switch (index) {
    case 0:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeOpacity={0.4} />
          {}
          <motion.line
            x1="12" y1="12" x2="12" y2="6"
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 90 } : { rotate: 0 }}
            transition={baseTransition}
            style={{ originX: '12px', originY: '12px' }}
          />
          {}
          <line x1="12" y1="12" x2="16" y2="12" />
        </svg>
      );
    case 1:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" strokeOpacity={0.4} />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
          {}
          <motion.line
            x1="8" y1="12" x2="16" y2="12"
            stroke="var(--color-accent-warm)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          {}
          <motion.line
            x1="9" y1="16" x2="13" y2="16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 1 }}
          />
        </svg>
      );
    case 2:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6" y="2" width="12" height="20" rx="3" strokeOpacity={0.4} />
          <motion.circle
            cx="12" cy="10" r="2"
            fill="var(--color-accent-warm)"
            stroke="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={baseTransition}
          />
          <line x1="10" y1="18" x2="14" y2="18" strokeOpacity={0.4} />
        </svg>
      );
    case 3:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <motion.circle
            cx="6" cy="12" r="1.5" fill="currentColor" stroke="none"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: 0 }}
          />
          <motion.circle
            cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.6 }}
          />
          <motion.line
            x1="6" y1="12" x2="18" y2="12"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 1.2 }}
          />
        </svg>
      );
    case 4:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <motion.path
            d="M 2 12 Q 8 2, 12 12 T 22 12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, duration: reduced ? 0.4 : 2 }}
          />
          <motion.path
            d="M 2 12 Q 8 22, 12 12 T 22 12"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ ...baseTransition, duration: reduced ? 0.4 : 2.5 }}
          />
        </svg>
      );
    case 5:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <motion.path
            d="M 4 6 Q 12 6, 20 12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
          <motion.path
            d="M 4 18 Q 12 18, 20 12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={baseTransition}
          />
        </svg>
      );
    case 6:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <motion.path
            d="M 4 14 Q 8 8, 12 14 T 20 14"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ ...baseTransition, delay: 0 }}
          />
          <motion.path
            d="M 6 10 Q 10 4, 14 10 T 22 10"
            strokeOpacity={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ ...baseTransition, delay: reduced ? 0 : 0.4 }}
          />
        </svg>
      );
    case 7:
      return (
        <svg style={METAPHOR_STYLE} viewBox="0 0 24 24" aria-hidden="true">
          <line x1="2" y1="12" x2="22" y2="12" strokeOpacity={0.3} />
          {[6, 12, 18].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx} cy="12" r="1.5" fill="currentColor" stroke="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ ...baseTransition, delay: reduced ? 0 : i * 0.4 }}
            />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

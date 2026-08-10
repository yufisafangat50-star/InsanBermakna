import { motion } from 'framer-motion';
interface WarmDotProps {
  size?: number;
  className?: string;
}
export default function WarmDot({ size = 8, className = '' }: WarmDotProps) {
  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--color-dot)',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './DecorativeLeaf.css';
interface DecorativeLeafProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  reduced?: boolean;
}
export default function DecorativeLeaf({ position = 'top-right', className = '', reduced = false }: DecorativeLeafProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <motion.div
      ref={ref}
      className={`decorative-leaf decorative-leaf--${position} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.3 : 0 }}
      transition={{ duration: reduced ? 0.5 : 2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <svg 
        width="40" 
        height="90" 
        viewBox="0 0 40 90" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {}
        <path d="M 20 90 Q 15 50 25 10" /> 
        {}
        <path d="M 18 60 Q 5 50 5 35" />    
        {}
        <path d="M 21 35 Q 35 30 35 15" />  
      </svg>
    </motion.div>
  );
}

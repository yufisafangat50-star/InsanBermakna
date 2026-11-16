import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { motion, useScroll, useReducedMotion, useTransform, MotionValue } from 'framer-motion';
import { kenanganMoments } from '../../content/copy';
import DecorativeLeaf from '../shared/DecorativeLeaf';
import VisualMetaphor from './VisualMetaphor';
import './Kenangan.css';
interface Point {
  x: number;
  y: number;
}
export default function Kenangan() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const containerRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState<Point[]>([]);
  const anchorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setDimensions({ width: rect.width, height: rect.height });
    const newPoints: Point[] = [];
    anchorsRef.current.forEach((anchor) => {
      if (anchor) {
        const anchorRect = anchor.getBoundingClientRect();
        newPoints.push({
          x: anchorRect.left - rect.left + anchorRect.width / 2,
          y: anchorRect.top - rect.top + anchorRect.height / 2,
        });
      }
    });
    if (newPoints.length > 0) {
      setPoints(newPoints);
    }
  }, []);
  useLayoutEffect(() => {
    updateLayout();
    const t1 = setTimeout(updateLayout, 100);
    const t2 = setTimeout(updateLayout, 500);
    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(() => {
        updateLayout();
      });
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateLayout);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateLayout);
    };
  }, [updateLayout]);
  let svgPath = '';
  const startX = dimensions.width / 2;
  const startY = 0;
  if (points.length > 0) {
    svgPath = `M ${startX} ${startY}`;
    let currentX = startX;
    let currentY = startY;
    points.forEach((p) => {
      const midY = (currentY + p.y) / 2;
      svgPath += ` C ${currentX} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
      currentX = p.x;
      currentY = p.y;
    });
    const endX = dimensions.width / 2;
    const endY = dimensions.height;
    const midYEnd = (currentY + endY) / 2;
    svgPath += ` C ${currentX} ${midYEnd}, ${endX} ${midYEnd}, ${endX} ${endY}`;
  }
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });
  const lineProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const finalDotOpacity = useTransform(scrollYProgress, [0.90, 0.95], [0, 1]);
  return (
    <section id="kenangan" className="kenangan" aria-label="Kenangan Bersama" ref={containerRef}>
      <DecorativeLeaf position="bottom-right" reduced={reduced} />
      <div className="kenangan__line-container" aria-hidden="true">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <svg
            className="kenangan__line-svg"
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <path
              d={svgPath}
              fill="none"
              stroke="var(--color-text-secondary)"
              strokeWidth="1.5"
              strokeOpacity="0.05"
            />
            <motion.path
              d={svgPath}
              fill="none"
              stroke="var(--color-accent-warm)"
              strokeWidth="2"
              style={{
                pathLength: reduced ? 1 : lineProgress,
                filter: "drop-shadow(0 0 6px rgba(196, 122, 69, 0.5))"
              }}
            />
            {points.length > 0 && (
              <motion.circle
                cx={dimensions.width / 2}
                cy={dimensions.height - 4}
                r="4"
                fill="var(--color-accent-warm)"
                style={{ opacity: finalDotOpacity }}
              />
            )}
          </svg>
        )}
      </div>
      <div className="kenangan__origin-wrapper" aria-hidden="true">
      </div>
      <div className="kenangan__moments-container">
        {kenanganMoments.map((moment, index) => (
          <MemoryMoment 
            key={moment.id || index} 
            index={index} 
            image={moment.image}
            lines={moment.lines} 
            reduced={reduced}
            setAnchorRef={(el) => (anchorsRef.current[index] = el)}
            point={points[index]}
            lineProgress={lineProgress}
            totalHeight={dimensions.height}
          />
        ))}
      </div>
    </section>
  );
}
function MemoryMoment({ index, image, lines, reduced, setAnchorRef, point, lineProgress, totalHeight }: {
  index: number;
  image: string;
  lines: string[];
  reduced: boolean;
  setAnchorRef: (el: HTMLDivElement | null) => void;
  point?: { x: number; y: number };
  lineProgress: MotionValue<number>;
  totalHeight: number;
}) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "start 30%"] 
  });
  const thresholdTop = point && totalHeight > 0 ? (point.y - 24) / totalHeight : 0.98;
  const thresholdBottom = point && totalHeight > 0 ? (point.y + 24) / totalHeight : 1;
  const circleDrawProgress = useTransform(
    lineProgress,
    [Math.max(0, thresholdTop), thresholdBottom],
    [0, 1]
  );
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [reduced ? 0 : 30, 0]);
  return (
    <div className={`moment moment--${isEven ? 'even' : 'odd'}`} ref={ref}>
      <div className="moment__anchor-container">
        <div className="moment__anchor-wrapper" ref={setAnchorRef}>
          <div className="moment__anchor-bg" aria-hidden="true" />
          <div className="moment__anchor-glow" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" style={{ overflow: 'visible' }}>
              <motion.path
                d="M 24 1 A 23 23 0 0 0 24 47"
                fill="none"
                stroke="var(--color-accent-warm)"
                strokeWidth="2"
                style={{ 
                  pathLength: reduced ? 1 : circleDrawProgress,
                  filter: "drop-shadow(0 0 6px rgba(196, 122, 69, 0.5))"
                }}
              />
              <motion.path
                d="M 24 1 A 23 23 0 0 1 24 47"
                fill="none"
                stroke="var(--color-accent-warm)"
                strokeWidth="2"
                style={{ 
                  pathLength: reduced ? 1 : circleDrawProgress,
                  filter: "drop-shadow(0 0 6px rgba(196, 122, 69, 0.5))"
                }}
              />
            </svg>
          </div>
          <div className="moment__anchor" aria-hidden="true">
            <VisualMetaphor 
              index={index % 8} 
              isInView={point ? true : false} 
              reduced={reduced}
            />
          </div>
        </div>
      </div>
      {}
      <div className="moment__content">
        <motion.div 
          className="moment__text-group"
          style={{ opacity: textOpacity, y: textY }}
        >
          {}
          <div className="moment__photo-wrapper">
            <div className="moment__photo-pin" aria-hidden="true" />
            <img 
              src={image} 
              alt={lines.join(' ')}
              className="moment__photo"
              loading="lazy"
            />
          </div>
          {}
          <div className="moment__narration">
            {lines.map((line, i) => (
              <p key={i} className="moment__text">{line}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

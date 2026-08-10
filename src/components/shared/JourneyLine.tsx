interface JourneyLineProps {
  height?: number;
  className?: string;
}
export default function JourneyLine({ height = 600, className = '' }: JourneyLineProps) {
  return (
    <svg
      className={className}
      width="2"
      height={height}
      viewBox={`0 0 2 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2={height}
        stroke="var(--color-text-secondary)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

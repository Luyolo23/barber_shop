import { useId } from 'react'

type BadgeProps = { className?: string }

export function LogoBadge({ className = 'h-40 w-40' }: BadgeProps) {
  // Unique ids so multiple badges on one page don't clash
  const uid = useId().replace(/:/g, '')
  const topId = `top-${uid}`
  const bottomId = `bottom-${uid}`

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Rand & Razor Barber Co. logo"
    >
      <defs>
        <path id={topId} d="M 28,100 A 72,72 0 0 1 172,100" />
        <path id={bottomId} d="M 14,100 A 86,86 0 0 0 186,100" />
      </defs>

      {/* Background and rings */}
      <circle cx="100" cy="100" r="98" className="fill-bottle" />
      <circle cx="100" cy="100" r="93" fill="none" strokeWidth="2" className="stroke-brass" />
      <circle cx="100" cy="100" r="62" fill="none" strokeWidth="1.5" className="stroke-brass" />

      {/* Curved text */}
      <text className="fill-cream font-display" fontSize="15" fontWeight="700" letterSpacing="3" textAnchor="middle">
        <textPath href={`#${topId}`} startOffset="50%">RAND &amp; RAZOR</textPath>
      </text>
      <text className="fill-brass font-sans" fontSize="12" fontWeight="700" letterSpacing="4" textAnchor="middle">
        <textPath href={`#${bottomId}`} startOffset="50%">BARBER CO.</textPath>
      </text>

      {/* Crossed razor and comb */}
      <g transform="translate(0,-6)">
        {/* Razor */}
        <g transform="rotate(38 100 100)">
          <rect x="96.5" y="58" width="7" height="42" rx="1.5" className="fill-cream" />
          <rect x="95" y="98" width="10" height="24" rx="3" className="fill-brass" />
        </g>
        {/* Comb */}
        <g transform="rotate(-38 100 100)">
          <rect x="92" y="60" width="16" height="56" rx="2" className="fill-brass" />
          {[66, 72, 78, 84, 90, 96, 102, 108].map((y) => (
            <line key={y} x1="92" y1={y} x2="100" y2={y} strokeWidth="1.5" className="stroke-bottle" />
          ))}
        </g>
      </g>

      {/* Est. banner */}
      <rect x="66" y="114" width="68" height="18" rx="2" className="fill-oxblood stroke-brass" strokeWidth="1" />
      <text x="100" y="126.5" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2" className="fill-cream font-sans">
        EST. 1952
      </text>
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoBadge className="h-12 w-12 shrink-0" />
      <span className="leading-none">
        <span className="block font-display text-xl font-bold text-cream">Rand &amp; Razor</span>
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-brass">
          Barber Co.
        </span>
      </span>
    </span>
  )
}
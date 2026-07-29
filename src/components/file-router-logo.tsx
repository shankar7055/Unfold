export function FileRouterLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      role="img"
      aria-label="Unfold logo"
    >
      <defs>
        <linearGradient id="unfold-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="unfold-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 50)">
        <path
          d="M 50,50 L 250,50 L 250,350 L 50,350 Z"
          fill="url(#unfold-grad1)"
          opacity="0.9"
        />
        <path
          d="M 250,50 L 350,150 L 250,350 Z"
          fill="url(#unfold-grad2)"
          opacity="0.85"
        />
        <path
          d="M 250,150 L 320,280 L 210,350 Z"
          fill="#FBBF24"
          opacity="0.95"
        />
        <path
          d="M 50,50 L 250,50 L 210,350 L 50,350 Z"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          opacity="0.3"
        />
      </g>
    </svg>
  )
}

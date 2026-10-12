import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export function AppLogo({ className = '', size = 44 }: AppLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-md shadow-indigo-500/25 ring-1 ring-white/20 select-none overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      title="Logo de la Aplicación"
    >
      {/* Subtle glossy sheen */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />

      <svg
        width={Math.round(size * 0.64)}
        height={Math.round(size * 0.64)}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-xs"
      >
        {/* Calendar / Notebook Body */}
        <rect
          x="3.5"
          y="6.5"
          width="25"
          height="21"
          rx="5"
          fill="#FFFFFF"
          fillOpacity="0.18"
        />
        <rect
          x="3.5"
          y="6.5"
          width="25"
          height="21"
          rx="5"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {/* Top Spiral Rings */}
        <line x1="9" y1="3" x2="9" y2="7.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="3" x2="16" y2="7.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="23" y1="3" x2="23" y2="7.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Header divider line */}
        <path d="M4 12.5H28" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.9" />

        {/* Distinctive Schedule Grid dots */}
        <circle cx="9" cy="17" r="1.5" fill="#93C5FD" />
        <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
        <circle cx="23" cy="17" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />

        {/* Dynamic Fast-Check Accent Mark */}
        <path
          d="M8.5 22.5L12 25.5L23.5 19"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sparkle star in upper corner */}
        <path
          d="M24 8.5L24.6 9.8L26 10.1L24.9 11L25.2 12.4L24 11.7L22.8 12.4L23.1 11L22 10.1L23.4 9.8L24 8.5Z"
          fill="#FDE047"
        />
      </svg>
    </div>
  );
}

import React from 'react';

export interface AppLogoProps {
  size?: number;
  className?: string;
  variant?: 'official' | 'monogram' | 'calendar';
  alt?: string;
}

/**
 * AppLogo Oficial de Tu Agenda Lista
 * SVG vectorial con la letra 'A' en relieve dorado brillante (Embossed Brilliant Gold 3D).
 */
export function AppLogo({
  size = 40,
  className = '',
  alt = 'Tu Agenda Lista Logo Oficial',
}: AppLogoProps) {
  const uid = 'goldA';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title={alt}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-label={alt}
      >
        <defs>
          {/* Outer Beveled Medallion Gradient */}
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E2330" />
            <stop offset="50%" stopColor="#0F131D" />
            <stop offset="100%" stopColor="#07090E" />
          </linearGradient>

          {/* Outer Rim Gold Gradient */}
          <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4BE" />
            <stop offset="25%" stopColor="#E5BE5E" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#8F6211" />
            <stop offset="100%" stopColor="#F9DF88" />
          </linearGradient>

          {/* Inner Relief Groove */}
          <linearGradient id={`${uid}-innerGroove`} x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A3408" />
            <stop offset="50%" stopColor="#C89D30" />
            <stop offset="100%" stopColor="#FFF7D6" />
          </linearGradient>

          {/* Chiseled 'A' - Left Highlighted Bevel Facet */}
          <linearGradient id={`${uid}-facetLeft`} x1="25" y1="20" x2="52" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="20%" stopColor="#FDE184" />
            <stop offset="55%" stopColor="#E2B74B" />
            <stop offset="85%" stopColor="#B38622" />
            <stop offset="100%" stopColor="#7A530C" />
          </linearGradient>

          {/* Chiseled 'A' - Right Shadowed Bevel Facet */}
          <linearGradient id={`${uid}-facetRight`} x1="50" y1="20" x2="78" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8C56B" />
            <stop offset="30%" stopColor="#C4962A" />
            <stop offset="70%" stopColor="#8C6314" />
            <stop offset="100%" stopColor="#553805" />
          </linearGradient>

          {/* Chiseled 'A' - Crossbar Emboss Gradient */}
          <linearGradient id={`${uid}-crossbar`} x1="38" y1="56" x2="62" y2="61" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF8D1" />
            <stop offset="40%" stopColor="#E4BA50" />
            <stop offset="70%" stopColor="#C29227" />
            <stop offset="100%" stopColor="#855B0F" />
          </linearGradient>

          {/* Embossed Drop Shadow for 3D Relief Lift */}
          <filter id={`${uid}-reliefShadow`} x="10" y="10" width="80" height="85" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#000000" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.85" />
          </filter>

          {/* Specular Glint Glow */}
          <radialGradient id={`${uid}-glint`} cx="50" cy="20.5" r="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFEAA7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Base Medallion / Background Shield */}
        <rect x="4" y="4" width="92" height="92" rx="26" fill={`url(#${uid}-bg)`} />

        {/* 2. Outer Embossed Gold Border */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="26"
          stroke={`url(#${uid}-rim)`}
          strokeWidth="3"
          fill="none"
        />

        {/* 3. Inner Fine Polished Groove */}
        <rect
          x="9"
          y="9"
          width="82"
          height="82"
          rx="22"
          stroke={`url(#${uid}-innerGroove)`}
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* 4. Top Soft Specular Dome Sheen */}
        <path
          d="M10 32 C 20 14, 80 14, 90 32 C 80 16, 68 10, 50 10 C 32 10, 20 16, 10 32 Z"
          fill="#FFF9E0"
          fillOpacity="0.18"
        />

        {/* 5. The Sculpted Letter 'A' in Embossed Brilliant Gold Relief */}
        <g filter={`url(#${uid}-reliefShadow)`}>
          {/* Left Serif Foot with Beveled Relief */}
          <path
            d="M21 78 H36 C36 78, 35 75, 33 75 C31 75, 30.5 73, 31 70 L48 24 C48.5 22.5 49.5 22 50 22 L46 22 L29 70 C28.5 72, 26 75, 23 75 C21 75, 21 78, 21 78 Z"
            fill={`url(#${uid}-facetLeft)`}
          />

          {/* Left Main Pillar / Facet with Bright Golden Polish */}
          <path
            d="M50 20 L30 74 H41.5 L46.5 59.5 H50 L50 20 Z"
            fill={`url(#${uid}-facetLeft)`}
          />

          {/* Right Main Pillar / Facet with Deeper Burnished Shadowing */}
          <path
            d="M50 20 L50 59.5 H53.5 L58.5 74 H70 L50 20 Z"
            fill={`url(#${uid}-facetRight)`}
          />

          {/* Right Serif Foot with Beveled Relief */}
          <path
            d="M79 78 H64 C64 78, 65 75, 67 75 C69 75, 69.5 73, 69 70 L52 24 C51.5 22.5 50.5 22 50 22 L54 22 L71 70 C71.5 72, 74 75, 77 75 C79 75, 79 78, 79 78 Z"
            fill={`url(#${uid}-facetRight)`}
          />

          {/* Inner Chiseled Triangle Counter */}
          <path
            d="M50 31 L44.5 50 H55.5 L50 31 Z"
            fill="#0B0F17"
            fillOpacity="0.95"
          />

          {/* Raised Beveled Crossbar with Stepped Golden Edge */}
          <path
            d="M38 56.5 H62 L60.5 61 H39.5 L38 56.5 Z"
            fill={`url(#${uid}-crossbar)`}
          />

          {/* Sharp Central Ridge Highlight Line (Embossed Chisel Peak) */}
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="31"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* Left Upper Ridge Specular Line */}
          <line
            x1="49.5"
            y1="21"
            x2="31.5"
            y2="71"
            stroke="#FFFDF0"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* Crossbar Top Light Rim */}
          <line
            x1="38"
            y1="56.5"
            x2="62"
            y2="56.5"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.85"
          />

          {/* Apex Crown Diamond / Jewel Gem at the top of 'A' */}
          <circle cx="50" cy="20.5" r="2" fill="#FFFFFF" />
          <circle cx="50" cy="20.5" r="5" fill={`url(#${uid}-glint)`} />
        </g>
      </svg>
    </div>
  );
}

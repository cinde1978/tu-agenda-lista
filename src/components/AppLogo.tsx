import React from 'react';

export interface AppLogoProps {
  size?: number;
  className?: string;
  variant?: 'official' | 'monogram' | 'calendar';
  alt?: string;
}

/**
 * Logo Oficial de Tu Agenda Lista
 * Logo estilizado con la letra 'A' en tono dorado brillante (#D4AF37).
 * Silueta libre y pura, sin fondos redondos ni círculos oscuros.
 */
export function AppLogo({
  size = 40,
  className = '',
  alt = 'Tu Agenda Lista Logo',
}: AppLogoProps) {
  const uid = 'stylizedGoldA';

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
        className="w-full h-full drop-shadow-sm transition-transform"
        aria-label={alt}
      >
        <defs>
          {/* Brilliant Gold Primary Gradient (#D4AF37) */}
          <linearGradient id={`${uid}-primary`} x1="20" y1="12" x2="80" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="18%" stopColor="#FEE685" />
            <stop offset="42%" stopColor="#E5BE53" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="88%" stopColor="#AC7F1A" />
            <stop offset="100%" stopColor="#78530A" />
          </linearGradient>

          {/* Left Chiseled Facet Light Highlight */}
          <linearGradient id={`${uid}-lightFacet`} x1="15" y1="20" x2="52" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF3B8" />
            <stop offset="60%" stopColor="#E2BA4E" />
            <stop offset="100%" stopColor="#B3841D" />
          </linearGradient>

          {/* Right Chiseled Facet Shadow Accent */}
          <linearGradient id={`${uid}-shadowFacet`} x1="50" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8C462" />
            <stop offset="40%" stopColor="#C4982C" />
            <stop offset="80%" stopColor="#8C6212" />
            <stop offset="100%" stopColor="#543805" />
          </linearGradient>

          {/* Stylized Crossbar Gleam */}
          <linearGradient id={`${uid}-crossbar`} x1="30" y1="58" x2="70" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBE8" />
            <stop offset="35%" stopColor="#FFE06B" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9E7315" />
          </linearGradient>

          {/* Golden Ambient Glow */}
          <radialGradient id={`${uid}-glint`} cx="50" cy="16" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFECA0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          {/* 3D Drop Shadow for Depth */}
          <filter id={`${uid}-shadow`} x="5" y="8" width="90" height="90" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#78530A" floodOpacity="0.35" />
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.25" />
          </filter>
          {/* Mask to carve out the inner triangle of letter 'A' so it's 100% transparent */}
          <mask id={`${uid}-innerHole`}>
            <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />
            <polygon points="50,28 41.5,51 58.5,51" fill="#000000" />
          </mask>
        </defs>

        <g filter={`url(#${uid}-shadow)`} mask={`url(#${uid}-innerHole)`}>
          {/* Main Left Pillar of 'A' (Chiseled Brilliant Light Facet) */}
          <path
            d="M50 14 L46 14 C44 14 42.5 15.5 41.5 17.5 L20 74 C18.5 78 14 79 11 79.5 V85 H36 V79.5 C32.5 79 29.5 78 30.5 74 L36.5 58 H50 L50 14 Z"
            fill={`url(#${uid}-lightFacet)`}
          />

          {/* Main Right Pillar of 'A' (Chiseled Brilliant Shadow Facet) */}
          <path
            d="M50 14 L54 14 C56 14 57.5 15.5 58.5 17.5 L80 74 C81.5 78 86 79 89 79.5 V85 H64 V79.5 C67.5 79 70.5 78 69.5 74 L63.5 58 H50 L50 14 Z"
            fill={`url(#${uid}-shadowFacet)`}
          />

          {/* Apex Crown Chamfer (Gold Jewel Top) */}
          <path
            d="M44 16 C46.5 12 53.5 12 56 16 L50 14 Z"
            fill="#FFFFFF"
          />

          {/* Stylized Arch Crossbar in High-Shine Metallic Gold */}
          <path
            d="M34 60 C42 57 58 57 66 60 L64 66 C56 63.5 44 63.5 36 66 L34 60 Z"
            fill={`url(#${uid}-crossbar)`}
          />

          {/* Specular White-Gold Central Crease Light */}
          <line
            x1="50"
            y1="14"
            x2="50"
            y2="28"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.95"
          />

          {/* Left Bevel Specular Sheen Stripe */}
          <line
            x1="49"
            y1="16"
            x2="23"
            y2="76"
            stroke="#FFFDF2"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />

          {/* Top Crossbar Specular Rim */}
          <path
            d="M35 60 C43 57.5 57 57.5 65 60"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* Specular Glint Accent at the Apex Peak */}
          <circle cx="50" cy="15" r="2.2" fill="#FFFFFF" />
          <circle cx="50" cy="15" r="6" fill={`url(#${uid}-glint)`} />
        </g>
      </svg>
    </div>
  );
}

export default AppLogo;

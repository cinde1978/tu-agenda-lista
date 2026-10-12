import React, { useState } from 'react';
import { CalendarCheckLogo, CalendarCheckLogoProps } from './CalendarCheckLogo';

export interface AppLogoProps extends Partial<CalendarCheckLogoProps> {
  size?: number;
  className?: string;
  showFallbackOnFail?: boolean;
}

/**
 * AppLogo: Official Brand Logo for "Tu Agenda Lista".
 * Uses the luxury official logo image (/logo.png) in elegant gold & dark tones.
 */
export function AppLogo({
  size = 40,
  className = '',
  showFallbackOnFail = true,
}: AppLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError && showFallbackOnFail) {
    return <CalendarCheckLogo size={size} className={className} />;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-slate-950 ring-1.5 ring-[#D4AF37]/60 shadow-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        src="/logo.png"
        alt="Tu Agenda Lista"
        className="w-full h-full object-cover rounded-full"
        loading="eager"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export { CalendarCheckLogo };

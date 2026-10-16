import React, { useState } from 'react';
import officialLogo from '../assets/logo.png';
import { AgendaMonogramLogo } from './AgendaMonogramLogo';
import { CalendarCheckLogo } from './CalendarCheckLogo';

export interface AppLogoProps {
  size?: number;
  className?: string;
  variant?: 'official' | 'monogram' | 'calendar';
  alt?: string;
}

/**
 * AppLogo: Logo oficial exacto de la aplicación.
 * Muestra el logo dorado de lujo exacto (/logo.png) cargado por el usuario.
 */
export function AppLogo({
  size = 40,
  className = '',
  variant = 'official',
  alt = 'Tu Agenda Lista Logo Oficial',
}: AppLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (variant === 'calendar') {
    return <CalendarCheckLogo size={size} className={className} />;
  }

  if (variant === 'monogram' || imgError) {
    return <AgendaMonogramLogo size={size} className={className} title={alt} />;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-[#0A0D14] ring-1.5 ring-[#D4AF37]/70 shadow-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
    >
      <img
        src={officialLogo || '/logo.png'}
        alt={alt}
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover rounded-full select-none transform transition-transform duration-200"
      />
    </div>
  );
}

export { AgendaMonogramLogo, CalendarCheckLogo };

import React from 'react';
import { AgendaMonogramLogo, AgendaMonogramLogoProps } from './AgendaMonogramLogo';
import { CalendarCheckLogo } from './CalendarCheckLogo';

export interface AppLogoProps extends AgendaMonogramLogoProps {
  size?: number;
  className?: string;
  variant?: 'official' | 'monogram' | 'calendar';
  alt?: string;
}

/**
 * AppLogo Oficial de Tu Agenda Lista
 * Monograma SVG vectorial de alta gama:
 * Círculo dorado metálico con la letra 'A' entrelazada con un tilde
 * de verificación (checkmark) en oro brillante. 100% Vectorial, sin imágenes raster.
 */
export function AppLogo({
  size = 40,
  className = '',
  variant = 'official',
  alt = 'Tu Agenda Lista Monograma Oficial',
}: AppLogoProps) {
  if (variant === 'calendar') {
    return <CalendarCheckLogo size={size} className={className} />;
  }

  // Official & Monogram use the vector metallic gold monogram
  return <AgendaMonogramLogo size={size} className={className} title={alt} />;
}

export { AgendaMonogramLogo, CalendarCheckLogo };

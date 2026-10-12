import React from 'react';
import { AgendaMonogramLogo } from './AgendaMonogramLogo';
import { CalendarCheckLogo, CalendarCheckLogoProps } from './CalendarCheckLogo';

export interface AppLogoProps extends Partial<CalendarCheckLogoProps> {
  size?: number;
  className?: string;
  variant?: 'monogram' | 'calendar';
}

/**
 * AppLogo: Official Brand Logo for "Tu Agenda Lista".
 * Renders the vector SVG monogram with metallic gold circle,
 * letter 'A' entwined with a brilliant gold checkmark.
 */
export function AppLogo({
  size = 40,
  className = '',
  variant = 'monogram',
}: AppLogoProps) {
  if (variant === 'calendar') {
    return <CalendarCheckLogo size={size} className={className} />;
  }

  return (
    <AgendaMonogramLogo
      size={size}
      className={`transition-transform duration-200 ${className}`}
      title="Tu Agenda Lista"
    />
  );
}

export { AgendaMonogramLogo, CalendarCheckLogo };

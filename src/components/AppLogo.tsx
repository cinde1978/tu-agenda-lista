import React from 'react';
import { CalendarCheckLogo, CalendarCheckLogoProps } from './CalendarCheckLogo';

export interface AppLogoProps extends CalendarCheckLogoProps {}

/**
 * AppLogo: Primary brand vector mark for "Tu Agenda Lista".
 * Combines an elegant calendar card and a checkmark (tilde de verificación)
 * in tones of blue and violet with rounded borders and modern SaaS styling.
 */
export function AppLogo(props: AppLogoProps) {
  return <CalendarCheckLogo {...props} />;
}

export { CalendarCheckLogo };

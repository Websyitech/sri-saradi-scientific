import React from 'react';

export type IconName = 'target' | 'document' | 'box' | 'support' | 'network' | 'time' | 'people';

interface SvgIconProps {
  name: IconName | string;
  className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ name, className }) => {
  switch (name) {
    case 'target':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" />
        </svg>
      );
    case 'box':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <path d="m3 7 9-4 9 4v10l-9 4-9-4zm0 0 9 4 9-4M12 11v10M8 5l9 4" />
        </svg>
      );
    case 'support':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <path d="M4 13V11a8 8 0 0 1 16 0v5q0 5-6 5M4 10H2v7h4v-7m14 0h2v7h-4v-7M12 21h3" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <path d="m10 8-4 8m8-8 4 8M8 19h8" />
        </svg>
      );
    case 'time':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 3" />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-3q0-4 6-4t6 4v3M17 5q6 2 0 6m1 3q3 1 3 6" />
        </svg>
      );
    default:
      return null;
  }
};

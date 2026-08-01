import React from 'react';

// Palette of rich, harmonious background colors
const COLORS = [
  { bg: '#1e3a5f', text: '#ffffff' }, // Deep navy
  { bg: '#7c3aed', text: '#ffffff' }, // Violet
  { bg: '#0f766e', text: '#ffffff' }, // Teal
  { bg: '#b45309', text: '#ffffff' }, // Amber
  { bg: '#9d174d', text: '#ffffff' }, // Rose
  { bg: '#1d4ed8', text: '#ffffff' }, // Blue
  { bg: '#065f46', text: '#ffffff' }, // Emerald
  { bg: '#92400e', text: '#ffffff' }, // Warm brown
  { bg: '#4c1d95', text: '#ffffff' }, // Deep purple
  { bg: '#be123c', text: '#ffffff' }, // Crimson
];

function getColorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

interface InitialAvatarProps {
  name: string;
  size?: number;       // diameter in px (default 48)
  fontSize?: number;   // font size in px (default auto-scaled)
  className?: string;
}

export default function InitialAvatar({ name, size = 48, fontSize, className = '' }: InitialAvatarProps) {
  const { bg, text } = getColorForName(name);
  const initials = getInitials(name);
  const computedFontSize = fontSize ?? Math.round(size * 0.38);

  return (
    <div
      className={`flex-shrink-0 select-none inline-flex items-center justify-center rounded-full font-bold leading-none ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: text,
        fontSize: computedFontSize,
        letterSpacing: '0.02em',
      }}
      aria-label={name}
      title={name}
    >
      {initials}
    </div>
  );
}

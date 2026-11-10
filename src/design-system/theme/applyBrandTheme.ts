import type { AppConfig } from '../../types/app-config';

function hexToRgb(hex: string): string {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;

  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
}

export function applyBrandTheme(config: AppConfig): void {
  const root = document.documentElement;

  root.style.setProperty('--color-primary', config.brand.primaryColor);
  root.style.setProperty('--color-primary-rgb', hexToRgb(config.brand.primaryColor));
  root.style.setProperty('--color-secondary', config.brand.secondaryColor);
  root.style.setProperty('--color-secondary-rgb', hexToRgb(config.brand.secondaryColor));
  root.style.setProperty('--font-family-base', config.brand.fontFamily);
  root.style.setProperty('--font-family-display', config.brand.fontFamily);
  root.style.setProperty('--ion-font-family', config.brand.fontFamily);
}

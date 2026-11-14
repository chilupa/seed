import type { AppConfig } from './types/app-config';

/**
 * Central branding and navigation configuration.
 * Customize this file per application without touching design-system components.
 */
export const appConfig: AppConfig = {
  appName: 'Seed',
  brand: {
    // Modern product: ink blue + soft cyan
    // applyBrandTheme derives shade/tint/contrast/focus ring.
    primaryColor: '#1D4ED8',
    secondaryColor: '#0891B2',
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
    logoSrc: '/favicon.png',
  },
  defaultTheme: 'system',
  defaultTab: 'home',
  tabs: [
    {
      id: 'home',
      label: 'Home',
      href: '/tabs/home',
      icon: 'homeOutline',
      iconActive: 'home',
    },
    {
      id: 'explore',
      label: 'Explore',
      href: '/tabs/explore',
      icon: 'searchOutline',
      iconActive: 'search',
    },
    {
      id: 'create',
      label: 'Create',
      href: '/tabs/create',
      icon: 'addOutline',
      iconActive: 'add',
      kind: 'create',
    },
    {
      id: 'activity',
      label: 'Activity',
      href: '/tabs/activity',
      icon: 'notificationsOutline',
      iconActive: 'notifications',
      badge: 3,
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/tabs/profile',
      icon: 'personOutline',
      iconActive: 'person',
      kind: 'profile',
    },
  ],
};

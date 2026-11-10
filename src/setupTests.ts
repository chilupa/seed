// Adds jest-dom's DOM matchers (toBeInTheDocument, toHaveTextContent, ...) to Vitest's expect.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

window.matchMedia =
  window.matchMedia ||
  function (query: string): MediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    };
  };

const memoryStore = new Map<string, string>();

vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: async ({ key }: { key: string }) => ({ value: memoryStore.get(key) ?? null }),
    set: async ({ key, value }: { key: string; value: string }) => {
      memoryStore.set(key, value);
    },
    remove: async ({ key }: { key: string }) => {
      memoryStore.delete(key);
    },
  },
}));

vi.mock('@capacitor/status-bar', () => ({
  StatusBar: {
    setStyle: async () => undefined,
  },
  Style: {
    Dark: 'DARK',
    Light: 'LIGHT',
    Default: 'DEFAULT',
  },
}));

vi.mock('@capacitor/keyboard', () => ({
  Keyboard: {
    setAccessoryBarVisible: async () => undefined,
  },
}));

vi.mock('@capacitor/network', () => ({
  Network: {
    getStatus: async () => ({ connected: true, connectionType: 'wifi' }),
    addListener: async () => ({ remove: async () => undefined }),
  },
}));

vi.mock('@capacitor/haptics', () => ({
  Haptics: {
    impact: async () => undefined,
    notification: async () => undefined,
    selectionStart: async () => undefined,
    selectionChanged: async () => undefined,
    selectionEnd: async () => undefined,
  },
  ImpactStyle: { Light: 'LIGHT', Medium: 'MEDIUM', Heavy: 'HEAVY' },
  NotificationType: { Success: 'SUCCESS', Warning: 'WARNING', Error: 'ERROR' },
}));

vi.mock('@capacitor/app', () => ({
  App: {
    addListener: async () => ({ remove: async () => undefined }),
    exitApp: async () => undefined,
  },
}));

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => false,
    getPlatform: () => 'web',
  },
}));

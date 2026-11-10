import { useEffect, useState } from 'react';

import { appConfig } from '../app.config';
import { applyBrandTheme } from '../design-system';
import { configureKeyboard } from '../services/native/keyboard';
import { useAuthStore } from '../store/authStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { useThemeStore } from '../store/themeStore';
import type { UserProfile } from '../types/user';
import { getStorageItem } from '../utils/storage';

export function useAppBootstrap(): { ready: boolean } {
  const [ready, setReady] = useState(false);
  const hydrateTheme = useThemeStore((state) => state.hydrate);
  const hydratePreferences = usePreferencesStore((state) => state.hydrate);
  const setSession = useAuthStore((state) => state.setSession);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      applyBrandTheme(appConfig);
      await Promise.all([
        hydrateTheme(appConfig.defaultTheme),
        hydratePreferences(),
        configureKeyboard(),
      ]);

      const token = await getStorageItem('auth_token');
      const userRaw = await getStorageItem('auth_user');
      if (token && userRaw) {
        try {
          const user = JSON.parse(userRaw) as UserProfile;
          await setSession(user, token);
        } catch {
          // Ignore corrupt persisted auth payloads.
        }
      }
      setHydrated(true);

      if (!cancelled) {
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hydratePreferences, hydrateTheme, setHydrated, setSession]);

  return { ready };
}

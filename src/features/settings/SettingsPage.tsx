import { IonContent, IonPage, IonToggle } from '@ionic/react';
import type { ReactElement } from 'react';

import { appConfig } from '../../app.config';
import {
  AppBanner,
  AppCard,
  AppHeader,
  AppListItem,
  AppSelect,
  type IconName,
} from '../../design-system';
import { usePreferencesStore, useThemeStore } from '../../store';
import type { ThemeMode } from '../../types';

const themeOptions = [
  { value: 'light' as const, label: 'Light' },
  { value: 'dark' as const, label: 'Dark' },
  { value: 'system' as const, label: 'System' },
];

const themeIcons: Record<ThemeMode, IconName> = {
  light: 'sunnyOutline',
  dark: 'moonOutline',
  system: 'contrastOutline',
};

export function SettingsPage(): ReactElement {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const notificationsEnabled = usePreferencesStore((state) => state.notificationsEnabled);
  const reduceMotion = usePreferencesStore((state) => state.reduceMotion);
  const setPreference = usePreferencesStore((state) => state.setPreference);

  return (
    <IonPage>
      <AppHeader title="Settings" showBack />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <AppBanner
            tone="info"
            title="Brand from config"
            message={`${appConfig.appName} reads colors, font, and tabs from app.config.ts.`}
          />

          <AppCard title="Appearance" variant="outlined">
            <AppListItem
              title="Theme"
              subtitle="Light, dark, or system"
              leadingIcon={themeIcons[mode]}
              detail={false}
              trailing={
                <AppSelect
                  ariaLabel="Theme"
                  header="Theme"
                  value={mode}
                  options={themeOptions}
                  onChange={(next) => {
                    void setMode(next);
                  }}
                />
              }
            />
            <AppListItem
              title="Reduce motion"
              subtitle="Prefer quieter transitions"
              leadingIcon="constructOutline"
              detail={false}
              trailing={
                <IonToggle
                  checked={reduceMotion}
                  aria-label="Reduce motion"
                  onIonChange={(event) => {
                    void setPreference('reduceMotion', event.detail.checked);
                  }}
                />
              }
            />
          </AppCard>

          <AppCard title="Notifications" variant="outlined">
            <AppListItem
              title="Product updates"
              subtitle="Release notes and feature tips"
              leadingIcon="notificationsOutline"
              detail={false}
              trailing={
                <IonToggle
                  checked={notificationsEnabled}
                  aria-label="Product updates"
                  onIonChange={(event) => {
                    void setPreference('notificationsEnabled', event.detail.checked);
                  }}
                />
              }
            />
          </AppCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

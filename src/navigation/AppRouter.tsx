import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { appConfig } from '../app.config';
import { LoginPage, RegisterPage } from '../features/auth';
import { SettingsPage } from '../features/settings';
import { ShowcasePage } from '../features/showcase';
import { useAndroidBackButton } from '../hooks';

import { TabNavigation } from './TabNavigation';

function RouterEffects(): null {
  useAndroidBackButton();
  return null;
}

function resolveDefaultTabHref(): string {
  const match =
    appConfig.tabs.find((tab) => tab.id === appConfig.defaultTab) ?? appConfig.tabs[0];
  return match?.href ?? '/tabs/home';
}

export function AppRouter(): ReactElement {
  const defaultTabHref = resolveDefaultTabHref();

  return (
    <IonReactRouter>
      <RouterEffects />
      <IonRouterOutlet>
        <Route
          path="/tabs/*"
          element={
            <TabNavigation tabs={appConfig.tabs} defaultTab={appConfig.defaultTab} />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/" element={<Navigate to={defaultTabHref} replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

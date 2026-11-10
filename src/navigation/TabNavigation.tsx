import { IonRouterOutlet, IonTabs } from '@ionic/react';
import type { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { appConfig } from '../app.config';
import { AppTabBar } from '../design-system';
import { ActivityPage } from '../features/activity';
import { CreatePage } from '../features/create';
import { ExplorePage } from '../features/explore';
import { HomePage } from '../features/home';
import { ProfilePage } from '../features/profile';
import type { AppTabConfig } from '../types/app-config';

export interface TabNavigationProps {
  tabs?: AppTabConfig[];
  defaultTab?: string;
}

function resolveDefaultPath(tabs: AppTabConfig[], defaultTab: string): string {
  const match = tabs.find((tab) => tab.id === defaultTab) ?? tabs[0];
  if (!match) {
    return 'home';
  }
  return match.href.replace(/^\/tabs\/?/, '') || match.id;
}

export function TabNavigation({
  tabs = appConfig.tabs,
  defaultTab = appConfig.defaultTab,
}: TabNavigationProps): ReactElement {
  const defaultPath = resolveDefaultPath(tabs, defaultTab);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="home" element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route index element={<Navigate to={defaultPath} replace />} />
      </IonRouterOutlet>
      <AppTabBar tabs={tabs} defaultTab={defaultTab} />
    </IonTabs>
  );
}

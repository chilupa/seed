import { IonTabBar, IonTabButton } from '@ionic/react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthStore } from '../../../store';
import type { AppTabConfig } from '../../../types/app-config';
import { AppAvatar } from '../AppAvatar';
import { AppIcon } from '../AppIcon';

import './AppTabBar.css';

export interface AppTabBarProps {
  tabs: AppTabConfig[];
  /** Tab id used when the current path does not match any tab */
  defaultTab?: string;
}

export function AppTabBar({ tabs, defaultTab }: AppTabBarProps): ReactElement {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const profileName = user?.name ?? 'Guest';
  const profileAvatar = user?.avatarUrl;

  const matchedTab = tabs.find((tab) => location.pathname.startsWith(tab.href));
  const activeTabId = matchedTab?.id ?? defaultTab ?? tabs[0]?.id;

  return (
    <IonTabBar slot="bottom" className="app-tab-bar app-tab-bar--glass">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const iconName = isActive ? (tab.iconActive ?? tab.icon) : tab.icon;
        const showBadge = tab.badge !== undefined && tab.badge !== 0 && tab.badge !== '0';
        const kind = tab.kind ?? 'default';

        return (
          <IonTabButton
            key={tab.id}
            tab={tab.id}
            href={tab.href}
            selected={isActive}
            aria-label={
              showBadge ? `${tab.label}, ${String(tab.badge)} notifications` : tab.label
            }
            className={[
              'app-tab-bar__button',
              `app-tab-bar__button--${kind}`,
              isActive ? 'is-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {kind === 'profile' ? (
              <span
                className={
                  isActive
                    ? 'app-tab-bar__profile-wrap is-active'
                    : 'app-tab-bar__profile-wrap'
                }
              >
                <AppAvatar name={profileName} src={profileAvatar} size="sm" />
              </span>
            ) : kind === 'create' ? (
              <span className={isActive ? 'app-tab-bar__create is-active' : 'app-tab-bar__create'}>
                <AppIcon name={iconName} size="sm" />
              </span>
            ) : (
              <span className="app-tab-bar__icon-wrap">
                <AppIcon name={iconName} size="md" />
                {showBadge ? (
                  <span className="app-tab-bar__badge" aria-hidden="true">
                    {tab.badge}
                  </span>
                ) : null}
              </span>
            )}
          </IonTabButton>
        );
      })}
    </IonTabBar>
  );
}

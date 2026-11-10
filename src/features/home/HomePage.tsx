import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  type RefresherEventDetail,
} from '@ionic/react';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { appConfig } from '../../app.config';
import {
  AppBadge,
  AppBanner,
  AppButton,
  AppCard,
  AppHeader,
  AppListItem,
} from '../../design-system';
import { useNetworkStatus } from '../../hooks';
import { hapticImpact } from '../../utils/haptics';

const highlights = [
  {
    title: 'Design tokens first',
    subtitle: 'Brand colors, type, and spacing live in one place.',
  },
  {
    title: 'Feature-based folders',
    subtitle: 'Keep screens, hooks, and services close to the feature.',
  },
  {
    title: 'Capacitor ready',
    subtitle: 'Preferences, haptics, keyboard, and status bar utilities included.',
  },
];

export function HomePage(): ReactElement {
  const navigate = useNavigate();
  const { isOffline } = useNetworkStatus();
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await hapticImpact();
    await new Promise((resolve) => setTimeout(resolve, 700));
    setRefreshedAt(new Date().toLocaleTimeString());
    event.detail.complete();
  };

  return (
    <IonPage>
      <AppHeader
        title={appConfig.appName}
        endActions={
          <AppButton variant="text" onClick={() => navigate('/showcase')}>
            Showcase
          </AppButton>
        }
      />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="page-container stack-lg">
          {isOffline ? (
            <AppBanner
              tone="warning"
              title="You are offline"
              message="Cached content is still available. Pull to refresh when you reconnect."
            />
          ) : null}

          <section>
            <div className="stack">
              <div>
                <h1 className="page-hero-title">Build once, ship everywhere</h1>
                <p className="section-subtitle">
                  A production-minded Ionic React starter with a shared design system and
                  config-driven navigation.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <AppBadge color="primary">Ionic 9</AppBadge>
                <AppBadge color="secondary">Capacitor 8</AppBadge>
                <AppBadge color="info">Zustand</AppBadge>
              </div>
            </div>
          </section>

          <section className="stack">
            {highlights.map((item) => (
              <AppCard
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                variant="elevated"
              >
                Use this pattern as the foundation for every new mobile product.
              </AppCard>
            ))}
          </section>

          <section>
            <AppCard title="Quick actions" variant="outlined">
              <div className="stack">
                <AppButton fullWidth onClick={() => navigate('/showcase')}>
                  Open component showcase
                </AppButton>
                <AppButton variant="outline" fullWidth onClick={() => navigate('/settings')}>
                  Open settings
                </AppButton>
                {refreshedAt ? (
                  <p className="muted">Last refreshed at {refreshedAt}</p>
                ) : (
                  <p className="muted">Pull down to try pull-to-refresh.</p>
                )}
              </div>
            </AppCard>
          </section>

          <section>
            <h2 className="section-title">Continue exploring</h2>
            <AppListItem
              title="Explore"
              subtitle="Browse sample collections and search"
              leadingIcon="compassOutline"
              routerLink="/tabs/explore"
            />
            <AppListItem
              title="Activity"
              subtitle="Review notifications and updates"
              leadingIcon="notificationsOutline"
              routerLink="/tabs/activity"
            />
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}

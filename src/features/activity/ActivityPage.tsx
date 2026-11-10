import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import type { ReactElement } from 'react';

import {
  AppBadge,
  AppBanner,
  AppEmptyState,
  AppHeader,
  AppListItem,
  AppToast,
} from '../../design-system';

const initialItems = [
  {
    id: 'a1',
    title: 'Design system updated',
    subtitle: 'New tokens for shadows and radius are ready to use.',
    unread: true,
  },
  {
    id: 'a2',
    title: 'Pull-to-refresh demo',
    subtitle: 'Try refreshing the Home tab for haptic feedback.',
    unread: true,
  },
  {
    id: 'a3',
    title: 'Offline-friendly alert',
    subtitle: 'Network status hooks power warning banners.',
    unread: false,
  },
];

export function ActivityPage(): ReactElement {
  const [items, setItems] = useState(initialItems);
  const [toastOpen, setToastOpen] = useState(false);

  const unreadCount = items.filter((item) => item.unread).length;

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    setToastOpen(true);
  };

  return (
    <IonPage>
      <AppHeader title="Activity" />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <h2 className="section-title">Updates</h2>
            <AppBadge color={unreadCount > 0 ? 'danger' : 'success'}>
              {unreadCount > 0 ? `${unreadCount} new` : 'All caught up'}
            </AppBadge>
          </div>

          {unreadCount > 0 ? (
            <AppBanner
              tone="info"
              title="You have unread updates"
              message="Mark them as read when you are done reviewing."
              action={
                <button
                  type="button"
                  onClick={markAllRead}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: 'inherit',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Mark all
                </button>
              }
            />
          ) : null}

          {items.length === 0 ? (
            <AppEmptyState
              title="No activity yet"
              description="Notifications and product updates will show up here."
              icon="notificationsOutline"
            />
          ) : (
            <div>
              {items.map((item) => (
                <AppListItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  leadingIcon={item.unread ? 'notifications' : 'notificationsOutline'}
                  trailing={item.unread ? <AppBadge color="danger">New</AppBadge> : undefined}
                  detail={false}
                />
              ))}
            </div>
          )}
        </div>
        <AppToast
          isOpen={toastOpen}
          message="All activity marked as read"
          color="success"
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}

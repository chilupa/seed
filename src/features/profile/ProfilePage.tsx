import { IonContent, IonPage, IonToggle } from '@ionic/react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppAvatar, AppButton, AppCard, AppHeader, AppListItem } from '../../design-system';
import { useAuthStore, usePreferencesStore, useThemeStore } from '../../store';

export function ProfilePage(): ReactElement {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearSession = useAuthStore((state) => state.clearSession);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const hapticsEnabled = usePreferencesStore((state) => state.hapticsEnabled);
  const setPreference = usePreferencesStore((state) => state.setPreference);

  const displayName = user?.name ?? 'Guest Explorer';
  const displayEmail = user?.email ?? 'Sign in to sync preferences across devices.';

  return (
    <IonPage>
      <AppHeader title="Profile" />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <AppCard variant="elevated">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <AppAvatar name={displayName} size="lg" />
              <div>
                <h2 className="section-title">{displayName}</h2>
                <p className="section-subtitle">{displayEmail}</p>
              </div>
            </div>
          </AppCard>

          <section>
            <h3 className="section-label">Preferences</h3>
            <AppListItem
              title="Dark mode"
              subtitle={mode === 'dark' ? 'On' : mode === 'light' ? 'Off' : 'Follow system'}
              leadingIcon={mode === 'dark' ? 'moonOutline' : 'sunnyOutline'}
              trailing={
                <IonToggle
                  checked={mode === 'dark'}
                  aria-label="Toggle dark mode"
                  onIonChange={(event) => {
                    void setMode(event.detail.checked ? 'dark' : 'light');
                  }}
                />
              }
              detail={false}
            />
            <AppListItem
              title="Haptic feedback"
              subtitle="Subtle vibration on key actions"
              leadingIcon="constructOutline"
              trailing={
                <IonToggle
                  checked={hapticsEnabled}
                  aria-label="Toggle haptic feedback"
                  onIonChange={(event) => {
                    void setPreference('hapticsEnabled', event.detail.checked);
                  }}
                />
              }
              detail={false}
            />
          </section>

          <section>
            <h3 className="section-label">Account</h3>
            <AppListItem
              title="Settings"
              subtitle="Branding notes, theme, and notifications"
              leadingIcon="settingsOutline"
              onClick={() => navigate('/settings')}
            />
            <AppListItem
              title="Component showcase"
              subtitle="Preview every reusable UI primitive"
              leadingIcon="constructOutline"
              onClick={() => navigate('/showcase')}
            />
          </section>

          <div className="stack">
            {isAuthenticated ? (
              <AppButton variant="danger" fullWidth onClick={() => void clearSession()}>
                Sign out
              </AppButton>
            ) : (
              <>
                <AppButton fullWidth onClick={() => navigate('/login')}>
                  Sign in
                </AppButton>
                <AppButton variant="outline" fullWidth onClick={() => navigate('/register')}>
                  Create account
                </AppButton>
              </>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

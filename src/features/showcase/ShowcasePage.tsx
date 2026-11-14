import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import type { ReactElement } from 'react';

import {
  AppAvatar,
  AppBadge,
  AppBanner,
  AppButton,
  AppCard,
  AppConfirm,
  AppEmptyState,
  AppHeader,
  AppIcon,
  AppInput,
  AppListItem,
  AppLoading,
  AppModal,
  AppSearchBar,
  AppSelect,
  AppToast,
  TextHeading,
} from '../../design-system';

export function ShowcasePage(): ReactElement {
  const [search, setSearch] = useState('');
  const [themeDemo, setThemeDemo] = useState('system');
  const [modalOpen, setModalOpen] = useState(false);
  const [fullPageModalOpen, setFullPageModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <IonPage>
      <AppHeader title="Component showcase" showBack />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <section className="stack">
            <TextHeading level={2} className="section-title">
              Buttons
            </TextHeading>
            <AppButton fullWidth>Primary</AppButton>
            <AppButton variant="secondary" fullWidth>
              Secondary
            </AppButton>
            <AppButton variant="outline" fullWidth>
              Outline
            </AppButton>
            <AppButton variant="text" fullWidth>
              Text
            </AppButton>
            <AppButton variant="danger" fullWidth>
              Danger
            </AppButton>
            <AppButton
              fullWidth
              loading={loading}
              onClick={() => {
                setLoading(true);
                window.setTimeout(() => setLoading(false), 1200);
              }}
            >
              Loading demo
            </AppButton>
          </section>

          <section className="stack">
            <TextHeading level={2} className="section-title">
              Cards
            </TextHeading>
            <AppCard title="Standard card" subtitle="Default surface">
              Useful for dense page content without heavy elevation.
            </AppCard>
            <AppCard title="Outlined card" subtitle="Border emphasis" variant="outlined">
              Good for forms and settings groups.
            </AppCard>
            <AppCard title="Elevated card" subtitle="Soft shadow" variant="elevated">
              Highlights primary content blocks.
            </AppCard>
          </section>

          <section className="stack">
            <TextHeading level={2} className="section-title">
              Inputs and search
            </TextHeading>
            <AppInput label="Project name" helperText="Shown on your home dashboard." />
            <AppInput label="Email" type="email" errorText="Email is required." />
            <AppSearchBar value={search} onChange={setSearch} placeholder="Search components" />
            <AppListItem
              title="Theme"
              subtitle="Opens an alert with radio options"
              leadingIcon={
                themeDemo === 'dark'
                  ? 'moonOutline'
                  : themeDemo === 'system'
                    ? 'contrastOutline'
                    : 'sunnyOutline'
              }
              detail={false}
              trailing={
                <AppSelect
                  ariaLabel="Theme"
                  header="Theme"
                  value={themeDemo}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ]}
                  onChange={setThemeDemo}
                />
              }
            />
          </section>

          <section className="stack">
            <TextHeading level={2} className="section-title">
              Feedback
            </TextHeading>
            <AppBanner tone="success" title="Saved" message="Your preferences were updated." />
            <AppBanner
              tone="warning"
              title="Check connection"
              message="Some actions need a network."
            />
            <AppBanner tone="error" title="Request failed" message="Please try again in a moment." />
            {bannerVisible ? (
              <AppBanner
                tone="info"
                title="Dismissible banner"
                message="Tap the X to hide this banner. Parent state controls visibility."
                onDismiss={() => setBannerVisible(false)}
              />
            ) : (
              <AppButton variant="outline" fullWidth onClick={() => setBannerVisible(true)}>
                Show dismissible banner
              </AppButton>
            )}
            <AppButton variant="outline" onClick={() => setToastOpen(true)}>
              Show toast
            </AppButton>
            <AppButton variant="secondary" onClick={() => setModalOpen(true)}>
              Open modal
            </AppButton>
            <AppButton variant="outline" onClick={() => setFullPageModalOpen(true)}>
              Open full page modal
            </AppButton>
            <AppButton variant="outline" onClick={() => setConfirmOpen(true)}>
              Show confirm
            </AppButton>
            <AppButton variant="text" onClick={() => setAlertOpen(true)}>
              Show alert popup
            </AppButton>
          </section>

          <section className="stack">
            <TextHeading level={2} className="section-title">
              List, avatar, badge, icons
            </TextHeading>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <AppAvatar name="Jordan Lee" />
              <AppAvatar name="Sam Ortiz" size="lg" />
              <AppBadge color="primary">Beta</AppBadge>
              <AppBadge color="success">Online</AppBadge>
              <AppIcon name="settingsOutline" size="lg" />
            </div>
            <AppListItem
              title="Nested settings route"
              subtitle="Opens outside the tab shell"
              leadingIcon="settingsOutline"
              routerLink="/settings"
            />
          </section>

          <section>
            <AppLoading message="Inline loading state" />
            <AppEmptyState
              title="Nothing here yet"
              description="Empty states help users recover when lists have no data."
              icon="informationCircleOutline"
              actionLabel="Create item"
              onAction={() => setToastOpen(true)}
            />
          </section>
        </div>

        <AppModal
          isOpen={modalOpen}
          onDidDismiss={() => setModalOpen(false)}
          title="Reusable modal"
          size="md"
          footer={
            <AppButton fullWidth onClick={() => setModalOpen(false)}>
              Close
            </AppButton>
          }
        >
          <p className="muted">
            Configure size and presentation while keeping header and footer patterns consistent.
          </p>
        </AppModal>

        <AppModal
          isOpen={fullPageModalOpen}
          onDidDismiss={() => setFullPageModalOpen(false)}
          title="Full page modal"
          size="fullscreen"
          footer={
            <AppButton fullWidth onClick={() => setFullPageModalOpen(false)}>
              Done
            </AppButton>
          }
        >
          <div className="stack">
            <p className="muted">
              Use <code>size=&quot;fullscreen&quot;</code> when the flow needs a dedicated screen
              without leaving the current route stack.
            </p>
            <AppInput label="Title" helperText="Example field inside a full page modal." />
            <AppInput label="Notes" />
          </div>
        </AppModal>

        <AppToast
          isOpen={toastOpen}
          message="Toast from the design system"
          onDidDismiss={() => setToastOpen(false)}
        />

        <AppConfirm
          isOpen={confirmOpen}
          title="Delete this item?"
          message="This action cannot be undone."
          confirmText="Delete"
          destructive
          onConfirm={() => {
            setConfirmOpen(false);
            setToastOpen(true);
          }}
          onCancel={() => setConfirmOpen(false)}
          onDidDismiss={() => setConfirmOpen(false)}
        />

        <AppConfirm
          isOpen={alertOpen}
          title="Changes saved"
          message="Your profile was updated successfully."
          confirmText="OK"
          hideCancel
          onConfirm={() => setAlertOpen(false)}
          onDidDismiss={() => setAlertOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}

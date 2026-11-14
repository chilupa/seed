import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import type { ReactNode, ReactElement } from 'react';

import { AppButton } from '../AppButton';
import { AppIcon } from '../AppIcon';

import './AppModal.css';

export type AppModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface AppModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: AppModalSize;
  presentingElement?: HTMLElement | undefined;
}

const sizeClassMap: Record<AppModalSize, string> = {
  sm: 'app-modal--sm',
  md: 'app-modal--md',
  lg: 'app-modal--lg',
  fullscreen: 'app-modal--fullscreen',
};

export function AppModal({
  isOpen,
  onDidDismiss,
  title,
  children,
  footer,
  size = 'md',
  presentingElement,
}: AppModalProps): ReactElement {
  const isFullscreen = size === 'fullscreen';

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className={`app-modal ${sizeClassMap[size]}`}
      // Card presentation fights a true full-page modal.
      presentingElement={isFullscreen ? undefined : presentingElement}
    >
      {title ? (
        <IonHeader>
          <IonToolbar>
            <IonTitle className="app-modal__title" role="heading" aria-level={2}>
              {title}
            </IonTitle>
            <IonButtons slot="end">
              <AppButton variant="text" aria-label="Close modal" onClick={onDidDismiss}>
                <AppIcon name="closeOutline" />
              </AppButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      ) : null}
      <IonContent className="app-modal__content">{children}</IonContent>
      {footer ? <div className="app-modal__footer">{footer}</div> : null}
    </IonModal>
  );
}

import { IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import type { ReactNode, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppButton } from '../AppButton';
import { AppIcon } from '../AppIcon';

import './AppHeader.css';

export type AppHeaderVariant = 'standard' | 'transparent';

export interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  endActions?: ReactNode;
  variant?: AppHeaderVariant;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  endActions,
  variant = 'standard',
}: AppHeaderProps): ReactElement {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <IonHeader
      className={`app-header app-header--${variant}`}
      translucent={variant === 'transparent'}
    >
      <IonToolbar className={`app-header__toolbar app-header__toolbar--${variant}`}>
        {showBack ? (
          <IonButtons slot="start">
            <AppButton
              variant="text"
              aria-label="Go back"
              onClick={handleBack}
              className="app-header__back"
            >
              <AppIcon name="arrowBackOutline" size="md" />
            </AppButton>
          </IonButtons>
        ) : null}
        <IonTitle className="app-header__title" role="heading" aria-level={1}>
          {title}
        </IonTitle>
        {endActions ? <IonButtons slot="end">{endActions}</IonButtons> : null}
      </IonToolbar>
    </IonHeader>
  );
}

import { IonItem, IonLabel } from '@ionic/react';
import type { ReactNode, ReactElement } from 'react';

import type { IconName } from '../../icons/iconRegistry';
import { AppIcon } from '../AppIcon';

import './AppListItem.css';

export interface AppListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: IconName;
  trailing?: ReactNode;
  href?: string;
  routerLink?: string;
  onClick?: () => void;
  detail?: boolean;
  lines?: 'full' | 'inset' | 'none';
}

export function AppListItem({
  title,
  subtitle,
  leadingIcon,
  trailing,
  href,
  routerLink,
  onClick,
  detail = Boolean(href || routerLink || onClick),
  lines = 'full',
}: AppListItemProps): ReactElement {
  return (
    <IonItem
      className="app-list-item"
      lines={lines}
      detail={detail}
      href={href}
      routerLink={routerLink}
      button={Boolean(href || routerLink || onClick)}
      onClick={onClick}
    >
      {leadingIcon ? (
        <span slot="start" className="app-list-item__leading">
          <AppIcon name={leadingIcon} size="md" />
        </span>
      ) : null}
      <IonLabel>
        <h2 className="app-list-item__title">{title}</h2>
        {subtitle ? <p className="app-list-item__subtitle">{subtitle}</p> : null}
      </IonLabel>
      {trailing ? (
        <span slot="end" className="app-list-item__trailing">
          {trailing}
        </span>
      ) : null}
    </IonItem>
  );
}

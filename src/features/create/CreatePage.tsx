import { IonContent, IonPage } from '@ionic/react';
import type { ReactElement } from 'react';

import { AppButton, AppCard, AppEmptyState, AppHeader } from '../../design-system';

export function CreatePage(): ReactElement {
  return (
    <IonPage>
      <AppHeader title="Create" />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <AppCard
            title="New post"
            subtitle="Placeholder for your compose flow"
            variant="elevated"
          >
            Wire this screen to camera, media picker, or a form when you clone the template.
          </AppCard>

          <AppEmptyState
            title="Start something new"
            description="The center create tab is ready. Replace this page with your create experience."
            icon="addOutline"
            actionLabel="Choose media"
            onAction={() => undefined}
          />

          <AppButton variant="outline" fullWidth disabled>
            Upload coming soon
          </AppButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

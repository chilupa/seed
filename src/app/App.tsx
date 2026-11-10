import { IonApp, setupIonicReact } from '@ionic/react';
import type { ReactElement } from 'react';

import { AppLoading } from '../design-system';
import { useAppBootstrap } from '../hooks';
import { AppRouter } from '../navigation';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';

import '../design-system/tokens/index.css';
import '../design-system/theme/ionic-overrides.css';
import '../design-system/theme/global.scss';

setupIonicReact({
  mode: undefined,
});

export default function App(): ReactElement {
  const { ready } = useAppBootstrap();

  if (!ready) {
    return (
      <IonApp>
        <AppLoading fullscreen message="Starting app…" />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <AppRouter />
    </IonApp>
  );
}

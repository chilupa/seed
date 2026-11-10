import { App as CapApp } from '@capacitor/app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAndroid } from '../utils/platform';

/**
 * Maps the Android hardware back button to React Router history.
 * Exits the app when there is nowhere left to go.
 */
export function useAndroidBackButton(canExitOnRoot = true): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAndroid()) {
      return;
    }

    const listener = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack || window.history.length > 1) {
        navigate(-1);
        return;
      }

      if (canExitOnRoot) {
        void CapApp.exitApp();
      }
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, [canExitOnRoot, navigate]);
}

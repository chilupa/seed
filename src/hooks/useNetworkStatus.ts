import { useEffect, useState } from 'react';

import { addNetworkListener, getNetworkStatus } from '../services/native/network';

export function useNetworkStatus(): {
  connected: boolean;
  connectionType: string;
  isOffline: boolean;
} {
  const [connected, setConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    let remove: (() => Promise<void>) | undefined;

    void (async () => {
      const status = await getNetworkStatus();
      setConnected(status.connected);
      setConnectionType(status.connectionType);

      const handle = await addNetworkListener((next) => {
        setConnected(next.connected);
        setConnectionType(next.connectionType);
      });
      remove = handle.remove;
    })();

    return () => {
      void remove?.();
    };
  }, []);

  return { connected, connectionType, isOffline: !connected };
}

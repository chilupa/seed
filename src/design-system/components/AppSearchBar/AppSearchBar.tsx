import { IonSearchbar } from '@ionic/react';
import type { ReactElement } from 'react';

import './AppSearchBar.css';

export interface AppSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AppSearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  className,
  disabled,
}: AppSearchBarProps): ReactElement {
  return (
    <IonSearchbar
      className={['app-search-bar', className].filter(Boolean).join(' ')}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      debounce={250}
      onIonInput={(event) => onChange(event.detail.value ?? '')}
      onIonClear={() => {
        onChange('');
        onClear?.();
      }}
      aria-label={placeholder}
    />
  );
}

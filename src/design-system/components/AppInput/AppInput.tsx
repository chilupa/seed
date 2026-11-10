import { IonInput, IonNote, IonText } from '@ionic/react';
import type { ComponentProps, ReactElement } from 'react';
import { forwardRef, useId } from 'react';

import './AppInput.css';

export type AppInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface AppInputProps extends Omit<ComponentProps<typeof IonInput>, 'type' | 'label'> {
  label: string;
  helperText?: string;
  errorText?: string;
  type?: AppInputType;
}

export const AppInput = forwardRef<HTMLIonInputElement, AppInputProps>(function AppInput(
  { label, helperText, errorText, type = 'text', className, name, id, ...rest },
  ref,
): ReactElement {
  const generatedId = useId();
  const inputId = id ?? (name ? `app-input-${name}` : generatedId);
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(errorText);
  const classes = ['app-input', hasError ? 'app-input--error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <label className="app-input__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="app-input__field">
        <IonInput
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          className="app-input__control"
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          {...rest}
        />
      </div>
      {hasError ? (
        <IonText color="danger" id={errorId}>
          <IonNote className="app-input__message app-input__message--error">{errorText}</IonNote>
        </IonText>
      ) : helperText ? (
        <IonNote className="app-input__message" id={helperId}>
          {helperText}
        </IonNote>
      ) : null}
    </div>
  );
});

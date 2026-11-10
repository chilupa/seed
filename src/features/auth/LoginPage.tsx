import { zodResolver } from '@hookform/resolvers/zod';
import { IonContent, IonPage } from '@ionic/react';
import type { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppButton, AppCard, AppHeader, AppInput, AppToast } from '../../design-system';
import { useAuthStore } from '../../store';
import { hapticNotification } from '../../utils/haptics';

import { loginSchema, type LoginFormValues } from './loginSchema';

export function LoginPage(): ReactElement {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex@example.com',
      password: 'password123',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await setSession(
      {
        id: 'demo-user',
        name: 'Alex Rivera',
        email: values.email,
        role: 'Product Designer',
      },
      'demo-token',
    );
    await hapticNotification();
    navigate('/tabs/profile', { replace: true });
  });

  return (
    <IonPage>
      <AppHeader title="Sign in" showBack />
      <IonContent fullscreen>
        <div className="page-container">
          <AppCard
            title="Welcome back"
            subtitle="React Hook Form + Zod validation example."
            variant="elevated"
          >
            <form className="stack" onSubmit={onSubmit} noValidate>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <AppInput
                    label="Email"
                    type="email"
                    name={field.name}
                    value={field.value}
                    onIonInput={(event) => field.onChange(event.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    errorText={errors.email?.message}
                    autocomplete="email"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <AppInput
                    label="Password"
                    type="password"
                    name={field.name}
                    value={field.value}
                    onIonInput={(event) => field.onChange(event.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    errorText={errors.password?.message}
                    helperText="Use at least 8 characters."
                    autocomplete="current-password"
                  />
                )}
              />
              <AppButton type="submit" fullWidth loading={isSubmitting}>
                Sign in
              </AppButton>
              <AppButton
                type="button"
                variant="text"
                fullWidth
                onClick={() => navigate('/register')}
              >
                Need an account? Register
              </AppButton>
            </form>
          </AppCard>
        </div>
        <AppToast isOpen={false} message="Signed in" onDidDismiss={() => undefined} />
      </IonContent>
    </IonPage>
  );
}

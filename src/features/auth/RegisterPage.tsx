import { zodResolver } from '@hookform/resolvers/zod';
import { IonContent, IonPage } from '@ionic/react';
import type { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppButton, AppCard, AppHeader, AppInput } from '../../design-system';
import { useAuthStore } from '../../store';
import { hapticNotification } from '../../utils/haptics';

import { registerSchema, type RegisterFormValues } from './registerSchema';

export function RegisterPage(): ReactElement {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await setSession(
      {
        id: 'demo-user',
        name: values.name,
        email: values.email,
        role: 'Member',
      },
      'demo-token',
    );
    await hapticNotification();
    navigate('/tabs/profile', { replace: true });
  });

  return (
    <IonPage>
      <AppHeader title="Create account" showBack />
      <IonContent fullscreen>
        <div className="page-container">
          <AppCard
            title="Join the starter"
            subtitle="Example registration flow with shared form components."
            variant="elevated"
          >
            <form className="stack" onSubmit={onSubmit} noValidate>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <AppInput
                    label="Full name"
                    name={field.name}
                    value={field.value}
                    onIonInput={(event) => field.onChange(event.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    errorText={errors.name?.message}
                    autocomplete="name"
                  />
                )}
              />
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
                    autocomplete="new-password"
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <AppInput
                    label="Confirm password"
                    type="password"
                    name={field.name}
                    value={field.value}
                    onIonInput={(event) => field.onChange(event.detail.value ?? '')}
                    onIonBlur={field.onBlur}
                    errorText={errors.confirmPassword?.message}
                    autocomplete="new-password"
                  />
                )}
              />
              <AppButton type="submit" fullWidth loading={isSubmitting}>
                Create account
              </AppButton>
              <AppButton type="button" variant="text" fullWidth onClick={() => navigate('/login')}>
                Already have an account? Sign in
              </AppButton>
            </form>
          </AppCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

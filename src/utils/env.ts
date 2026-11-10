function required(name: string, fallback?: string): string {
  const value = import.meta.env[name] as string | undefined;
  if (value && value.length > 0) {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Missing required environment variable: ${name}`);
}

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
  apiTimeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 15000),
  appEnv: (import.meta.env.VITE_APP_ENV as string | undefined) ?? 'development',
  isDev: Boolean(import.meta.env.DEV),
};

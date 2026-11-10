# Ionic React Starter Template

Production-minded Ionic React + Capacitor starter with a centralized design system, config-driven navigation, feature-based architecture, and demo screens you can replace for each new app.

## Stack

- Ionic React 9 + React 19 + TypeScript (strict)
- Capacitor 8 (iOS / Android)
- React Router 6
- Zustand, Axios, React Hook Form, Zod
- Vitest + React Testing Library
- CSS variables + SCSS

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Web app: [http://localhost:5173](http://localhost:5173)

## Project structure

```text
src/
  app/                 # App shell and bootstrap
  app.config.ts        # Branding + tab configuration
  design-system/
    components/        # Reusable UI primitives
    tokens/            # Design tokens (colors, type, spacing, …)
    theme/             # Ionic overrides + global styles
    icons/             # Central Ionicons registry
  navigation/          # Tab shell + top-level routes
  features/            # Feature modules (home, explore, auth, …)
  hooks/               # Shared hooks
  services/            # API client + native helpers
  store/               # Zustand stores
  utils/               # Platform, storage, env helpers
  types/               # Shared TypeScript types
```

## Customize branding

Edit `src/app.config.ts`:

- `appName`
- `brand.primaryColor` / `brand.secondaryColor`
- `brand.fontFamily`
- `brand.logoSrc`
- `defaultTheme`
- `tabs` (labels, icons, hrefs, badges)

Design tokens live in `src/design-system/tokens/`. Override CSS variables in an app-specific stylesheet if needed; keep components token-driven.

## Navigation

Default tabs (floating glass icon bar): Home, Explore, Create, Activity, Profile.
Set `defaultTab` in `app.config.ts` (or pass it to `TabNavigation` / `AppTabBar`) to choose the initial tab.

Outside the tab shell:

- `/login`, `/register`
- `/settings`
- `/showcase`

### Add a tab

1. Add an entry to `appConfig.tabs` in `src/app.config.ts`.
2. Create `src/features/<name>/`.
3. Register the route in `src/navigation/TabNavigation.tsx`.

### Add a non-tab screen

1. Create the page under `src/features/`.
2. Register it in `src/navigation/AppRouter.tsx`.

## Design system components

All reusable components live under `src/design-system/components/` and export through barrel files.

### Add a component

```text
src/design-system/components/AppExample/
  AppExample.tsx
  AppExample.css
  index.ts
```

Then export it from `src/design-system/components/index.ts`.

Icons must come from `src/design-system/icons/iconRegistry.ts`.

## Environment

Copy `.env.example` to `.env`:

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT_MS=15000
VITE_APP_ENV=development
```

The Axios client in `src/services/api/client.ts` reads these values. Never hardcode secrets.

## Native (Capacitor)

```bash
# After installing platform packages once:
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android

# Build web assets and sync
npm run cap:sync

# Open IDEs
npm run ios
npm run android
```

Included plugins: Preferences, Status Bar, Keyboard, Haptics, App, Network.

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Vite dev server              |
| `npm run build`     | Typecheck + production build |
| `npm run typecheck` | TypeScript only              |
| `npm run lint`      | ESLint + Prettier check      |
| `npm run lint:fix`  | Auto-fix lint/format         |
| `npm run test:unit` | Vitest unit tests            |
| `npm run test:e2e`  | Playwright e2e tests         |
| `npm run cap:sync`  | Build + Capacitor sync       |

## Testing

```bash
npm run test:unit
npm run test:e2e
```

Unit tests cover key design-system components. Prefer Testing Library queries that reflect user-facing behavior.

## Conventions

See `.cursor/rules/project-conventions.mdc` for agent and contributor rules:

- Feature-based folders
- Token-driven styling
- Centralized icons
- No business logic dumped into `App.tsx`

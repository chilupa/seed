# Seed

Production-minded Ionic React + Capacitor starter with a centralized design system, config-driven navigation, feature-based architecture, and demo screens you can replace for each new app.

## Create a new app from this template

### 1. Copy the template

```bash
# From GitHub (replace with your template repo URL)
npx degit your-org/seed-starter my-new-app
cd my-new-app

# Or clone and detach from the template remote
git clone https://github.com/your-org/seed-starter.git my-new-app
cd my-new-app
rm -rf .git
git init
```

### 2. Install and run

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 3. Rename the app

Update these identity fields for your product:

| File | What to change |
| ---- | -------------- |
| `package.json` | `name`, `description` |
| `src/app.config.ts` | `appName`, brand colors, font, logo, `defaultTheme`, `defaultTab`, `tabs` |
| `capacitor.config.ts` | `appId` (e.g. `com.yourcompany.appname`), `appName` |
| `index.html` | `<title>`, Apple web app title |
| `public/manifest.json` | App name / short name (if present) |
| `.env` | `VITE_API_BASE_URL`, `VITE_APP_ENV` |

Minimal branding pass:

```ts
// src/app.config.ts
export const appConfig: AppConfig = {
  appName: 'My App',
  brand: {
    primaryColor: '#2563eb',
    secondaryColor: '#0f766e',
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
    logoSrc: '/favicon.png',
  },
  defaultTheme: 'system',
  defaultTab: 'home',
  tabs: [
    // keep, rename, or replace these tabs for your product
  ],
};
```

```ts
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.yourcompany.myapp',
  appName: 'My App',
  webDir: 'dist',
  // ...
};
```

### 4. Replace demo screens with your features

Demo features live under `src/features/` (home, explore, create, activity, profile, auth, settings, showcase). For a real app:

1. Keep the shell: `src/app/`, `src/design-system/`, `src/navigation/`, `src/store/`, `src/services/`.
2. Edit or delete demo pages you do not need.
3. Add your features as `src/features/<feature>/`.
4. Wire tab routes in `src/app.config.ts` + `src/navigation/TabNavigation.tsx`.
5. Wire non-tab screens in `src/navigation/AppRouter.tsx`.
6. Point API calls at your backend via `.env` (`VITE_API_BASE_URL`).

Suggested first cuts for a production app:

- Remove or hide `/showcase` once you are done exploring components.
- Replace Home / Explore / Activity content with your real screens.
- Keep auth, settings, and profile as starting points or rewrite them.

### 5. Optional: native iOS / Android

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npm run cap:sync
npm run ios      # opens Xcode
npm run android  # opens Android Studio
```

After renaming `appId` / `appName`, re-sync before shipping store builds.

### 6. Ship checklist

- [ ] App name, colors, and tabs set in `app.config.ts`
- [ ] Capacitor `appId` is unique and final
- [ ] `.env` points at the correct API
- [ ] Demo / showcase routes removed or gated
- [ ] `npm run build` and `npm run test:unit` pass
- [ ] Icons/splash updated for store builds (Capacitor assets)

## Stack

- Ionic React 9 + React 19 + TypeScript (strict)
- Capacitor 8 (iOS / Android)
- React Router 6
- Zustand, Axios, React Hook Form, Zod
- Vitest + React Testing Library
- CSS variables + SCSS

## Quick start

Already using a checked-out copy of the template?

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

See `.cursor/rules/` for agent and contributor rules (`project-standards.mdc`, `design-system.mdc`, `testing.mdc`, `mobile-guidelines.mdc`):

- Feature-based folders
- Token-driven styling and type hierarchy
- Centralized icons
- No business logic dumped into `App.tsx`

# Street Food Safari — App

A React Native (Expo) mobile app for discovering street food vendors, searching, saving favorites, and reading or writing reviews. Connects to the Express backend in `/api`.

## Quick Start

**1. Start the API** (from project root):
```bash
cd api
npm install
npm run dev
```
Running at `http://localhost:3333`.

**2. Start the mobile app** (from `/app`):
```bash
cd app
npm install
npm start
```
Press `i` for iOS simulator, `a` for Android, or `w` for web.

**Physical Device Setup:** The app automatically grabs your computer's local IP via Expo's `Constants.expoConfig.hostUri` (defined in `api/config/api.ts`). As long as your phone is on the same Wi-Fi network, you don't need to manually update IP addresses to test on hardware.

**Run tests:**
```bash
npm test
```

## Architecture & Code Structure

### Navigation (Expo Router)

Uses Expo Router file-based routing.

```
app/
  _layout.tsx              # Root layout & providers
  index.tsx                # Redirects / to /vendors
  (tabs)/
    _layout.tsx              # Bottom Tab Navigator (Vendors, Favorites, About)
    vendors/
      _layout.tsx              # Stack navigator for list <-> detail push screens
      index.tsx                # Vendor list view
      [id].tsx                  # Vendor details view
    favorites.tsx
    about.tsx
```

The nested `Stack` inside `vendors/` lets users tap a vendor to slide in the details screen while keeping the bottom tab bar pinned in place.

### State & Fetching (TanStack Query)

`useInfiniteQuery` handles the infinite scroll and pull-to-refresh requirements directly, avoiding custom pagination state and manual fetch tracking.

API requests go through a single `apiFetch()` wrapper in `api/config/client.ts`, which resolves the base URL, injects the `X-Client-Id` header, checks for non-2xx status codes, and handles empty `204 No Content` responses. Hooks are split by domain in `api/hooks/` (`useVendors`, `useSearch`, `useFavorites`, `useToggleFavorite`, etc.), typed against the shapes in `types/vendor.ts`.

Errors are handled centrally rather than per-hook — `QueryCache`/`MutationCache` on the shared `QueryClient` catch any failed query or mutation and fire a global Snackbar, so there's one place handling "request failed" instead of repeating that logic in every hook.

Favorites update optimistically: the heart icon flips immediately on tap (`onMutate`), rolls back if the request actually fails (`onError`), and invalidates the cache on `onSettled` to stay in sync with the server.

### Theming & Styles

`theme/colors.ts` defines a primitive palette mapped into `lightColors` and `darkColors`. Components only touch semantic tokens like `colors.primary`, never raw values directly.

`theme/ThemeContext.tsx` reads the system scheme via `useColorScheme`, persists manual overrides in `AsyncStorage`, and blocks the first render until hydration finishes (`isHydrated`) so the app never flashes the wrong theme on launch. It also updates the native status bar and root background via `expo-status-bar` and `expo-system-ui`.

Components get their styles through a `useThemedStyles` helper, which wraps `StyleSheet.create` with the current theme — keeps styles both typed and theme-aware.

### App Resilience

`ErrorBoundary` wraps the UI tree and renders a recovery screen on a crash instead of a blank white screen. `LoadingState`, `ErrorState`, and `EmptyState` are shared components reused across every data screen instead of each one rolling its own. A banner shows when the device goes offline, via `@react-native-community/netinfo`.

## Backend Adjustments & API Design

### Per-Client Favorites

The original Express API managed favorites as a simple global boolean on each vendor. To support per-device saved items without a full authentication flow:

- The app generates a persistent UUID on first launch using `expo-crypto` and stores it in `AsyncStorage`.
- Every request passes this ID in the `X-Client-Id` header.
- The server tracks favorites in an in-memory `Map<clientId, Set<vendorId>>` structure.

**Endpoints:**
- `POST /vendors/:id/favorites` — Add to device favorites (idempotent)
- `DELETE /vendors/:id/favorites` — Remove from device favorites
- `GET /favorites` — Fetch favorited vendors for current client
- `GET /vendors` — Injects computed `isFavorite` flag on each vendor based on the request header

Request flow for adding a favorite:
- App sends `POST /vendors/5/favorites` with header `X-Client-Id: abc`
- API checks that vendor 5 exists
- API calls `getFavoriteSet("abc").add("5")` against the in-memory store
- API responds `204 No Content`

### Reviews & Ratings

Reviews are public and stored under `vendor.reviews`. To prevent state mismatch, vendor rating values aren't hardcoded in storage; they're calculated dynamically as an average of reviews on every read request. The frontend `ReviewsSummary` component follows the same logic for score bars and averages.

### Search Flow

Search inputs are debounced by 400ms (`useDebouncedValue`). While active, the vendor screen switches from `useVendors` (infinite scroll) to `useSearch` (single-page backend query, as `/search` doesn't support server-side pagination).

## Performance Considerations

`FlatList` tuning — `windowSize`, `maxToRenderPerBatch`, `initialNumToRender`, and platform-specific `removeClippedSubviews` — was set deliberately for a 2-column, image-heavy grid rather than left at defaults. Vendor cards use `expo-image` with a `memory-disk` cache policy, both for real caching and for compatibility with React Native's New Architecture. List items are wrapped in `React.memo` with stable `useCallback` references for `renderItem` and key extractors, so a re-render elsewhere doesn't cascade into re-rendering every row.

## Extra Features Added

- Light / Dark themes with manual persistent toggle.
- Network status banner.
- Custom bottom-sheet for writing reviews (`WriteReviewSheet`) with iOS keyboard handling.
- Category filtering (All / Spicy / Vegan) on vendor menus.
- Dashboard statistics on the About screen powered by `GET /stats`.

## Tradeoffs & Known Limitations

Client identification relies on a local device UUID (`X-Client-Id`). Fine for a demo without accounts, but clearing app data resets favorites and nothing syncs across devices. Reviews are anonymous — the backend doesn't store an author name, so the submission form doesn't ask for one. Menu-level tags (Spicy/Vegan) are built, but city/cuisine vendor filters were skipped given the timeline. Jest tests focus on core logic (pagination, date formatting) rather than full component rendering.

## Tech Stack

Expo SDK 57 (React Native 0.86, React 19) for the framework, Expo Router for navigation, TanStack Query v5 for state/fetching, AsyncStorage for storage, `expo-image` / `expo-crypto` / `@react-native-community/netinfo` as utilities, and Jest (`jest-expo`) for testing.

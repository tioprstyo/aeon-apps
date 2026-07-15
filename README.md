# AeonApps

AEON Bank Mobile Engineer Assessment — a React Native app that lets a banking
customer view their latest transactions and drill into a transaction's details,
with the ability to share those details externally.

- **React Native `0.86`** (bare CLI) · **React `19`**
- **TypeScript** throughout, path alias `@/*` → `src/*`
- **Zustand** for state management
- **React Navigation** — bottom tabs + native stack
- **lucide-react-native** icons on a blue design system
- Feature-based architecture, themed design tokens, unit tests

## Features

- **Bottom tab navigation** — Home, Accounts, Transactions, Recipients, More,
  with **Transactions** as the initial route and a raised centre action button.
  Transactions is fully implemented; the other tabs are scoped-out
  placeholders. The tab bar is a translucent **liquid-glass** blur that content
  scrolls beneath, and it hides itself on the full-screen detail view.
- **Transaction list** — each card shows a direction-tinted category icon,
  transfer name, recipient, date • time, `Ref` ID, a signed colour-coded amount
  (green incoming / orange outgoing), an **Incoming / Outgoing** badge and a
  per-item **⋮ actions menu** (view details / share / copy ref).
- **Search** — a header toggle reveals a search field that filters across
  transfer name, recipient and reference ID (animated in/out).
- **Direction filter** — an always-visible **segmented control**
  (All / Incoming / Outgoing).
- **Advanced filters sheet** — a bottom sheet (opened from the header) with
  **date-range chips** (All Dates / 1 Week / 1 Month / 3 Months), a **min/max
  amount range**, and **sort order** (Newest / Oldest first). Edits are drafted
  in the sheet and only take effect on **Apply Filters**; **Reset** clears them.
  The header filter icon highlights while any advanced filter is active.
- **Pull-to-refresh** plus dedicated loading, error (with retry) and empty
  states (the empty state adapts when a search or filter is active).
- **Transaction detail** — a hero card with the amount, a context label
  (`TRANSFER AMOUNT` / `RECEIPT AMOUNT`), transfer name and direction badge,
  then rows for reference ID (with copy), recipient, transfer date, transaction
  type and amount.
- **Copy** — tap to copy the reference ID to the clipboard.
- **Share** — opens the native share sheet with a formatted summary of the
  transaction, so it can be shared to any app the OS offers.

## Getting started

### 1. Prerequisites

Set up your machine by following the official React Native
[environment setup](https://reactnative.dev/docs/set-up-your-environment) guide
(select **React Native CLI**, not Expo). You need:

| Tool | Version | Needed for |
| ---- | ------- | ---------- |
| **Node.js** | ≥ 22.11 | all platforms |
| **npm** | ≥ 10 | all platforms |
| **Watchman** | latest | all platforms (recommended) |
| **Ruby + Bundler + CocoaPods** | Ruby ≥ 3.1 | iOS (macOS only) |
| **Xcode** | 15+ | iOS (macOS only) |
| **Android Studio + JDK** | JDK 17 | Android |

Check the essentials:

```bash
node -v      # >= 22.11
npm -v       # >= 10
```

### 2. Clone & install

```bash
git clone <your-repo-url> aeon-apps
cd aeon-apps

# Install JavaScript dependencies
npm install
```

### 3. iOS setup (macOS only)

Install the native pods once (and again after adding any native dependency):

```bash
cd ios
bundle install          # installs the CocoaPods version pinned in the Gemfile
bundle exec pod install  # links native modules
cd ..
```

### 4. Run the app

Start the Metro bundler in one terminal:

```bash
npm start
```

Then, in a **second terminal**, build & launch on your target platform:

```bash
npm run ios       # iOS Simulator (macOS)
npm run android   # Android emulator or connected device
```

To target a specific iOS simulator:

```bash
npm run ios -- --simulator="iPhone 16 Pro"
```

For Android, make sure an emulator is running (Android Studio → Device Manager)
or a device is connected with USB debugging enabled before running the command.

> **Tip:** the **Share** and **Copy** features use native OS capabilities — test
> them on a real device or a fully-booted simulator/emulator.

### Troubleshooting

- **iOS build fails / native module errors** — re-run `bundle exec pod install`
  from `ios/`, then open `ios/AeonApps.xcworkspace` (the *workspace*, not the
  `.xcodeproj`) in Xcode and build once to see detailed errors.
- **Metro cache issues** — restart with a clean cache: `npm start -- --reset-cache`.
- **Android "SDK location not found"** — create `android/local.properties` with
  `sdk.dir=/Users/<you>/Library/Android/sdk`.
- **Stale build** — `cd android && ./gradlew clean && cd ..` (Android) or delete
  `ios/build` (iOS), then rebuild.

## Scripts

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `npm start`        | Start the Metro bundler         |
| `npm run ios`      | Build & run on iOS simulator    |
| `npm run android`  | Build & run on Android emulator |
| `npm test`         | Run the Jest test suite         |
| `npm run lint`     | Lint with ESLint                |
| `npx tsc --noEmit` | Type-check the project          |

## Project structure

```
src/
├── app/                      # App root & global providers
│   ├── App.tsx               #   Root component (registered in index.js)
│   └── providers/            #   SafeArea + status bar composition
├── navigation/               # RootNavigator, RootTabs, TransactionsStack,
│                             #   PlaceholderScreen, typed routes (types.ts)
├── features/
│   └── transactions/         # The transactions feature module
│       ├── screens/          #   TransactionList / TransactionDetail
│       ├── components/       #   TransactionsHeader, TypeSegmentedControl,
│       │                     #   TransactionListItem, TransactionFiltersSheet,
│       │                     #   DirectionBadge, AmountText, CopyButton
│       ├── store/            #   Zustand store (useTransactionStore)
│       ├── services/         #   transactionService (mocked backend)
│       ├── utils/            #   filter, categoryIcon, share, menu
│       ├── types.ts          #   Transaction model
│       └── index.ts          #   Public surface of the feature
├── components/               # Shared UI (Button, Chip, IconButton,
│                             #   SearchBar, Screen, BottomSheet)
├── services/api/             # Typed fetch client (integration point)
├── theme/                    # Design tokens: colors, spacing, radius, typography
├── constants/                # App config & constants
└── utils/                    # Pure helpers (currency & date formatting)
```

### Architecture notes

- **Feature-based** — everything for transactions (UI, state, service, types)
  lives under `features/transactions/` and is consumed through its `index.ts`
  barrel (`@/features/transactions`), never via deep paths.
- **State with Zustand** — `useTransactionStore` holds the list, request status
  and errors, and exposes `fetchTransactions()` and `getByRefId()`. No provider
  needed; the detail screen reads the same store by `refId`.
- **Pure, testable helpers** — currency/date formatting (`@/utils`), the
  `filterTransactions` search/filter logic and the share-message builder are
  pure functions with unit tests; the native `Share` and `Clipboard` calls are
  thin wrappers around them.
- **Search & filtering** happen in the screen via `useMemo` over the pure
  `filterTransactions`; UI filter state is local component state while the store
  holds the raw list.
- **Typed navigation** — routes and params are declared in
  `src/navigation/types.ts` (`RootStackParamList`).
- **Path alias** — `@/*` → `src/*`, configured in `tsconfig.json` (types) and
  `babel.config.js` (runtime, via `babel-plugin-module-resolver`).

## Connecting a real backend

The list is served from a mocked payload in
[`transactionService.ts`](src/features/transactions/services/transactionService.ts).
Swap the mock for a real call using the typed client in `@/services/api` and
point `API_BASE_URL` in [`src/constants/config.ts`](src/constants/config.ts) at
your backend — no changes needed in the store or screens.

## Testing

```bash
npm test
```

Covers currency/date formatting, the search/filter logic, the share-message
builder, the Zustand store (fetch, sort order, lookup), and an App render smoke
test (which mounts the full tab + stack tree). The suite pins the timezone to
`Asia/Jakarta` so local-time formatting is deterministic.

> **Dates** are shown in the device's local timezone (e.g. `12:34Z` →
> `19:34` in UTC+7). The **date-range filter** is anchored to the most recent
> transaction so the fixed sample dataset stays filterable; against a live
> backend you would anchor to the current date.

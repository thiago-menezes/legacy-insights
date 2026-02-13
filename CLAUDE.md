# Claude Agent Guide - Legacy Insight Monorepo

> Knowledge base for AI agents working on the Legacy Insight workspace.

**Legacy Insight** is a multi-tenant SaaS platform for unified ad campaign management. This workspace contains two projects that work together.

---

## Workspace Structure

```
Legacy Insights/
├── legacy-insights-next/     # Frontend (Next.js)
└── legacy-insights-strapi/   # Backend (Strapi 5)
```

---

## Project 1: Frontend (legacy-insights-next)

### Tech Stack

| Technology | Details                              |
| ---------- | ------------------------------------ |
| Framework  | Next.js (App Router)                 |
| UI Library | Reshaped                             |
| Language   | TypeScript                           |
| Forms      | React Hook Form + Zod                |
| Data       | React Query (TanStack Query) + Axios |

### Architecture: Hybrid Feature Scope Architecture (HFSA)

#### File/Folder Naming

```
✅ Correct: user-profile/, header.tsx, styles.module.scss
❌ Wrong:   UserProfile/, Header.tsx, style.module.scss
```

**Rule**: ALWAYS use lowercase with hyphens (kebab-case)

#### Component Folder Structure

```
component-name/
├── index.tsx          # Main component (Orchestrator)
├── styles.module.scss # Styles (plural)
├── hooks.ts           # Logic/state (plural)
├── types.ts           # Interfaces
├── utils.ts           # Pure helpers
├── constants.ts       # Configuration
└── spec.tsx           # Tests
```

### The Peak Component Pattern

Reference: `src/components/shell/`

1. **Orchestrator** — `index.tsx` consumes hooks, distributes props to sub-components
2. **Logic Separation** — 100% of state/effects live in `hooks.ts`
3. **Persistence** — Browser APIs (localStorage) go in `utils.ts`
4. **Sub-Components** — Large parts get their own folders with same pattern
5. **Strict Typing** — All props use `interface` in `types.ts`

### TypeScript Rules

- **ALWAYS** use `interface` for object definitions (Props, API responses)
- Use `type` **ONLY** for: Unions (`type Status = 'on' | 'off'`), Intersections, Primitives
- **NEVER** use inline types in component signatures

### Theme & Styling

- Use **Reshaped** design tokens
- Theme overrides: `src/styles/theme.scss`
- Global tokens: `src/styles/tokens.scss`
- **Always prefer CSS variables** over hardcoded values

### Key Reference Files

| Purpose           | File                      |
| ----------------- | ------------------------- |
| API Services      | `src/libs/api/services/`  |
| React Query Hooks | `src/libs/api/hooks/`     |
| Feature Structure | `src/features/[feature]/` |
| Shell Pattern     | `src/components/shell/`   |
| Theme Config      | `reshaped.config.js`      |
| Global Styles     | `src/styles/`             |

### Frontend Commands

```bash
npm run dev        # Start development server
npm run typecheck  # Type checking (REQUIRED)
npm run lint       # Linting (REQUIRED)
npm run format     # Format check
npm run test       # Run tests
```

---

## Project 2: Backend (legacy-insights-strapi)

### Tech Stack

| Technology   | Details                            |
| ------------ | ---------------------------------- |
| Framework    | Strapi 5 (Headless CMS)            |
| Language     | TypeScript                         |
| Database     | PostgreSQL (Prod) / SQLite (Dev)   |
| Integrations | Meta Marketing API, Google Ads API |
| Auth         | JWT (Standard Strapi Auth)         |

### Key Directories

- `src/api/`: Contains all content types and custom business logic.
  - `ad-account/`: Manages external ad accounts (Meta/Google).
  - `ads/`: **The Integration Hub**. Contains services to fetch data from Meta and Google APIs.
  - `campaign/`: Stores synchronized campaigns.
  - `daily-metric/`: Stores daily performance metrics (Spend, Impressions, Clicks).
  - `sync/`: **The Synchronization Engine**. Manages cron jobs and manual sync flows.
  - `sync-log/`: Audit trail for synchronization operations.
- `src/index.ts`: Entry point where Cron jobs are registered.
- `config/`: Strapi configuration files (database, plugins, server, etc.).

### Core Logic: Synchronization

The sync process is the heart of the application:

1. **Campaign Sync**: Fetches all campaigns from configured Meta/Google accounts and updates the `Campaign` content-type.
2. **Metric Sync**: Fetches daily insights for the last 90 days and updates the `DailyMetric` content-type.

#### Important Services

- `src/api/sync/services/sync-manager.ts`: Orchestrates the full sync process.
- `src/api/ads/services/ads.ts`: Handles low-level API calls to Meta/Google.

### Backend Coding Standards

1. **TypeScript First**: Always use types. Check `src/api/ads/types/index.ts` for existing types.
2. **Service-Controller Pattern**:
   - Keep logical heavy lifting in **Services**
   - **Controllers** should only handle input validation and response formatting
   - Use `strapi.service('api::api-name.service-name')` to access services
3. **Error Handling**: Always wrap external API calls in `try/catch` and log errors using `strapi.log.error`
4. **Environment Variables**: Sensitive data must stay in `.env`. Reference them using `process.env.VARIABLE_NAME`

### Backend Commands

```bash
npm run develop  # Start Strapi in development mode with auto-reload
npm run strapi   # Use the Strapi CLI (e.g., npm run strapi console)
npm run build    # Build the admin panel and server code
```

---

## Agent Workflow

### Before Coding

1. Read this file (CLAUDE.md)
2. Consult relevant guide from `docs/guides/` (frontend) or check service files (backend)
3. Look at existing implementations for patterns

### After Coding

1. Run `npm run typecheck` — fix all TypeScript errors
2. Run `npm run lint` — fix all lint errors
3. Run `npm run test` — ensure tests pass
4. Verify with `npm run dev` — check UI/API works
5. Update documentation if needed

---

## Implementation Workflow

When implementing features from SPEC.md, follow this iterative workflow:

### Per-Item Workflow

For each implementation item/task:

1. **Implement** — Write code for the specific item
2. **Run Lints** — Execute all quality checks:

   ```bash
   # Frontend
   cd legacy-insights-next
   npm run typecheck
   npm run lint

   # Backend
   cd legacy-insights-strapi
   npm run build
   ```

3. **Update SPEC.md** — Mark item as completed (❌ → ✅)
4. **Clean Context** — Summarize progress, clear unnecessary context
5. **Next Task** — Move to next item in sequence

### Important Notes

- **Never skip quality checks** — All lints must pass before moving to next item
- **Incremental updates** — Update SPEC.md after each completed item, not at the end
- **Context management** — Keep conversation focused on current item
- **Sequential execution** — Complete one item fully before starting the next

This workflow ensures quality, maintainability, and clear progress tracking throughout feature implementation.

---

## Common Mistakes to Avoid

### Frontend

1. **Don't use camelCase for files/folders** — Use kebab-case only
2. **Don't put logic in components** — Move to `hooks.ts`
3. **Don't use inline types** — Define in `types.ts`
4. **Don't hardcode colors** — Use Reshaped tokens
5. **Don't skip typecheck** — Always run before committing
6. **Don't forget tests** — Create `spec.tsx` for new components

### Backend

1. **Don't skip error handling** — Always wrap external API calls in try/catch
2. **Don't put business logic in controllers** — Move to services
3. **Don't hardcode credentials** — Use environment variables
4. **Don't ignore rate limits** — Consider Meta/Google Ads rate limits
5. **Don't break relational integrity** — `Campaign` → `AdAccount`, `DailyMetric` → `Campaign`

---

## Documentation References

### Frontend (legacy-insights-next)

| Task Type         | Read First                         | Then                    |
| ----------------- | ---------------------------------- | ----------------------- |
| New Feature       | `docs/guides/features.md`          | `docs/architecture/`    |
| New Component     | `docs/guides/components.md`        | `src/components/shell/` |
| API/Data Fetching | `docs/guides/api-data-fetching.md` | `src/libs/api/`         |
| Styling           | `docs/guides/styling.md`           | `reshaped.config.js`    |
| Testing           | `docs/guides/testing.md`           | Existing `spec.tsx`     |

### Backend (legacy-insights-strapi)

| Task Type          | Reference                    |
| ------------------ | ---------------------------- |
| New Content Type   | Existing types in `src/api/` |
| Sync Logic         | `src/api/sync/services/`     |
| External API Calls | `src/api/ads/services/`      |
| Type Definitions   | `src/api/ads/types/index.ts` |
| Cron Jobs          | `src/index.ts`               |

---

_Created to improve agent efficiency and code consistency across the Legacy Insight workspace._

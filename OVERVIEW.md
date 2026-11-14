# System Overview — PowerHouse Gym Database

A Next.js admin console for a gym: it stores member records and turns them into
descriptive, predictive, and prescriptive analytics for day-to-day decisions.

> This document is a read-only overview. No application code, configuration, or
> existing documentation was modified.

---

## 1. What the system does

| Capability | Description |
| --- | --- |
| Member management | Create, read, update, and delete gym members (name, tier, attendance, trainer, monthly fee). |
| Dashboard | KPI cards, charts, and computed statistics across the member roster. |
| Descriptive analytics | Summaries of members, attendance, fees, membership tiers, and trainer load. |
| Predictive analytics | Revenue forecasting (linear regression, exponential smoothing, moving average) and next-month attendance forecasts per tier. |
| Prescriptive analytics | Rule-based recommendations and a strategic action plan generated from current data. |
| Demo fallback | Runs with in-memory sample data when no database is configured, and clearly labels itself as demo mode. |

---

## 2. Technology stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** JavaScript (`.jsx`/`.js`) for the app, TypeScript (`.ts`/`.tsx`) for config and Prisma client
- **Styling:** Tailwind CSS 4 with custom theme tokens (`bg-base`, `text-fg`, `text-volt`, etc.)
- **UI:** lucide-react icons, Radix Tooltip, class-variance-authority, clsx, tailwind-merge
- **Charts:** Recharts
- **Database:** PostgreSQL (Neon serverless) accessed through Prisma ORM 6
- **Runtime data access:** Next.js Route Handlers under `app/api`

---

## 3. Architecture

```
Browser (app/page.jsx — client component)
    │  fetch()
    ▼
Next.js Route Handlers (app/api/**)
    │
    ▼
Data access layer (lib/data-source.js)
    │  ├─ DATABASE_URL set  → Prisma → PostgreSQL (Neon)
    │  └─ DATABASE_URL unset → in-memory demo store (lib/demo-data.js)
```

Key design points:

- All reads/writes go through `lib/data-source.js`, so swapping live and demo
  data requires no changes in the UI or API routes.
- Responses include an `x-data-source` header (`database` or `demo`) and
  `Cache-Control: no-store`. The UI uses that header to display connection
  status and the demo-mode banner.
- Input normalization/validation lives in the data layer: attendance is clamped
  to 0–31, fees cannot be negative, and membership type/trainer default when
  omitted.
- The Prisma client is cached on `globalThis` in development
  (`lib/prisma.ts`) to avoid connection exhaustion during hot reloads.
- Demo data also lives on `globalThis`, so edits survive hot reloads but reset
  when the server restarts.

---

## 4. Data model

Single Prisma model (`prisma/schema.prisma`):

| Field | Type | Notes |
| --- | --- | --- |
| `member_id` | Int | Primary key, auto-increment |
| `member_name` | String | Required |
| `membership_type` | String | Silver / Gold / Platinum (defaults to Silver) |
| `attendance_days` | Int | Visits per month, clamped 0–31 |
| `trainer_assigned` | String | Trainer name or `"None"` |
| `monthly_fee` | Float | Non-negative |

`prisma/seed.js` inserts the sample roster only when the table is empty.

---

## 5. API surface

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/members` | List members, newest first. |
| `POST` | `/api/members` | Create a member; requires `member_name`. Returns 201. |
| `PUT` | `/api/members/:id` | Partial or full update of one member. |
| `DELETE` | `/api/members/:id` | Delete one member. |
| `GET` | `/api/revenue` | Build a revenue series from member fees plus totals and member count. |

Error handling returns JSON `{ error, detail }` with 400/404/500 as
appropriate. Prisma `P2025` (record not found) is mapped to 404.

---

## 6. Frontend structure

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root layout, fonts (Geist, Geist Mono, Oswald), metadata. |
| `app/page.jsx` | Client shell: tab state, API fetching, analytics calculations, CRUD handlers, modal state. |
| `app/components/Sidebar.jsx` | Branding, Dashboard/Members navigation, live/demo/error status panel. |
| `app/components/Header.jsx` | Page heading and contextual status for the active tab. |
| `app/components/DashboardView.jsx` | KPI cards, descriptive charts, statistical summary table, predictive charts, prescriptive action plan. |
| `app/components/MembersView.jsx` | Search, tier filter, member table, add/edit/delete entry points, empty states. |
| `app/components/MemberModal.jsx` | Add/edit member form modal. |
| `app/components/StatCard.jsx` | Reusable KPI card. |
| `app/components/ChartTooltip.jsx` | Shared Recharts tooltip styling. |
| `app/utils/analytics.js` | Forecasting math: linear regression, exponential smoothing, moving average, 3-month projection. |

### Navigation

- **Dashboard** — the full analytics console (sections 01–03 below).
- **Members** — searchable/filterable roster with CRUD actions.

---

## 7. Analytics pipeline

**Descriptive (what happened)**

Computed in `app/page.jsx` from the loaded roster:

- Total members and total monthly revenue
- Average fee and average attendance
- Highest/lowest attendance, highest fee
- Membership-type distribution and most common tier
- Trainer distribution and most active trainer
- Attendance per member

These feed the KPI cards, bar charts, and the statistical summary table that
shows the metric alongside its formula (COUNT, MIN, MAX, AVERAGE, SUM, MODE).

**Predictive (what is likely next)**

- `/api/revenue` maps each member to a `{ period, revenue }` point.
- `generatePredictiveData()` (`app/utils/analytics.js`) applies linear
  regression, exponential smoothing (α = 0.5), and a 3-point moving average,
  then appends 3 forecast periods flagged `isForecast`.
- Attendance by membership tier is projected one month ahead with a simple
  growth rule: `average + average × 0.08 + 1`.

**Prescriptive (what to do)**

Generated client-side from live data:

- Members with fewer than 5 visits trigger a churn-risk alert.
- An upward regression slope triggers a growth recommendation.
- A trainer with more than 2 assigned clients triggers a load-balancing
  recommendation.
- A static strategic action plan table pairs issues with recommendations and
  expected results.

> Note: forecasts are illustrative heuristics, not trained ML models.

---

## 8. Data-source behavior

| Condition | Behavior |
| --- | --- |
| `DATABASE_URL` set | Prisma reads/writes PostgreSQL; status shows "Database Live". |
| `DATABASE_URL` unset | Seeded in-memory roster is used; status shows "Demo Mode" and a banner explains why. |
| Database error | UI shows a connection error and disables new member creation. |

Configuration is read from `.env` (see `.env.example`).

---

## 9. Project layout

```
app/
  api/
    members/route.js          GET/POST members
    members/[id]/route.js     PUT/DELETE member
    revenue/route.js          GET revenue series
  components/                 UI components (dashboard, members, modal, layout pieces)
  utils/analytics.js          forecasting helpers
  globals.css                 theme tokens and base styles
  layout.tsx, page.jsx        app shell
components/ui/tooltip.tsx     shared Radix tooltip
lib/
  data-source.js              database/demo switch + normalization
  demo-data.js                in-memory sample roster
  prisma.ts                   Prisma client singleton
  utils.ts                    class-name helper
prisma/
  schema.prisma               Member model
  seed.js                     conditional seeding
public/                       static assets
```

---

## 10. Operational notes

- Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`,
  `npm run db:push`, `npm run db:seed`.
- The app requires Node with support for Next.js 16 and React 19.
- Revenue "periods" are member index positions, not calendar months, because
  the schema stores no time-series history. The forecast illustrates trend
  across the current roster rather than historical monthly revenue.
- No authentication or authorization layer is present; the console assumes a
  trusted operator.

import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Database,
  Gauge,
  Layers,
  LineChart as LineIcon,
  Plug,
  Search,
  Server,
  ShieldAlert,
  Sparkles,
  Table2,
  Terminal,
  Users,
  Workflow,
} from 'lucide-react';

const CARD = 'rounded-2xl border border-line bg-surface';

const SectionHeader = ({ index, icon: Icon, title, subtitle }) => (
  <div className="mb-5 flex items-start gap-3">
    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-volt/20 bg-volt/10 text-volt">
      <Icon size={18} strokeWidth={2.2} />
    </span>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-faint">
        {index}
      </p>
      <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-fg">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  </div>
);

const Pill = ({ children }) => (
  <span className="rounded-full border border-line-strong bg-surface-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
    {children}
  </span>
);

const METHOD_STYLES = {
  GET: 'border-info/30 bg-info/10 text-info',
  POST: 'border-volt/30 bg-volt/10 text-volt',
  PUT: 'border-warn/30 bg-warn/10 text-warn',
  DELETE: 'border-danger/30 bg-danger/10 text-danger',
};

const facts = [
  {
    icon: Layers,
    label: 'Workspaces',
    value: '3',
    hint: 'Overview · Dashboard · Members',
  },
  {
    icon: Plug,
    label: 'API Endpoints',
    value: '5',
    hint: 'Member CRUD + revenue',
  },
  {
    icon: Table2,
    label: 'Data Model',
    value: '1',
    hint: 'Member table',
  },
  {
    icon: BarChart3,
    label: 'Analytics Layers',
    value: '3',
    hint: 'Descriptive → Predictive → Prescriptive',
  },
];

const analyticsLayers = [
  {
    icon: BarChart3,
    tone: 'border-info/25',
    iconTone: 'border-info/25 bg-info/10 text-info',
    title: 'Descriptive',
    tagline: 'What happened',
    points: [
      'Total members, revenue, average fee and attendance',
      'Highest, lowest and average attendance',
      'Membership tier and trainer distributions',
      'Statistical summary with live formulas',
    ],
  },
  {
    icon: LineIcon,
    tone: 'border-volt/25',
    iconTone: 'border-volt/25 bg-volt/10 text-volt',
    title: 'Predictive',
    tagline: 'What is likely next',
    points: [
      'Linear regression across the revenue series',
      'Exponential smoothing with alpha 0.5',
      'Three-point moving average',
      'Three-month outlook and next-month attendance by tier',
    ],
  },
  {
    icon: BrainCircuit,
    tone: 'border-violet/25',
    iconTone: 'border-violet/25 bg-violet/10 text-violet',
    title: 'Prescriptive',
    tagline: 'What to do about it',
    points: [
      'Churn-risk alert for members under five visits',
      'Growth recommendation when the trend slope is positive',
      'Trainer load balancing when one trainer exceeds two clients',
      'Strategic action plan with expected results',
    ],
  },
];

const pipeline = [
  {
    icon: Users,
    title: 'Browser UI',
    desc: 'The React client handles navigation, forms and analytics calculations.',
  },
  {
    icon: Server,
    title: 'API Routes',
    desc: 'Next.js route handlers expose member CRUD and the revenue series.',
  },
  {
    icon: Workflow,
    title: 'Data Layer',
    desc: 'One module normalizes input and chooses live or demo storage.',
  },
  {
    icon: Database,
    title: 'Storage',
    desc: 'Prisma writes to Neon PostgreSQL, or an in-memory store when unconfigured.',
  },
];

const capabilities = [
  {
    icon: Users,
    title: 'Member CRUD',
    desc: 'Add, edit and delete members with normalized inputs, attendance 0 to 31 and non-negative fees.',
  },
  {
    icon: Search,
    title: 'Search and filter',
    desc: 'Find members by name and narrow the roster by Silver, Gold or Platinum tier.',
  },
  {
    icon: Gauge,
    title: 'KPI dashboard',
    desc: 'Live cards for total members, average fee, average attendance and estimated revenue.',
  },
  {
    icon: LineIcon,
    title: 'Revenue forecasting',
    desc: 'Overlay actual fees with regression, smoothing and moving-average projections.',
  },
  {
    icon: Sparkles,
    title: 'Prescriptive insights',
    desc: 'Automatic churn, growth and trainer-balance recommendations from current data.',
  },
  {
    icon: Database,
    title: 'Safe demo fallback',
    desc: 'Run without a database using an in-memory roster, clearly labelled as demo mode.',
  },
];

const dataModel = [
  ['member_id', 'Int', 'Primary key, auto-increment'],
  ['member_name', 'String', 'Required member name'],
  ['membership_type', 'String', 'Silver, Gold or Platinum (defaults to Silver)'],
  ['attendance_days', 'Int', 'Monthly visits, clamped 0 to 31'],
  ['trainer_assigned', 'String', 'Trainer name, or "None"'],
  ['monthly_fee', 'Float', 'Monthly fee, never negative'],
];

const endpoints = [
  ['GET', '/api/members', 'List members, newest first'],
  ['POST', '/api/members', 'Create a member; member_name is required'],
  ['PUT', '/api/members/:id', 'Update one member'],
  ['DELETE', '/api/members/:id', 'Delete one member'],
  ['GET', '/api/revenue', 'Build a revenue series and totals from fees'],
];

const quickStart = [
  'npm install',
  'npm run db:push',
  'npm run db:seed',
  'npm run dev',
];

const OverviewView = () => {
  return (
    <div className="animate-fade-up space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface-2 to-surface p-6 sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-info/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-volt">
            <BookOpen size={14} />
            System Guide
          </div>

          <h1 className="max-w-3xl font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-fg sm:text-4xl">
            PowerHouse Gym Database
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
            An admin console for gym operations. It keeps the member roster in
            one place and turns that data into descriptive, predictive and
            prescriptive analytics, so day-to-day decisions are based on the
            numbers already in the system.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Next.js 16</Pill>
            <Pill>React 19</Pill>
            <Pill>Prisma 6</Pill>
            <Pill>Neon PostgreSQL</Pill>
            <Pill>Recharts</Pill>
            <Pill>Tailwind CSS 4</Pill>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {facts.map(({ icon: Icon, label, value, hint }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-volt/25 bg-volt/10 text-volt">
                <Icon size={17} strokeWidth={2.2} />
              </span>
            </div>
            <p className="mt-4 font-display text-[2rem] font-semibold leading-none tracking-tight text-fg tabular-nums">
              {value}
            </p>
            <p className="mt-2 text-xs font-medium text-faint">{hint}</p>
          </div>
        ))}
      </section>

      {/* ANALYTICS LAYERS */}
      <section>
        <SectionHeader
          index="01 — Analytics"
          icon={BarChart3}
          title="Three layers of insight"
          subtitle="The dashboard moves from what happened, to what is likely next, to what to do about it."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {analyticsLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.title}
                className={`rounded-2xl border ${layer.tone} bg-surface p-5 sm:p-6`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${layer.iconTone}`}
                  >
                    <Icon size={19} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-fg">
                      {layer.title}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                      {layer.tagline}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {layer.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-volt"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section>
        <SectionHeader
          index="02 — Architecture"
          icon={Workflow}
          title="How data flows"
          subtitle="Requests always pass through one data layer, so switching between live and demo mode needs no UI changes."
        />

        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          {pipeline.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.title}>
                <div className="flex-1 rounded-2xl border border-line bg-surface p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-surface-2 text-volt">
                    <Icon size={17} strokeWidth={2.2} />
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-fg">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>

                {index < pipeline.length - 1 && (
                  <div
                    className="grid shrink-0 place-items-center text-faint"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={18}
                      className="rotate-90 md:rotate-0"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface-2/40 px-5 py-3.5 text-xs text-muted">
          <span className="flex items-center gap-2">
            <Database size={14} className="text-volt" />
            Responses tagged with{' '}
            <code className="font-mono text-[11px] text-fg">x-data-source</code>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-volt" />
            Cache disabled for fresh data
          </span>
          <span className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-warn" />
            No authentication layer
          </span>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section>
        <SectionHeader
          index="03 — Capabilities"
          icon={Layers}
          title="What you can do"
          subtitle="Everything available from the two working tabs, Dashboard and Members."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-volt/20 bg-volt/10 text-volt">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <h4 className="mt-4 text-sm font-bold text-fg">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DATA MODEL */}
      <section>
        <SectionHeader
          index="04 — Data"
          icon={Table2}
          title="Data model and API"
          subtitle="One member table backs every view; five route handlers expose it to the client."
        />

        <div className={`${CARD} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
              Member table
            </h3>
            <Pill>Prisma model</Pill>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-surface-2/60">
                <tr>
                  {['Field', 'Type', 'Notes'].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataModel.map(([field, type, notes]) => (
                  <tr
                    key={field}
                    className="border-t border-line/70 transition-colors hover:bg-surface-2/50"
                  >
                    <td className="px-5 py-3.5 font-mono text-[12px] font-medium text-volt">
                      {field}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-fg/90">{type}</td>
                    <td className="px-5 py-3.5 text-sm text-muted">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${CARD} mt-5 overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
              API endpoints
            </h3>
            <Pill>Route handlers</Pill>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-surface-2/60">
                <tr>
                  {['Method', 'Endpoint', 'Purpose'].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {endpoints.map(([method, endpoint, purpose]) => (
                  <tr
                    key={`${method}-${endpoint}`}
                    className="border-t border-line/70 transition-colors hover:bg-surface-2/50"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide ${METHOD_STYLES[method]}`}
                      >
                        {method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-fg/90">
                      {endpoint}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DATA MODES */}
      <section>
        <SectionHeader
          index="05 — Modes"
          icon={Database}
          title="Live data or demo data"
          subtitle="The app decides automatically based on the presence of a database connection string."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-volt/25 bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-volt">
              <span className="h-2 w-2 rounded-full bg-volt" />
              Database live
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              When{' '}
              <code className="rounded bg-ink/60 px-1 py-0.5 font-mono text-[11px] text-fg">
                DATABASE_URL
              </code>{' '}
              is set, every read and write goes through Prisma to Neon
              PostgreSQL. Seed the table once with{' '}
              <code className="rounded bg-ink/60 px-1 py-0.5 font-mono text-[11px] text-fg">
                npm run db:seed
              </code>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-warn/25 bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-warn">
              <span className="h-2 w-2 rounded-full bg-warn" />
              Demo mode
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              With no database configured, a sample roster lives in server
              memory so every view still works. The sidebar and banner label
              demo mode, and data resets when the server restarts.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK START */}
      <section>
        <SectionHeader
          index="06 — Setup"
          icon={Terminal}
          title="Quick start"
          subtitle="The commands needed to run the console locally."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink/60">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-volt/70" />
              <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
                Terminal
              </span>
            </div>
            <div className="space-y-2.5 p-5">
              {quickStart.map((command, index) => (
                <div key={command} className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 shrink-0 font-mono text-[11px] text-faint">
                    {index + 1}
                  </span>
                  <code className="font-mono text-[12px] text-volt">
                    {command}
                  </code>
                </div>
              ))}
              <p className="pt-2 text-xs leading-relaxed text-faint">
                Copy{' '}
                <code className="font-mono text-[11px] text-muted">
                  .env.example
                </code>{' '}
                to{' '}
                <code className="font-mono text-[11px] text-muted">.env</code>{' '}
                and add your Neon connection string before seeding.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
              Things to know
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                'Forecasts are illustrative heuristics, not trained machine learning models.',
                'Revenue periods follow member order, so the series shows roster trend rather than calendar history.',
                'Input is normalized in the data layer: attendance is clamped to 0 to 31 and fees cannot go negative.',
                'There is no sign-in or role management; the console assumes a trusted operator.',
              ].map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-volt" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewView;

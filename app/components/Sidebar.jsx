import React from 'react';
import { BarChart3, BookOpen, Users, Dumbbell } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', hint: 'Analytics', icon: BarChart3 },
  { id: 'members', label: 'Members', hint: 'Directory', icon: Users },
  { id: 'overview', label: 'Overview', hint: 'System Guide', icon: BookOpen },
];

const Brand = ({ compact = false }) => (
  <div className="flex items-center gap-3">
    <div
      className={`grid place-items-center rounded-xl bg-volt text-ink shadow-[0_0_32px_-8px_rgba(200,247,81,0.65)] ${
        compact ? 'h-9 w-9' : 'h-11 w-11'
      }`}
    >
      <Dumbbell size={compact ? 18 : 22} strokeWidth={2.6} />
    </div>

    {/*Logo*/}

    <div className="leading-none">
      <h1
        className={`font-display font-semibold uppercase tracking-wide text-fg ${
          compact ? 'text-lg' : 'text-xl'
        }`}
      >
        PowerHouse Gym 
      </h1>
      <p
        className={`text-center font-semibold uppercase text-faint ${
          compact
            ? 'mt-1 text-[9px] tracking-[0.22em]'
            : 'mt-1.5 text-[10px] tracking-[0.24em]'
        }`}
      >
        Database
      </p>
    </div>
  </div>
);

const Sidebar = ({ activeTab, setActiveTab, serverError, dataSource }) => {
  const isDemo = dataSource === 'demo';
  const statusLabel = serverError
    ? 'Connection Error'
    : isDemo
      ? 'Demo Mode'
      : 'Database Live';
  const dotClass = serverError ? 'bg-danger' : isDemo ? 'bg-warn' : 'bg-volt';
  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line bg-ink/95 px-4 py-3 backdrop-blur md:hidden">
        <Brand compact />
        <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? 'bg-volt text-ink'
                    : 'text-muted hover:bg-surface-2 hover:text-fg'
                }`}
              >
                <Icon size={15} strokeWidth={2.4} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[266px] shrink-0 flex-col overflow-y-auto border-r border-line bg-ink px-5 py-7 md:flex">
        <Brand />

        <div className="mt-10 flex-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-faint">
            Menu
          </p>
          <nav className="mt-3 space-y-1.5">
            {navItems.map(({ id, label, hint, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                    active
                      ? 'bg-volt text-ink shadow-[0_10px_28px_-12px_rgba(200,247,81,0.85)]'
                      : 'text-muted hover:bg-surface hover:text-fg'
                  }`}
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.4 : 2}
                    className={active ? 'text-ink' : 'text-faint group-hover:text-volt'}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold leading-none">
                      {label}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] ${
                        active ? 'text-ink/60' : 'text-faint'
                      }`}
                    >
                      {hint}
                    </span>
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      active ? 'bg-ink/50' : 'bg-transparent group-hover:bg-volt'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 border-t border-line pt-5">
          <div
            className={`rounded-xl border bg-surface p-3.5 ${
              serverError
                ? 'border-danger/25'
                : isDemo
                  ? 'border-warn/25'
                  : 'border-line'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${dotClass} ${
                    serverError || isDemo ? 'opacity-40' : 'animate-glow'
                  }`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotClass}`}
                />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                {statusLabel}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-faint">
              {isDemo && !serverError ? (
                <>
                  In-memory sample data
                  <br />
                  No database configured
                </>
              ) : (
                <>
                  Prisma ORM · PostgreSQL
                  <br />
                  Neon serverless
                </>
              )}
            </p>
          </div>
          <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
            v1.0 · Admin Console
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

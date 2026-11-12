import React from 'react';
import { Database } from 'lucide-react';

const Header = ({ activeTab, loading, membersCount, serverError, dataSource }) => {
  const isDashboard = activeTab === 'dashboard';
  const isDemo = dataSource === 'demo';

  return (
    <header className="mb-9 flex flex-col gap-5 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {isDashboard ? 'Performance Console' : 'Member Directory'}
        </div>

        <h2 className="font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-fg sm:text-4xl lg:text-[2.9rem]">
          {isDashboard ? 'Business Overview' : 'Member Management'}
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
          Welcome back, Administrator.{' '}
          {isDashboard
            ? 'Here is how your club is performing today.'
            : 'Manage your roster, plans and trainer assignments.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2.5 rounded-xl border bg-surface px-3.5 py-2.5 text-xs shadow-sm ${
            serverError
              ? 'border-danger/30'
              : isDemo
                ? 'border-warn/30'
                : 'border-line'
          }`}
        >
          {loading && !membersCount ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-volt border-t-transparent" />
              <span className="font-semibold text-muted">Connecting…</span>
            </>
          ) : (
            <>
              <Database
                size={15}
                className={
                  serverError
                    ? 'text-danger'
                    : isDemo
                      ? 'text-warn'
                      : 'text-volt'
                }
              />
              <span
                className={`font-semibold ${
                  serverError
                    ? 'text-danger'
                    : isDemo
                      ? 'text-warn'
                      : 'text-muted'
                }`}
              >
                {serverError
                  ? 'Connection Failed'
                  : isDemo
                    ? 'Demo Data'
                    : 'Neon Database'}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  serverError ? 'bg-danger' : isDemo ? 'bg-warn' : 'bg-volt'
                }`}
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-fg">Administrator</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
              Club Admin
            </p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-volt to-volt-dim font-display text-sm font-bold tracking-wide text-ink shadow-[0_8px_24px_-12px_rgba(200,247,81,0.9)]">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

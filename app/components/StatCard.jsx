import React from 'react';

const tones = {
  volt: { icon: 'bg-volt/10 text-volt ring-volt/25', bar: 'bg-volt' },
  info: { icon: 'bg-info/10 text-info ring-info/25', bar: 'bg-info' },
  warn: { icon: 'bg-warn/10 text-warn ring-warn/25', bar: 'bg-warn' },
  violet: { icon: 'bg-violet/10 text-violet ring-violet/25', bar: 'bg-violet' },
  danger: { icon: 'bg-danger/10 text-danger ring-danger/25', bar: 'bg-danger' },
};

const StatCard = ({ title, value, subtext, icon: Icon, tone = 'volt' }) => {
  const t = tones[tone] || tones.volt;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong">
      <span
        className={`absolute inset-x-0 top-0 h-px ${t.bar} opacity-70`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full ${t.bar} opacity-[0.07] blur-2xl`}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          {title}
        </p>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ${t.icon}`}
        >
          <Icon size={17} strokeWidth={2.2} />
        </span>
      </div>

      <p className="mt-4 font-display text-[2rem] font-semibold leading-none tracking-tight text-fg tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium text-faint">{subtext}</p>
    </div>
  );
};

export default StatCard;

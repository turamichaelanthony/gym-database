import React from 'react';

const ChartTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (!active || !payload || !payload.length) return null;

  const rows = payload.filter(
    (entry) => entry.value !== null && entry.value !== undefined
  );

  if (!rows.length) return null;

  return (
    <div className="rounded-xl border border-line-strong bg-ink/95 px-3.5 py-3 shadow-2xl backdrop-blur">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-faint">
        {label}
      </p>
      <div className="space-y-1.5">
        {rows.map((entry, index) => {
          const rawColor = entry.color || entry.payload?.fill || entry.fill;
          const swatch =
            rawColor && !rawColor.startsWith('url(')
              ? rawColor
              : entry.dataKey === 'count'
                ? ''
                : '';

          return (
            <div
              key={`${entry.name}-${index}`}
              className="flex items-center justify-between gap-6 text-xs"
            >
              <span className="flex items-center gap-2 text-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: swatch }}
                />
                {entry.name}
              </span>
              <span className="font-semibold tabular-nums text-fg">
                {prefix}
                {entry.value}
                {suffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;

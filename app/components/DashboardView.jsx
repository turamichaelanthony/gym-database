import React from 'react';
import {
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  LineChart as LineIcon,
  BarChart3,
  Target,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Tooltip,
} from 'recharts';
import StatCard from './StatCard';
import ChartTooltip from './ChartTooltip';

const GRID = '#1d2420';
const CURSOR = { fill: 'rgba(200, 247, 81, 0.04)' };
const AXIS_TICK = { fill: '#74827a', fontSize: 11 };

const TIER_COLORS = {
  Platinum: '#a78bfa',
  Gold: '#ffc24b',
  Silver: '#9ba8a0',
};

const CARD = 'rounded-2xl border border-line bg-surface';

const legendStyle = {
  paddingTop: 16,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const legendFormatter = (value) => (
  <span style={{ color: '#a2afa7' }}>{value}</span>
);

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

const ChartCard = ({ title, subtitle, children, className = '', action }) => (
  <div className={`${CARD} p-5 sm:p-6 ${className}`}>
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const DashboardView = ({
  stats,
  chartData,
  prescriptions,
  prescriptiveTable,
  serverError,
}) => {
  const summaryRows = [
    ['Members', 'Total Active Members', 'COUNT(Members)', stats.totalMembers],
    ['Attendance', 'Highest Attendance', 'MAX(Attendance)', stats.highestAttendance],
    ['Attendance', 'Lowest Attendance', 'MIN(Attendance)', stats.lowestAttendance],
    ['Attendance', 'Average Attendance', 'AVERAGE(Attendance)', stats.avgAttendance],
    ['Finances', 'Highest Monthly Fee', 'MAX(Fee)', `₱${stats.highestFee}`],
    ['Finances', 'Average Monthly Fee', 'AVERAGE(Fee)', `₱${stats.avgFee}`],
    ['Finances', 'Total Monthly Revenue', 'SUM(Fee)', `₱${stats.totalRevenue}`],
    ['Staff', 'Most Active Trainer', 'MODE(Trainer)', stats.mostActiveTrainer],
    ['Membership', 'Most Common Type', 'MODE(Type)', stats.mostCommonType],
  ];

  return (
    <div className="animate-fade-up space-y-10">
      {/* 1. KEY METRICS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          subtext="Active accounts"
          icon={Users}
          tone="info"
        />
        <StatCard
          title="Avg. Monthly Fee"
          value={`₱${stats.avgFee}`}
          subtext="Per member"
          icon={Activity}
          tone="volt"
        />
        <StatCard
          title="Avg. Attendance"
          value={stats.avgAttendance}
          subtext="Visits / month"
          icon={TrendingUp}
          tone="violet"
        />
        <StatCard
          title="Est. Revenue"
          value={`₱${stats.totalRevenue}`}
          subtext="Current month"
          icon={ArrowUpRight}
          tone="warn"
        />
      </section>

      {/* 2. DESCRIPTIVE ANALYTICS */}
      <section>
        <SectionHeader
          index="01 — Descriptive"
          icon={BarChart3}
          title="Descriptive Analytics"
          subtitle="A clear snapshot of members, attendance and revenue."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ChartCard
            title="Attendance per Member"
            subtitle="Individual member visitation frequency"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.memberAttendanceData}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="attendanceBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d6ff6a" />
                      <stop offset="100%" stopColor="#9ed62e" stopOpacity={0.55} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={GRID}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#74827a', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    angle={-40}
                    textAnchor="end"
                    height={64}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip cursor={CURSOR} content={<ChartTooltip />} />
                  <Bar
                    dataKey="attendance"
                    fill="url(#attendanceBar)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={38}
                    name="Days"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Trainer vs Member Count"
            subtitle="Client distribution across staff"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.trainerChartData}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="trainerBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9cc4ff" />
                      <stop offset="100%" stopColor="#4f8cf0" stopOpacity={0.55} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={GRID}
                  />
                  <XAxis
                    dataKey="name"
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip cursor={CURSOR} content={<ChartTooltip />} />
                  <Bar
                    dataKey="count"
                    fill="url(#trainerBar)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={54}
                    name="Members"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Statistical summary */}
        <div className={`${CARD} mt-5 overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
              Statistical Summary
            </h3>
            <span className="rounded-full border border-line-strong bg-surface-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-surface-2/60">
                <tr>
                  {['Category', 'Metric', 'Formula / Desc', 'Result'].map(
                    (heading) => (
                      <th
                        key={heading}
                        className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint ${
                          heading === 'Result' ? 'text-right' : ''
                        }`}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {summaryRows.map(([category, metric, formula, value]) => (
                  <tr
                    key={metric}
                    className="border-t border-line/70 transition-colors hover:bg-surface-2/50"
                  >
                    <td className="px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-faint">
                      {category}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-fg/90">
                      {metric}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-faint">
                      {formula}
                    </td>
                    <td className="px-5 py-3.5 text-right font-display text-base font-semibold tabular-nums text-fg">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. PREDICTIVE ANALYTICS */}
      <section>
        <SectionHeader
          index="02 — Predictive"
          icon={LineIcon}
          title="Predictive Analytics"
          subtitle="Forecast revenue and attendance trends before they happen."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ChartCard
            title="Revenue Forecasting"
            subtitle="Actual vs. linear regression, exponential smoothing and moving average."
            className="lg:col-span-2"
            action={
              <span className="hidden shrink-0 rounded-full border border-volt/25 bg-volt/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-volt sm:inline-flex">
                3-Month Outlook
              </span>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={GRID}
                  />
                  <XAxis
                    dataKey="period"
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                    tickFormatter={(val) => `₱${val}`}
                  />
                  <Tooltip
                    content={<ChartTooltip prefix="₱" />}
                    cursor={{ stroke: '#313b34', strokeDasharray: '4 4' }}
                  />
                  <Legend
                    wrapperStyle={legendStyle}
                    formatter={legendFormatter}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Actual"
                    stroke="#c8f751"
                    strokeWidth={3}
                    dot={{ r: 3.5, strokeWidth: 2, fill: '#0b0e0c' }}
                    activeDot={{ r: 6, fill: '#c8f751', stroke: '#0b0e0c' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="regression"
                    name="Linear Reg."
                    stroke="#ff6b6b"
                    strokeDasharray="6 5"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="smoothing"
                    name="Exp. Smoothing"
                    stroke="#6aa9ff"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="movingAvg"
                    name="Moving Avg"
                    stroke="#ffb020"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Membership Distribution"
            subtitle="Volume by tier"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.typeChartData}
                  margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={GRID}
                  />
                  <XAxis
                    dataKey="name"
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip cursor={CURSOR} content={<ChartTooltip />} />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={44}
                    name="Members"
                  >
                    {stats.typeChartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={TIER_COLORS[entry.name] || '#c8f751'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {stats.typeChartData.map((entry) => (
                <span
                  key={entry.name}
                  className="flex items-center gap-2 text-[11px] font-medium text-muted"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: TIER_COLORS[entry.name] || '#c8f751',
                    }}
                  />
                  {entry.name}
                </span>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Attendance prediction */}
        <div className={`${CARD} mt-5 overflow-hidden`}>
          <div className="flex flex-col gap-2 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg">
                Attendance Prediction by Membership
              </h3>
              <p className="mt-1 text-sm text-muted">
                Growth forecast for next month based on current averages.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-info/25 bg-info/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-info">
              <Sparkles size={11} />
              Forecast
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 md:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-2/70">
                    <th className="rounded-l-lg px-3 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
                      Membership Type
                    </th>
                    <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
                      Avg. Attendance
                    </th>
                    <th className="rounded-r-lg px-3 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-volt">
                      Predicted Next Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.attendancePredictionData &&
                    stats.attendancePredictionData.map((row) => (
                      <tr
                        key={row.type}
                        className="border-t border-line/70 transition-colors hover:bg-surface-2/40"
                      >
                        <td className="px-3 py-3.5 text-sm font-semibold text-fg">
                          {row.type}
                        </td>
                        <td className="px-3 py-3.5 text-center text-sm tabular-nums text-muted">
                          {row.Average_Attendance}
                        </td>
                        <td className="px-3 py-3.5 text-center font-display text-base font-semibold tabular-nums text-volt">
                          {row.Predicted_Next_Month_Attendance}
                        </td>
                      </tr>
                    ))}
                  {(!stats.attendancePredictionData ||
                    stats.attendancePredictionData.length === 0) && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-3 py-8 text-center text-sm text-faint"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="h-64 rounded-xl border border-line bg-base/40 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.attendancePredictionData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={GRID}
                  />
                  <XAxis
                    dataKey="type"
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ stroke: '#313b34', strokeDasharray: '4 4' }}
                  />
                  <Legend
                    wrapperStyle={legendStyle}
                    formatter={legendFormatter}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="Average_Attendance"
                    name="Avg. Attendance"
                    stroke="#6aa9ff"
                    strokeWidth={3}
                    dot={{ r: 3.5, fill: '#0b0e0c', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Predicted_Next_Month_Attendance"
                    name="Predicted Next Month"
                    stroke="#c8f751"
                    strokeWidth={3}
                    dot={{ r: 3.5, fill: '#0b0e0c', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRESCRIPTIVE ANALYTICS */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface-2 to-surface p-5 sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-info/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-volt text-ink shadow-[0_0_32px_-8px_rgba(200,247,81,0.7)]">
              <BrainCircuit size={22} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-volt">
                03 — Prescriptive
              </p>
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-fg">
                Prescriptive Analytics
              </h3>
              <p className="mt-0.5 text-sm text-muted">
                Automated insights and next actions based on current metrics.
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line-strong bg-ink/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            <Target size={12} className="text-volt" />
            Action Plan
          </span>
        </div>

        {/* Strategic action plan */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-line bg-ink/40">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <CheckCircle2 className="text-volt" size={16} />
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Strategic Action Plan
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-white/[0.02]">
                  {['Issue / Goal', 'Recommendation', 'Expected Result'].map(
                    (heading, index) => (
                      <th
                        key={heading}
                        className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint ${
                          index === 2 ? 'text-right' : ''
                        }`}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {prescriptiveTable &&
                  prescriptiveTable.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t border-line/60 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-warn/90">
                        {row.issue}
                      </td>
                      <td className="px-5 py-4 text-sm text-fg/80">
                        {row.recommendation}
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-semibold text-volt">
                        {row.result}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic insight cards */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {prescriptions.map((item, idx) => {
            const tone =
              item.type === 'critical'
                ? {
                    card: 'border-danger/25 bg-danger/10',
                    title: 'text-danger',
                    icon: AlertTriangle,
                  }
                : item.type === 'success'
                  ? {
                      card: 'border-volt/25 bg-volt/10',
                      title: 'text-volt',
                      icon: TrendingUp,
                    }
                  : {
                      card: 'border-warn/25 bg-warn/10',
                      title: 'text-warn',
                      icon: AlertTriangle,
                    };
            const Icon = tone.icon;

            return (
              <div
                key={idx}
                className={`rounded-2xl border p-5 transition-transform duration-200 hover:-translate-y-1 ${tone.card}`}
              >
                <h4
                  className={`mb-2.5 flex items-center gap-2 text-sm font-bold ${tone.title}`}
                >
                  <Icon size={16} />
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>

             
            );
          })}
        

           
         
        </div>
      </section>

<footer className="w-full border-t border-gray-800 py-4 mt-8">
  <div className="text-center text-xs text-gray-500">
    © {new Date().getFullYear()} Gym System Analytics. All rights reserved By Tura Michael, Andales Cindy And Turawan Kenneth Group.
    
  </div>
</footer>
    
         </div>
  );
};

export default DashboardView;

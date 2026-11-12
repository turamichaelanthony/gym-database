import React from 'react';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Users,
} from 'lucide-react';

const getAttendanceStyle = (days) => {
  if (days >= 20) return 'border-volt/30 bg-volt/10 text-volt';
  if (days >= 10) return 'border-info/30 bg-info/10 text-info';
  return 'border-danger/30 bg-danger/10 text-danger';
};

const getTierStyle = (type) => {
  if (type === 'Platinum')
    return 'border-violet/30 bg-violet/10 text-violet';
  if (type === 'Gold') return 'border-warn/30 bg-warn/10 text-warn';
  return 'border-line-strong bg-surface-2 text-muted';
};

const getTierDot = (type) => {
  if (type === 'Platinum') return 'bg-violet';
  if (type === 'Gold') return 'bg-warn';
  return 'bg-faint';
};

const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase() || '?';

const MembersView = ({
  filteredMembers,
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
  setShowModal,
  resetForm,
  setEditingMember,
  serverError,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="animate-fade-up space-y-5">
      {/* Controls */}
      <div className="sticky top-2 z-30 flex flex-col gap-3 rounded-2xl border border-line bg-surface/90 p-4 shadow-lg shadow-black/20 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="Search members…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-line bg-base py-2.5 pl-9 pr-4 text-sm text-fg outline-none transition-all placeholder:text-faint focus:border-volt/60 focus:ring-2 focus:ring-volt/15"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by membership tier"
              className="w-full cursor-pointer appearance-none rounded-xl border border-line bg-base py-2.5 pl-9 pr-9 text-sm font-medium text-fg outline-none transition-colors hover:border-line-strong focus:border-volt/60 focus:ring-2 focus:ring-volt/15 sm:w-auto"
            >
              <option value="All">All Tiers</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingMember(null);
            setShowModal(true);
          }}
          disabled={!!serverError}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-volt px-5 py-2.5 text-sm font-bold text-ink shadow-[0_10px_28px_-12px_rgba(200,247,81,0.85)] transition-all hover:bg-[#d6ff6a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={18} strokeWidth={2.6} />
          Add Member
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead className="bg-surface-2/60">
              <tr>
                {[
                  'Member',
                  'Tier',
                  'Attendance',
                  'Trainer',
                  'Fee',
                  'Actions',
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint ${
                      heading === 'Actions' ? 'text-right' : ''
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.member_id}
                  className="group border-t border-line/70 transition-colors hover:bg-surface-2/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-display text-xs font-semibold uppercase tracking-wide text-volt">
                        {initials(member.member_name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-fg">
                          {member.member_name}
                        </p>
                        <p className="truncate font-mono text-[10px] text-faint">
                          ID {member.member_id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getTierStyle(
                        member.membership_type
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${getTierDot(
                          member.membership_type
                        )}`}
                      />
                      {member.membership_type}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-lg border px-2 py-1 text-[11px] font-bold tabular-nums ${getAttendanceStyle(
                          member.attendance_days
                        )}`}
                      >
                        {member.attendance_days} days
                      </span>
                      {member.attendance_days < 5 && (
                        <span
                          title="Low attendance — churn risk"
                          className="text-danger"
                        >
                          <AlertTriangle className="h-4 w-4 animate-pulse" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    {member.trainer_assigned !== 'None' ? (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-surface-2 text-[10px] font-bold text-muted">
                          {member.trainer_assigned.charAt(0)}
                        </span>
                        <span className="truncate">{member.trainer_assigned}</span>
                      </div>
                    ) : (
                      <span className="text-xs italic text-faint">No trainer</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-display text-base font-semibold tabular-nums text-fg">
                      ₱{member.monthly_fee}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5 transition-opacity md:opacity-60 md:group-hover:opacity-100">
                      <button
                        onClick={() => handleEdit(member)}
                        aria-label={`Edit ${member.member_name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-2 text-muted transition-colors hover:border-volt/30 hover:text-volt"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.member_id)}
                        aria-label={`Delete ${member.member_name}`}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-2 text-faint transition-colors hover:border-danger/30 hover:bg-danger/10 hover:text-danger"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-line bg-surface-2 text-faint">
              {serverError ? <AlertTriangle size={28} /> : <Users size={28} />}
            </div>
            <p className="text-sm font-medium text-muted">
              {serverError
                ? 'Database connection error.'
                : 'No members found. Add one to get started!'}
            </p>
            {!serverError && (
              <button
                onClick={() => {
                  resetForm();
                  setEditingMember(null);
                  setShowModal(true);
                }}
                className="mt-3 text-sm font-bold text-volt hover:underline"
              >
                Add First Member
              </button>
            )}
          </div>
        )}

        {filteredMembers.length > 0 && (
          <div className="flex items-center justify-between border-t border-line bg-surface-2/40 px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              Showing {filteredMembers.length} member
              {filteredMembers.length === 1 ? '' : 's'}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
                Live roster
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersView;

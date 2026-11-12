import React, { useEffect } from 'react';
import { X, Save, ChevronDown, UserPlus, Pencil } from 'lucide-react';

const fieldClass =
  'w-full rounded-xl border border-line bg-base px-3.5 py-2.5 text-sm text-fg outline-none transition-all placeholder:text-faint focus:border-volt/60 focus:ring-2 focus:ring-volt/15';

const labelClass =
  'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted';

const MemberModal = ({
  showModal,
  setShowModal,
  editingMember,
  formData,
  setFormData,
  handleSubmit,
  loading,
}) => {
  useEffect(() => {
    if (!showModal) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setShowModal(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setShowModal(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      <div
        className="animate-fade-up max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-2xl shadow-black/60 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >



        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-volt/25 bg-volt/10 text-volt">
              {editingMember ? <Pencil size={18} /> : <UserPlus size={19} />}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-faint">
                Members / {editingMember ? 'Edit' : 'New'}
              </p>
              <h3
                id="member-modal-title"
                className="font-display text-xl font-semibold uppercase tracking-wide text-fg"
              >
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowModal(false)}
            aria-label="Close dialog"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 text-faint transition-colors hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>


        {/* Form sa Modal namo which Add Members */}

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div>
            <label htmlFor="member-name" className={labelClass}>
              Full Name
            </label>
            <input
              id="member-name"
              required
              type="text"
              className={fieldClass}
              value={formData.member_name}
              onChange={(e) =>
                setFormData({ ...formData, member_name: e.target.value })
              }
              placeholder="Full Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="member-tier" className={labelClass}>
                Membership
              </label>
              <div className="relative">
                <select
                  id="member-tier"
                  className={`${fieldClass} cursor-pointer appearance-none pr-9`}
                  value={formData.membership_type}
                  onChange={(e) =>
                    setFormData({ ...formData, membership_type: e.target.value })
                  }
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </div>

            <div>
              <label htmlFor="member-fee" className={labelClass}>
                Fee (₱)
              </label>
              <input
                id="member-fee"
                type="number"
                min="0"
                className={fieldClass}
                value={formData.monthly_fee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthly_fee: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="member-attendance" className={labelClass}>
                Attendance
              </label>
              <input
                id="member-attendance"
                type="number"
                min="0"
                max="31"
                className={fieldClass}
                value={formData.attendance_days}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendance_days: parseInt(e.target.value),
                  })
                }
              />
              <p className="mt-1.5 text-[10px] text-faint">Visits this month</p>
            </div>

            <div>
              <label htmlFor="member-trainer" className={labelClass}>
                Trainer
              </label>
              <div className="relative">
                <select
                  id="member-trainer"
                  className={`${fieldClass} cursor-pointer appearance-none pr-9`}
                  value={formData.trainer_assigned}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainer_assigned: e.target.value,
                    })
                  }
                >
                  <option value="None">None</option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-volt px-5 py-2.5 text-sm font-bold text-ink shadow-[0_10px_28px_-12px_rgba(200,247,81,0.85)] transition-all hover:bg-[#d6ff6a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
              ) : (
                <Save size={17} />
              )}
              {editingMember ? 'Update Changes' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;

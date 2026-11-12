// In-memory demo data used when no DATABASE_URL is configured.
// Kept on globalThis so it survives Next.js hot reloads during development.

export const DEMO_MEMBERS = [
  { member_name: 'Miguel Santos', membership_type: 'Platinum', attendance_days: 24, trainer_assigned: 'Johnlee Jumao-ass', monthly_fee: 2500 },
  { member_name: 'Andrea Reyes', membership_type: 'Gold', attendance_days: 18, trainer_assigned: 'Jamak Gulbe Roger', monthly_fee: 1800 },
  { member_name: 'Joshua Dela Cruz', membership_type: 'Silver', attendance_days: 9, trainer_assigned: 'None', monthly_fee: 1200 },
  { member_name: 'Bea Villanueva', membership_type: 'Platinum', attendance_days: 26, trainer_assigned: 'Sefuesky', monthly_fee: 2500 },
  { member_name: 'Carlo Mendoza', membership_type: 'Gold', attendance_days: 15, trainer_assigned: 'Johnlee Jumao-ass', monthly_fee: 1800 },
  { member_name: 'Nicole Garcia', membership_type: 'Silver', attendance_days: 4, trainer_assigned: 'None', monthly_fee: 1200 },
  { member_name: 'Rafael Bautista', membership_type: 'Gold', attendance_days: 21, trainer_assigned: 'Jamak Gulbe Roger', monthly_fee: 1800 },
  { member_name: 'Sofia Lim', membership_type: 'Platinum', attendance_days: 22, trainer_assigned: 'Sefuesky', monthly_fee: 2500 },
  { member_name: 'Mark Aquino', membership_type: 'Silver', attendance_days: 11, trainer_assigned: 'Johnlee Jumao-ass', monthly_fee: 1200 },
  { member_name: 'Jasmine Cruz', membership_type: 'Gold', attendance_days: 13, trainer_assigned: 'None', monthly_fee: 1800 },
  { member_name: 'Paolo Navarro', membership_type: 'Silver', attendance_days: 6, trainer_assigned: 'None', monthly_fee: 1200 },
  { member_name: 'Isabelle Ramos', membership_type: 'Platinum', attendance_days: 28, trainer_assigned: 'Sefuesky', monthly_fee: 2500 },
];

function getStore() {
  if (!globalThis.__gymDemoStoreV2) {
    globalThis.__gymDemoStoreV2 = {
      nextId: DEMO_MEMBERS.length + 1,
      members: DEMO_MEMBERS.map((member, index) => ({
        member_id: index + 1,
        ...member,
      })),
    };
  }

  return globalThis.__gymDemoStoreV2;
}

export function listDemoMembers(order = 'desc') {
  const members = [...getStore().members];
  return members.sort((a, b) =>
    order === 'asc' ? a.member_id - b.member_id : b.member_id - a.member_id
  );
}

export function createDemoMember(data) {
  const store = getStore();
  const member = {
    member_id: store.nextId++,
    member_name: data.member_name,
    membership_type: data.membership_type,
    attendance_days: data.attendance_days,
    trainer_assigned: data.trainer_assigned,
    monthly_fee: data.monthly_fee,
  };

  store.members.push(member);
  return { ...member };
}

export function updateDemoMember(id, data) {
  const member = getStore().members.find((item) => item.member_id === id);
  if (!member) return null;

  Object.assign(member, data);
  return { ...member };
}

export function deleteDemoMember(id) {
  const store = getStore();
  const index = store.members.findIndex((member) => member.member_id === id);
  if (index === -1) return null;

  const [removed] = store.members.splice(index, 1);
  return { ...removed };
}

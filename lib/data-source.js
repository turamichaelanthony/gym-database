import {
  createDemoMember,
  deleteDemoMember,
  listDemoMembers,
  updateDemoMember,
} from './demo-data';

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function currentSource() {
  return isDatabaseConfigured() ? 'database' : 'demo';
}

async function prismaClient() {
  const mod = await import('./prisma');
  return mod.default;
}

function clampAttendance(value) {
  const parsed = Math.trunc(Number(value) || 0);
  return Math.min(31, Math.max(0, parsed));
}

function normalizeMember(input = {}, partial = false) {
  const data = {};

  if (!partial || input.member_name !== undefined) {
    data.member_name = String(input.member_name ?? '').trim();
  }
  if (!partial || input.membership_type !== undefined) {
    data.membership_type = String(input.membership_type || 'Silver');
  }
  if (!partial || input.attendance_days !== undefined) {
    data.attendance_days = clampAttendance(input.attendance_days);
  }
  if (!partial || input.trainer_assigned !== undefined) {
    data.trainer_assigned = String(input.trainer_assigned || 'None');
  }
  if (!partial || input.monthly_fee !== undefined) {
    data.monthly_fee = Math.max(0, Number(input.monthly_fee) || 0);
  }

  return data;
}

export async function listMembers(order = 'desc') {
  if (!isDatabaseConfigured()) {
    return listDemoMembers(order);
  }

  const prisma = await prismaClient();
  return prisma.member.findMany({ orderBy: { member_id: order } });
}

export async function createMember(input) {
  const data = normalizeMember(input, false);

  if (!isDatabaseConfigured()) {
    return createDemoMember(data);
  }

  const prisma = await prismaClient();
  return prisma.member.create({ data });
}

export async function updateMember(id, input) {
  const data = normalizeMember(input, true);
  if (Object.keys(data).length === 0) return null;

  if (!isDatabaseConfigured()) {
    return updateDemoMember(id, data);
  }

  const prisma = await prismaClient();
  return prisma.member.update({ where: { member_id: id }, data });
}

export async function deleteMember(id) {
  if (!isDatabaseConfigured()) {
    return deleteDemoMember(id);
  }

  const prisma = await prismaClient();
  return prisma.member.delete({ where: { member_id: id } });
}

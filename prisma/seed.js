import { PrismaClient } from '@prisma/client';
import { DEMO_MEMBERS } from '../lib/demo-data.js';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.member.count();

  if (existing > 0) {
    console.log(`Database already has ${existing} members — skipping seed.`);
    return;
  }

  await prisma.member.createMany({ data: DEMO_MEMBERS });
  console.log(`Seeded ${DEMO_MEMBERS.length} members.`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

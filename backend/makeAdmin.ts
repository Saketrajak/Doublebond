import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function makeAdmin() {
  await prisma.user.updateMany({
    data: { role: 'ADMIN' }
  });
  console.log("All existing test users upgraded to ADMIN!");
}

makeAdmin().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
import userSeeds from './seeds/dbTest/userSeeds';

const prisma = new PrismaClient();
async function main() {
  await userSeeds(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

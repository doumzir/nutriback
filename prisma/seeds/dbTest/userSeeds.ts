import { PrismaClient, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const passwordTest = '123456789';

export default async function userSeeds(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: bcrypt.hashSync(passwordTest, 10),
        firstname: 'Michael',
        lastname: 'Jackson',
        userName: 'MJUserName',
        userType: UserType.ADMIN,
      },
      {
        email: 'user2@example.com',
        password: bcrypt.hashSync(passwordTest, 10),
        firstname: 'Henry',
        lastname: 'Cavill',
        userName: 'Warhammer123',
        userType: UserType.COACH,
      },
      {
        email: 'user3@example.com',
        password: bcrypt.hashSync(passwordTest, 10),
        firstname: 'Gordon',
        lastname: 'Freeman',
        userName: 'MysteriousGMan',
        userType: UserType.SPORTY,
      },
    ],
  });
}

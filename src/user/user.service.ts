import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserWithoutPassword } from './userDto';

interface ExtendedUserCreateInput extends Prisma.UserCreateInput {
  diplomaBuffer?: Buffer;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async getUser(userName: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { userName: userName },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    //ToDo : Control password format
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.prisma.user.create({ data });
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      ...userWithoutPassword
    }: { password: string } & UserWithoutPassword = response;
    return userWithoutPassword;
  }

  async createUserAccount(data: ExtendedUserCreateInput): Promise<UserWithoutPassword> {
    // Vérifier le format du mot de passe
    if (!this.isValidPassword(data.password)) {
      throw new Error('Format de mot de passe invalide');
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { userName: data.userName }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      } else {
        throw new Error('USERNAME_ALREADY_EXISTS');
      }
    }
    const { diplomaBuffer } = data;
    // Hacher le mot de passe
    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur avec une transaction Prisma
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            ...data,
            password: hashedPassword,
          },
        });

        // Créer le profil spécifique en fonction du type d'utilisateur
        console.log(user.userType)
        switch (user.userType) {
          case UserType.SPORTY:
            console.log('sporty');
            await prisma.sporty.create({
              data: {
                userId: user.id,
              },
            });
            break;
          case UserType.COACH:
            await prisma.coach.create({
              data: {
                userId: user.id,
                proofUrl: diplomaBuffer ? Buffer.from(diplomaBuffer).toString('base64') : '',
              },
            });
            break;
          case UserType.ADMIN:
            // Aucune action supplémentaire nécessaire pour l'administrateur
            break;
          default:
            throw new Error('Type d\'utilisateur non valide');
        }

        return user;
      });

      const { password, ...userWithoutPassword } = result;
      return userWithoutPassword;
    } catch (error) {
     
      throw error;
    }
  }

  private isValidPassword(password: string): boolean {
    console.log(password);
    // Implémentez ici votre logique de validation du mot de passe
    // Par exemple : au moins 8 caractères, une majuscule, une minuscule, un chiffre
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}

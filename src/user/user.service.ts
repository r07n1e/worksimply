import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(id: number, userProfile: UserProfileDto, user: User) {
    if (id !== user.id) return null;
    try {
      const profile = await this.prisma.profile.update({
        where: {
          userId: user.id,
        },
        data: {
          bio: userProfile.bio,
        },
      });
    } catch (error) {}
  }

  async deleteUser(id: number, user: User) {
    if (id !== user.id) return null;
    try {
      await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return 'Delete Success';
    } catch (error) {}
  }
}

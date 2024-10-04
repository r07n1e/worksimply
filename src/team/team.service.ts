import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(dto, user) {
    try {
      const team = await this.prisma.team.create({
        data: {
          name: dto.name,
          teamOwnerId: user.id,
          createdAt: new Date(),
        },
      });

      return {
        status: 201,
        message: 'created successfullt',
        data: team,
      };
    } catch (error) {
      throw error;
    }
  }

  async joinTeam(id, user) {
    try {
      const team = await this.prisma.team.update({
        where: {
          id: id,
        },
        data: {
          members: user,
        },
      });
      return {
        status: 200,
        message: 'joined successfully',
        data: team,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTeam(id, dto, user) {
    try {
      const team = await this.prisma.team.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });

      return {
        status: 200,
        message: 'updated successfullt',
        data: team,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTeams(user) {
    try {
      const teams = await this.prisma.team.findMany({
        where: {
          teamOwnerId: user.id,
        },
      });
      return {
        status: 200,
        data: teams,
      };
    } catch (error) {
      throw error;
    }
  }
}

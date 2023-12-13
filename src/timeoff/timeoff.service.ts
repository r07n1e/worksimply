import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTimeoffDto } from './dto';

@Injectable()
export class TimeoffService {
  constructor(private prisma: PrismaService) {}

  async requestTimeoff(dto, user) {
    try {
      const requestTimeoff = await this.prisma.timeoff.create({
        data: {
          type: dto.type,
          timeoff_start: dto.timeoff_start,
          timeoff_end: dto.timeoff_end,
          userId: user.id,
        },
      });

      return requestTimeoff;
    } catch (error) {
      throw error;
    }
  }

  async editTimeoff(id, dto, user) {
    try {
      const timeoff = await this.prisma.timeoff.findUnique({
        where: {
          id: id,
        },
      });
      if (!timeoff) return 'Not Found';

      const editTimeoff = await this.prisma.timeoff.update({
        where: {
          id: id,
        },
        data: {},
      });

      return editTimeoff;
    } catch (error) {
      throw error;
    }
  }

  async deleteTimeoff(id, user) {
    try {
      const timeoff = await this.prisma.timeoff.findUnique({
        where: {
          id: id,
        },
      });

      if (!timeoff) return 'Not Found';

      const deleteTimeoff = await this.prisma.timeoff.delete({
        where: {
          id: id,
        },
      });

      if (deleteTimeoff) return 'Delete Successful';
    } catch (error) {
      throw error;
    }
  }

  async getTimeoffByUser(username, user) {
    try {
      if (!(username == user.username))
        return "You dont have permission to view this user's timeoff records.";
      const timeoffs = await this.prisma.timeoff.findMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllTimeoff(dto: SearchTimeoffDto) {
    try {
      const timeoffs = await this.prisma.timeoff.findMany({
        where: {
          ...(dto.user ? { user: { username: dto.user.username } } : {}),
          ...(dto.date ? { date: dto.date } : {}),
        },
      });

      return timeoffs;
    } catch (error) {
      throw error;
    }
  }

  async approveTimeoff(id) {
    try {
      const approveTimeoff = this.prisma.timeoff.update({
        where: {
          id: id,
        },
        data: {},
      });
    } catch (error) {
      throw error;
    }
  }
}

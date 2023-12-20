import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTimeoffDto, TimeoffDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class TimeoffService {
  constructor(private prisma: PrismaService) {}

  async requestTimeoff(dto: TimeoffDto, user: User) {
    try {
      const requestTimeoff = await this.prisma.timeoff.create({
        data: {
          userId: user.id,
          type: dto.type,
          timeoff_start: dto.timeoff_start,
          timeoff_end: dto.timeoff_end,
          //description: dto.description,
        },
      });

      return requestTimeoff;
    } catch (error) {
      throw error;
    }
  }

  async editTimeoff(id, dto: TimeoffDto, user: User) {
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
        data: {
          ...(dto.type ? { type: dto.type } : {}),
          ...(dto.timeoff_start ? { timeoff_start: dto.timeoff_start } : {}),
          ...(dto.timeoff_end ? { timeoff_end: dto.timeoff_end } : {}),
          ...(dto.description ? {} : {}),
        },
      });

      return editTimeoff;
    } catch (error) {
      throw error;
    }
  }

  async deleteTimeoff(id: number, user: User) {
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

  async getTimeoffByUser(username: string, user: User) {
    try {
      if (!(username == user.username))
        return "You dont have permission to view this user's timeoff records.";
      const timeoffs = await this.prisma.timeoff.findMany({
        where: {
          userId: user.id,
        },
      });
      return timeoffs;
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

  async approveTimeoff(id, dto) {
    try {
      const approvedTimeoff = this.prisma.timeoff.update({
        where: {
          id: id,
        },
        data: {
          approved: dto.approval,
        },
      });

      return approvedTimeoff;
    } catch (error) {
      throw error;
    }
  }
}

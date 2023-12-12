import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async editTimeoff(id, dto, user) {}

  async deleteTimeoff() {}

  async getTimeoffByUser() {}

  async getAllTimeoff() {}

  async approveTimeoff() {}
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async timeIn(user: User) {
    try {
      const today = new Date();
      const checkTimeInEntry = await this.prisma.attendance.findFirst({
        where: {
          userId: user.id,
          date: today,
        },
      });

      if (checkTimeInEntry) return 'Entried exists; Cannot create another.';

      const timeIn = await this.prisma.attendance.create({
        data: {
          userId: user.id,
          date: today,
        },
      });

      return timeIn;
    } catch (error) {
      throw error;
    }
  }

  async timeOut(user: User) {
    try {
      const today = new Date();
      const timeIn = await this.prisma.attendance.findFirst({
        where: {
          userId: user.id,
          date: today,
        },
      });

      if (!timeIn) return 'No TimeIn Entry Is Found.';

      var time_spent =
        Math.abs(timeIn.timeIn.getTime() - today.getTime()) / 36e5;

      const timeOut = await this.prisma.attendance.update({
        where: {
          id: timeIn.id,
        },
        data: {
          timeOut: new Date(),
          time_spent: time_spent,
        },
      });
      return timeOut;
    } catch (error) {
      throw error;
    }
  }

  async getAttendanceByUser(username: string, user: User, dto) {
    try {
      if (!(username == user.username))
        return "You do not have the permission to view this user's attendance records.";

      const attendances = await this.prisma.attendance.findMany({
        where: {
          userId: user.id,
          ...(dto.date ? { date: dto.date } : {}),
        },
      });

      return attendances;
    } catch (error) {
      throw error;
    }
  }
}

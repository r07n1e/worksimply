import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceDto, SearchAttendanceDto } from './dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async timeIn(user: User) {
    try {
      const user_existed = await this.prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });
      if (!user_existed) return 'User does not exist.';

      const today = new Date();
      const checkTimeInEntry = await this.prisma.attendance.findFirst({
        where: {
          userId: user.id,
          date: today,
        },
      });

      if (checkTimeInEntry) return 'Entry exists; Cannot create another.';

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
      const user_existed = await this.prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });
      if (!user_existed) return 'User does not exist.';

      const today = new Date();
      const attendance = await this.prisma.attendance.findFirst({
        where: {
          userId: user.id,
          date: today,
        },
      });

      if (!attendance) return 'No TimeIn Entry Is Found.';
      if (attendance.timeOut !== null)
        return 'Entry Existed; Cannot Create Another.';

      var time_spent =
        Math.abs(attendance.timeIn.getTime() - today.getTime()) / 36e5;

      const timeOut = await this.prisma.attendance.update({
        where: {
          id: attendance.id,
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

  async getAttendanceByUser(username: string, user: User, dto: AttendanceDto) {
    try {
      const user_existed = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (!user_existed) return 'User does not exist.';

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

  async searchAttendance(dto: SearchAttendanceDto) {
    try {
      const attendances = await this.prisma.attendance.findMany({
        where: {
          ...(dto.user ? { user: { username: dto.user.username } } : {}),
          ...(dto.date ? { date: dto.date } : {}),
        },
      });

      return attendances;
    } catch (error) {
      throw error;
    }
  }
}

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private userSelect = {
    id: true,
    username: true,
    role: true,
  } as const;

  async createUserService(dto: UserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });

      if (existingUser) {
        throw new BadRequestException('Username นี้มีอยู่ในระบบแล้ว');
      }

      const hashedPassword = await this.hashPassword(dto.password);

      return await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPassword,
        },
        select: this.userSelect,
      });
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async findAllUserService() {
    try {
      return await this.prisma.user.findMany({
        select: this.userSelect,
      });
    } catch (error: any) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async findUserByIdService(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: this.userSelect,
      });

      if (!user) {
        throw new NotFoundException('ไม่พบ User นี้');
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async updateUserService(id: string, dto: Partial<UserDto>) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException('ไม่พบ User นี้');
      }

      if (dto.username && dto.username !== existingUser.username) {
        const usernameCheck = await this.prisma.user.findUnique({
          where: { username: dto.username },
        });

        if (usernameCheck) {
          throw new BadRequestException('Username นี้ถูกใช้งานแล้ว');
        }
      }

      const updatedData = { ...dto };

      if (dto.password) {
        updatedData.password = await this.hashPassword(dto.password);
      }

      return await this.prisma.user.update({
        where: { id },
        data: updatedData,
        select: this.userSelect,
      });
    } catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async deleteUserService(id: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException('ไม่พบ User นี้');
      }

      return await this.prisma.user.delete({
        where: { id },
        select: this.userSelect,
      });
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }
}

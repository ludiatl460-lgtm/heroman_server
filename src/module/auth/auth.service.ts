import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) {
      throw new UnauthorizedException('username ຫຼື password ບໍ່ຖືກຕ້ອງ');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('username ຫຼື password ບໍ່ຖືກຕ້ອງ');
    }

    const profile = await this.getProfileByUserId(user.id, user.role);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      profileType: profile?.type,
      profileId: profile?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        profileType: profile?.type,
        profileId: profile?.id,
      },
    };
  }

  private async getProfileByUserId(userId: string, role: string) {
    if (role === 'ADMIN') {
      const admin = await this.prisma.admin.findFirst({
        where: { userId },
      });
      return admin ? { id: admin.id, type: 'ADMIN' } : null;
    }

    if (role === 'CUSTOMER') {
      const customer = await this.prisma.customer.findFirst({
        where: { userId },
      });
      return customer ? { id: customer.id, type: 'CUSTOMER' } : null;
    }

    if (role === 'MECHANIC') {
      const mechanic = await this.prisma.mechanic.findFirst({
        where: { userId },
      });
      return mechanic ? { id: mechanic.id, type: 'MECHANIC' } : null;
    }

    return null;
  }
}

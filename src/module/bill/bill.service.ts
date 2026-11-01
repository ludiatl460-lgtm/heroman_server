import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BillDto } from './dto/bill.dto';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}

  async createBillService(dto: BillDto) {
    try {
      return await this.prisma.bill.create({
        data: dto,
      });
    } catch (error: any) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async findAllBillService() {
    try {
      return await this.prisma.bill.findMany();
    } catch (error: any) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async findBillByIdService(id: string) {
    try {
      const bill = await this.prisma.bill.findUnique({
        where: { id },
      });

      if (!bill) {
        throw new NotFoundException('ไม่พบบิลนี้');
      }

      return bill;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async updateBillService(id: string, dto: Partial<BillDto>) {
    try {
      const bill = await this.prisma.bill.findUnique({ where: { id } });

      if (!bill) {
        throw new NotFoundException('ไม่พบบิลนี้');
      }

      return await this.prisma.bill.update({
        where: { id },
        data: dto,
      });
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }

  async deleteBillService(id: string) {
    try {
      const bill = await this.prisma.bill.findUnique({ where: { id } });

      if (!bill) {
        throw new NotFoundException('ไม่พบบิลนี้');
      }

      return await this.prisma.bill.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาด: ' + error.message);
    }
  }
}

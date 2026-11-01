import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminDto } from "./dto/admin.dto";

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}
    async createAdminService(dto: AdminDto) {
        try {
            const [existTel, existEmail,] = await Promise.all([
                this.prisma.admin.findFirst({ where: { contact: dto.contact } }),
                this.prisma.admin.findFirst({ where: { email: dto.email } }),
            ]);

            if (existTel) throw new BadRequestException("ເບີໂທລະສັບນີ້ມີໃນລະບົບແລ້ວ");
            if (existEmail) throw new BadRequestException("ອີເມວນີ້ມີໃນລະບົບແລ້ວ");

            return await this.prisma.admin.create({ data: dto });
        } catch (error: any) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException("ເກີດຂໍ້ຜິດພາດ: " + error.message);
        }
    }

    async findAllAdminService() {
        try {
            return await this.prisma.admin.findMany({ include: { user: true } });
        } catch (error: any) {
            throw new InternalServerErrorException("ເກີດຂໍ້ຜິດພາດ: " + error.message);
        }
    }


    async findAdminById(id: string) {
        try {
            return await this.prisma.admin.findUnique({ where: { id }, include: { user: true } });
        } catch (error: any) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("ເກີດຂໍ້ຜິດພາດ: " + error.message);
        }
    }

    async updateAdminService(id: string, dto: Partial<AdminDto>) {
        try {
            if (dto.contact || dto.email) {
                const existDuplicate = await this.prisma.admin.findFirst({
                    where: {
                        AND: [
                            { id: { not: id } },
                            {
                                OR: [
                                    ...(dto.contact ? [{ contact: dto.contact }] : []),
                                    ...(dto.email ? [{ email: dto.email }] : [])
                                ]
                            }
                        ]
                    }
                });

                if (existDuplicate) {
                    if (existDuplicate.contact === dto.contact) {
                        throw new BadRequestException("ເບີໂທລະສັບນີ້ຖືກໃຊ້ງານໂດຍ Admin ຄົນອື່ນແລ້ວ");
                    }
                    if (existDuplicate.email === dto.email) {
                        throw new BadRequestException("ອີເມວນີ້ຖືກໃຊ້ງານໂດຍ Admin ຄົນອື່ນແລ້ວ");
                    }
                }
            }

            return await this.prisma.admin.update({ data: dto, where: { id } });
        } catch (error: any) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("ເກີດຂໍ້ຜິດພາດ: " + error.message);
        }
    }

    async deleteAdminService(id: string) {
        try {
            return await this.prisma.admin.delete({ where: { id } });
        } catch (error: any) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("ເກີດຂໍ້ຜິດພາດ: " + error.message);
        }
    }
}
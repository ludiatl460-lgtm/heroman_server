import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BillDto } from './dto/bill.dto';
import { BillService } from './bill.service';

@Controller('bill')
@UseGuards(JwtAuthGuard)
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  createBill(@Body() dto: BillDto) {
    return this.billService.createBillService(dto);
  }

  @Get()
  @Roles('ADMIN', 'CUSTOMER', 'MECHANIC')
  @HttpCode(HttpStatus.OK)
  findAllBill() {
    return this.billService.findAllBillService();
  }

  @Get(':id')
  @Roles('ADMIN', 'CUSTOMER', 'MECHANIC')
  @HttpCode(HttpStatus.OK)
  findBillById(@Param('id') id: string) {
    return this.billService.findBillByIdService(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  updateBill(@Param('id') id: string, @Body() dto: Partial<BillDto>) {
    return this.billService.updateBillService(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  deleteBill(@Param('id') id: string) {
    return this.billService.deleteBillService(id);
  }
}

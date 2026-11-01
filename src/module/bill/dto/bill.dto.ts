import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { BillStatus } from '@prisma/client';

export class ObjectItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class BillDto {
  @IsOptional()
  @IsString()
  mechanicId?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsEnum(BillStatus)
  @IsNotEmpty()
  status: BillStatus;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjectItemDto)
  items: ObjectItemDto[];

  @IsNumber()
  @Min(0)
  repairCost: number;

  @IsNumber()
  @Min(0)
  fee: number;

  @IsNumber()
  @Min(0)
  sumTotal: number;

  @IsBoolean()
  @IsNotEmpty()
  isPaid: boolean;
}

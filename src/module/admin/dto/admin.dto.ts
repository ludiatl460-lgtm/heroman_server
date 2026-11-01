import { IsString, IsEnum, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';
import { Gender } from '@prisma/client';

export class AdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
import { Gender } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum, IsEmail, IsOptional } from "class-validator";

export class CustomerDto{
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
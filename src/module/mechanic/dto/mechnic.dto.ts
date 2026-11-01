import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsInt, 
  IsArray, 
  IsEmail, 
  IsBoolean, 
  IsMongoId, 
  Min 
} from 'class-validator';
import { Gender, DocumentType, ApproveStatus } from '@prisma/client';

export class MechanicDto {
  @IsString()
  laoName: string;

  @IsOptional()
  @IsString()
  laoLastName?: string;

  @IsString()
  engName: string;

  @IsOptional()
  @IsString()
  engLastName?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birth: string; // ຮັບຄ່າເປັນ ISO Date string (ຕົວຢ່າງ: "1995-05-12T00:00:00.000Z")

  @IsString()
  presentAddress: string;

  @IsString()
  bornAddress: string;

  @IsOptional()
  @IsMongoId()
  jobId?: string;

  @IsOptional()
  @IsString()
  skill?: string; 

  @IsString()
  cv: string;

  @IsInt()
  @Min(0)
  experience: number;

  @IsArray()
  @IsString({ each: true })
  portfolio: string[];

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  documentNo: string;

  @IsDateString()
  issueDate: string;

  @IsDateString()
  expiryDate: string;

  @IsOptional()
  @IsString()
  certificate?: string;

  @IsEnum(ApproveStatus)
  status: ApproveStatus;

  @IsOptional()
  @IsString()
  rejectedRemark?: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsEmail()
  email: string;

  @IsString()
  tel: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  profile?: string;
}
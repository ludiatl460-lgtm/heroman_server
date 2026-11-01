import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JobDto } from "./dto/job.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JobService{
         constructor(private prisma: PrismaService){}

         async createJobService(dto: JobDto){
           try {
                 return await this.prisma.job.create({data: dto}); 
           } catch (error: any) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error", error)
           }
         }
         async updateJobService(id: string, dto: Partial<JobDto>){
           try {
                 return await this.prisma.job.update({where: {id: id}, data: dto}); 
           } catch (error: any) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error", error)
           }
         }
         async findAllJobService(){
           try {
                 return await this.prisma.job.findMany(); 
           } catch (error: any) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error", error)
           }
         }
         async findJobByIdService(id: string){
           try {
                 return await this.prisma.job.findUnique({where: {id: id}}); 
           } catch (error: any) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error", error)
           }
         }
         async deleteJobService(id: string){
           try {
                 return await this.prisma.job.delete({where: {id: id}}); 
           } catch (error: any) {
                  console.error(error);
                  throw new InternalServerErrorException("Server error", error)
           }
         }
}
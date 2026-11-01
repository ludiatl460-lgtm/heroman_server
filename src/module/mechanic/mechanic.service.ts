import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MechanicDto } from "./dto/mechnic.dto";

@Injectable()
export class MechanicService{
         constructor(private prisma: PrismaService){}

       async  createMechanicService(dto: MechanicDto){
         try {
            return await this.prisma.mechanic.create({data: dto});      
         } catch (error: any) {
            console.error(error);
            throw new InternalServerErrorException("Server error", error)
         }
       }

       async updateMechanicService(id:string, dto: Partial<MechanicDto>){
         try {
             return await this.prisma.mechanic.update({data: dto,where: {id: id}})  
         } catch (error: any) {
             console.error(error);
             throw new InternalServerErrorException("Server error", error);   
         }
       }

       async findAllMechanicService(){
         try {
              return await this.prisma.mechanic.findMany();    
         } catch (error: any) {
             console.error(error);
             throw new InternalServerErrorException("Server error", error);
         }
       }

       async findMechanicByIdService(id: string){
         try {
              return this.prisma.mechanic.findUnique({where: {id}});    
         } catch (error) {
              console.error(error);
             throw new InternalServerErrorException("Server error", error);  
         }
       }

       async deleteMechanicService(id: string){
         try {
               return this.prisma.mechanic.delete({where: {id}});   
         } catch (error) {
              console.error(error);
             throw new InternalServerErrorException("Server error", error);      
         }
       }
}
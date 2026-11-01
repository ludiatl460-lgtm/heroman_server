import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CustomerDto } from "./dto/customer.dto";

@Injectable()
export class CustomerService {
         constructor(private prisma: PrismaService){}
         async findAllCustomerService(){
           try {
                return await this.prisma.customer.findMany();  
           } catch (e: any) {
              console.error(e);
              throw new InternalServerErrorException("Server error", e)
           }
         }

         async findCustomerByIdService(id: string){
                  try {
                     return await this.prisma.customer.findUnique({where: {id: id}});   
                  } catch (error: any) {
                     console.error(error);
                     throw new InternalServerErrorException("Server error", error); 
                  }
         }
         async createCustomerService(dto: CustomerDto){
            try {
                  return await this.prisma.customer.create({data: dto});
            } catch (error: any) {
                  console.error();
                  throw new InternalServerErrorException("Server error", error);
            }
         }

         async updateCustomerService(id: string, dto: Partial<CustomerDto>){
             try {
                  return await this.prisma.customer.update({data: dto, where: {id: id}});
             } catch (error: any) {
                  console.error();
                  throw new InternalServerErrorException("Server error", error);
             }
         }

         async deleteCustomer(id: string) {
            try {
                  return await this.prisma.customer.delete({where: {id}});
            } catch (error: any) {
                  console.error();
                  throw new InternalServerErrorException("Server error", error);
            }
         }
}
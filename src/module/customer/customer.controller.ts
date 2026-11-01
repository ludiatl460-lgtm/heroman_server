import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDto } from "./dto/customer.dto";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAllCustomer(){
         return this.customerService.findAllCustomerService();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    findCustomerById(@Param("id") id: string){
         return this.customerService.findCustomerByIdService(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCustomer(@Body() dto: CustomerDto){
         return this.customerService.createCustomerService(dto);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    updateCustomer(@Param("id") id:string, @Body() dto: Partial<CustomerDto>){
         return this.customerService.updateCustomerService(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    deleteCustomer(@Param("id") id: string){
         return this.customerService.deleteCustomer(id);
    }
}
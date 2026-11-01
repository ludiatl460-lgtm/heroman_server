import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService){}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createAdmin(@Body() dto: AdminDto){
         return this.adminService.createAdminService(dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAllAdmin(){
         return this.adminService.findAllAdminService()
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    findAdminById(@Param("id") id: string){
         return this.adminService.findAdminById(id)
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    updateAdmin(@Param("id") id: string, @Body() dto: Partial<AdminDto>){
         return this.adminService.updateAdminService(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    deleteAdmin(@Param("id") id: string){
         return this.adminService.deleteAdminService(id);
    }
}
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { MechanicService } from "./mechanic.service";
import { MechanicDto } from "./dto/mechnic.dto";

@Controller("mechanic")
export class MechanicController{
         constructor(private readonly mechanicService: MechanicService){}

         @Post()
         @HttpCode(HttpStatus.CREATED)
         createMMechanic(@Body() dto: MechanicDto){
                  return this.mechanicService.createMechanicService(dto);
         }

         @Patch(":id")
         @HttpCode(HttpStatus.OK)
         updateMechanic(@Param("id") id:string, @Body() dto: Partial<MechanicDto>){
           return this.mechanicService.updateMechanicService(id, dto)
         }

         @Get()
         @HttpCode(HttpStatus.OK)
         findAllMechanic(){
                  return this.mechanicService.findAllMechanicService();
         }

         @Get(":id")
         @HttpCode(HttpStatus.OK)
         finndMechanicById(@Param("id") id: string){
                  return this.mechanicService.findMechanicByIdService(id);
         }

         @Delete(":id")
         @HttpCode(HttpStatus.OK)
         deleteMechanic(@Param("id") id: string){
            return this.mechanicService.deleteMechanicService(id);
         }
}
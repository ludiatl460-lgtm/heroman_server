import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobDto } from "./dto/job.dto";

@Controller("job")
export class JobController{
         constructor(private readonly jobService: JobService){}
         @Post()
         @HttpCode(HttpStatus.CREATED)
         createJob(@Body() dto: JobDto){
           return this.jobService.createJobService(dto);
         }
         @Patch(":id")
         @HttpCode(HttpStatus.OK)
         updateJob(@Param("id") id: string,@Body() dto: Partial<JobDto>){
           return this.jobService.updateJobService(id, dto);
         }

         @Get()
         @HttpCode(HttpStatus.OK)
         findAllJob(){
           return this.jobService.findAllJobService();
         }
         @Get(":id")
         @HttpCode(HttpStatus.OK)
         findJobById(@Param("id") id: string){
           return this.jobService.findJobByIdService(id);
         }
}
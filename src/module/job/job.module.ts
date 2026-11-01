import { Module } from "@nestjs/common";
import { JobController } from "./job.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JobService } from "./job.service";

@Module({
  controllers: [JobController],
  providers: [PrismaService, JobService]
})
export class JobModule{}
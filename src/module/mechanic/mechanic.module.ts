import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MechanicService } from "./mechanic.service";
import { MechanicController } from "./mechanic.controller";

@Module({
   controllers: [MechanicController],
   providers: [PrismaService, MechanicService]
})
export class MechanicModule{}
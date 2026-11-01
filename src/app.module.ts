import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './module/admin/admin.module';
import { CustomerModule } from './module/customer/customer.module';
import { MechanicModule } from './module/mechanic/mechanic.module';
import { JobModule } from './module/job/job.module';
import { UserModule } from './module/user/user.module';
import { BillModule } from './module/bill/bill.module';
import { AuthModule } from './module/auth/auth.module';
import { RolesGuard } from './module/auth/guards/roles.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    PrismaModule,
    AdminModule,
    CustomerModule,
    MechanicModule,
    JobModule,
    UserModule,
    BillModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule { }
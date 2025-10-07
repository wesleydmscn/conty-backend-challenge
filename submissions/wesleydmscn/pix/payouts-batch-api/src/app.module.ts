import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';

import { PayoutsModule } from './modules/payouts';

import { throttlers } from './config/throttlers';
import { bullmqConfig } from './config/bullmq';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlers),
    BullModule.forRoot(bullmqConfig),
    PayoutsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

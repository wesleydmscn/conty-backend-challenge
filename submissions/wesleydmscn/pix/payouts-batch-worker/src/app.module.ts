import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { PayoutsModule } from './modules/payouts';

import { bullmqConfig } from './config/bullmq';

@Module({
  imports: [BullModule.forRoot(bullmqConfig), PayoutsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

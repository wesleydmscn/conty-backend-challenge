import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { PayoutsController } from './controllers/payouts.controller';
import { PayoutsService } from './services/payouts.service';
import { RedisService } from './services/redis.service';

import { env } from 'src/config/env';

@Module({
  imports: [
    BullModule.registerQueue({
      name: env.bullmqQueueName,
    }),
  ],
  controllers: [PayoutsController],
  providers: [PayoutsService, RedisService],
  exports: [],
})
export class PayoutsModule {}

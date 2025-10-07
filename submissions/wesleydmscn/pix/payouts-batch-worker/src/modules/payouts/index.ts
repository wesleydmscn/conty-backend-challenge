import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import PayoutsProcessor from './processors/payouts.processor';

import { RedisService } from './services/redis.service';
import { WorkerService } from './services/worker.service';

import { env } from 'src/config/env';

@Module({
  imports: [
    BullModule.registerQueue({
      name: env.bullmqQueueName,
    }),
  ],
  providers: [WorkerService, PayoutsProcessor, RedisService],
})
export class PayoutsModule {}

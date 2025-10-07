import { Injectable, Logger } from '@nestjs/common';

import {
  PayoutItemRedis,
  PayoutBatchRedis,
  RedisService,
} from './redis.service';

import { PayoutItemStatus } from '../enums/payout-item-status';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(private readonly redisService: RedisService) {}

  async processBatch(batch: PayoutBatchRedis) {
    const batchWithStatus: PayoutBatchRedis = {
      batch_id: batch.batch_id,
      items: batch.items.map((item) => ({ ...item, status: 'pending' })),
    };

    await this.redisService.setBatch(batchWithStatus);

    for (const item of batch.items) {
      await this.processItem(batch.batch_id, item);
    }

    this.logger.log(`Batch ${batch.batch_id} processed`);
  }

  private async processItem(batchId: string, item: PayoutItemRedis) {
    const idempotencyKey = item.external_id;

    const locked = await this.redisService.acquireLock(idempotencyKey, 300);
    if (!locked) {
      this.logger.warn(
        `Payment ${item.external_id} already being processed by another worker, skipping`,
      );

      await this.redisService.updateItemStatus(
        batchId,
        item.external_id,
        'duplicate',
      );

      return;
    }

    const alreadyProcessed =
      await this.redisService.isExternalIdProcessed(idempotencyKey);

    if (alreadyProcessed) {
      this.logger.warn(
        `Payment ${item.external_id} already processed globally, skipping`,
      );

      await this.redisService.updateItemStatus(
        batchId,
        item.external_id,
        'duplicate',
      );

      return;
    }

    await this.redisService.updateItemStatus(
      batchId,
      item.external_id,
      'processing',
    );

    const delay = Math.floor(Math.random() * 1500) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const failed = Math.random() < 0.2;
    const finalStatus: PayoutItemStatus = failed ? 'failed' : 'paid';

    await this.redisService.updateItemStatus(
      batchId,
      item.external_id,
      finalStatus,
    );

    if (!failed) {
      await this.redisService.markExternalIdProcessed(idempotencyKey);
    }

    this.logger.log(
      failed
        ? `Item ${item.external_id} failed`
        : `Item ${item.external_id} processed`,
    );
  }
}

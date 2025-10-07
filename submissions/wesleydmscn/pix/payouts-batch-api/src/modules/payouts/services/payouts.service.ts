import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { RedisService } from './redis.service';

import { PayoutBatchDTO } from '../dtos/payout-batch';
import { PayoutBatchResponseDTO } from '../dtos/payout-batch-response';
import { PayoutItemStatusEnum } from '../enums/payout-item-status';

import { env } from 'src/config/env';

@Injectable()
export class PayoutsService {
  constructor(
    @InjectQueue(env.bullmqQueueName) private readonly payoutsQueue: Queue,
    private readonly redisService: RedisService,
  ) {}

  async createBatch(batchDto: PayoutBatchDTO): Promise<PayoutBatchResponseDTO> {
    await this.payoutsQueue.add('process-payout-batch', batchDto, {
      removeOnComplete: true,
      removeOnFail: false,
    });

    const response: PayoutBatchResponseDTO = {
      batch_id: batchDto.batch_id,
      processed: 0,
      successful: 0,
      failed: 0,
      duplicates: 0,
      details: batchDto.items.map((item) => ({
        external_id: item.external_id,
        status: PayoutItemStatusEnum.PENDING,
        amount_cents: item.amount_cents,
      })),
    };

    return response;
  }

  async getBatchById(batchId: string): Promise<PayoutBatchResponseDTO> {
    const batch = await this.redisService.getBatch(batchId);

    if (!batch) throw new NotFoundException('Payout batch not found');

    const details = batch.items.map((item) => ({
      external_id: item.external_id,
      status: item.status,
      amount_cents: item.amount_cents,
    }));

    return {
      batch_id: batch.batch_id,
      processed: details.length,
      successful: details.filter((i) => i.status === 'paid').length,
      failed: details.filter((i) => i.status === 'failed').length,
      duplicates: details.filter((i) => i.status === 'duplicate').length,
      details,
    };
  }
}

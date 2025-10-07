import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { PayoutItemStatus } from '../enums/payout-item-status';

import { env } from 'src/config/env';

export interface PayoutItemRedis {
  external_id: string;
  amount_cents: number;
  status: PayoutItemStatus;
}

export interface PayoutBatchRedis {
  batch_id: string;
  items: PayoutItemRedis[];
}

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: env.redisHost,
      port: env.redisPort,
      password: env.redisPassword,
    });
  }

  async setBatch(batch: PayoutBatchRedis) {
    await this.client.set(`batch:${batch.batch_id}`, JSON.stringify(batch));
  }

  async getBatch(batchId: string) {
    const data = await this.client.get(`batch:${batchId}`);
    if (!data) return null;
    return JSON.parse(data) as PayoutBatchRedis;
  }

  async updateItemStatus(
    batchId: string,
    externalId: string,
    status: PayoutItemRedis['status'],
  ) {
    const batch = await this.getBatch(batchId);
    if (!batch) return;

    batch.items = batch.items.map((item) =>
      item.external_id === externalId ? { ...item, status } : item,
    );

    await this.setBatch(batch);
  }

  async markExternalIdProcessed(externalId: string) {
    await this.client.set(`processed:${externalId}`, '1');
  }

  async isExternalIdProcessed(externalId: string): Promise<boolean> {
    const exists = await this.client.exists(`processed:${externalId}`);
    return exists === 1;
  }

  async acquireLock(externalId: string, ttlSeconds = 300): Promise<boolean> {
    const result = await this.client.set(
      `lock:${externalId}`,
      '1',
      'EX',
      ttlSeconds,
      'NX',
    );
    return result === 'OK';
  }

  async releaseLock(externalId: string) {
    await this.client.del(`lock:${externalId}`);
  }
}

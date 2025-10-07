import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { env } from 'src/config/env';

import { PayoutItemStatus } from '../enums/payout-item-status';

interface PayoutItemRedis {
  external_id: string;
  amount_cents: number;
  status: PayoutItemStatus;
}

interface PayoutBatchRedis {
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
    });
  }

  async getBatch(batchId: string) {
    const data = await this.client.get(`batch:${batchId}`);
    if (!data) return null;
    return JSON.parse(data) as PayoutBatchRedis;
  }
}

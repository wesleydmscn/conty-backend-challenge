import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { WorkerService } from '../services/worker.service';
import { PayoutBatchRedis } from '../services/redis.service';

@Processor('payouts')
export default class PayoutsProcessor extends WorkerHost {
  constructor(private readonly workerService: WorkerService) {
    super();
  }

  async process(job: Job<PayoutBatchRedis>): Promise<void> {
    await this.workerService.processBatch(job.data);
  }
}

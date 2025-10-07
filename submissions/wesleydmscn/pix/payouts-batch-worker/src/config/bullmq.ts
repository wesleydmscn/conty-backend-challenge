import { BullRootModuleOptions } from '@nestjs/bullmq';

import { env } from './env';

export const bullmqConfig: BullRootModuleOptions = {
  connection: {
    host: env.redisHost,
    port: env.redisPort,
  },
};

import { ThrottlerOptions } from '@nestjs/throttler';

export const throttlers: ThrottlerOptions[] = [
  {
    name: 'medium',
    ttl: 10000,
    limit: 20,
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 100,
  },
];

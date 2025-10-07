import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  redisHost: string;

  @IsInt()
  @Min(1)
  redisPort: number;

  @IsString()
  redisPassword: string;

  @IsString()
  @IsNotEmpty()
  bullmqQueueName: string;
}

export const env: Env = plainToInstance(Env, {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
    ? Number(process.env.REDIS_PORT)
    : undefined,
  redisPassword: process.env.REDIS_PASSWORD || '',
  bullmqQueueName: process.env.BULLMQ_QUEUE_NAME,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(errors, null, 2)}`,
  );
}

export enum PayoutItemStatusEnum {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'paid',
  FAILED = 'failed',
  DUPLICATE = 'duplicate',
}

export type PayoutItemStatus = `${PayoutItemStatusEnum}`;

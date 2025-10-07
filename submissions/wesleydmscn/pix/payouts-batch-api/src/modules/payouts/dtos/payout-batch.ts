import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PayoutItemDTO } from './payout-item';

export class PayoutBatchDTO {
  @ApiProperty({ description: 'Batch identifier', example: '2025-10-05-A' })
  @IsString()
  batch_id: string;

  @ApiProperty({
    description: 'List of payout items',
    type: [PayoutItemDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PayoutItemDTO)
  items: PayoutItemDTO[];
}

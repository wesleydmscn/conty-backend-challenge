import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PayoutItemResponseDTO } from './payout-item-response';

export class PayoutBatchResponseDTO {
  @ApiProperty({ description: 'Batch identifier', example: '2025-10-05-A' })
  @IsString()
  batch_id: string;

  @ApiProperty({ description: 'Number of processed payouts', example: 2 })
  @IsInt()
  processed: number;

  @ApiProperty({ description: 'Number of successful payouts', example: 2 })
  @IsInt()
  successful: number;

  @ApiProperty({ description: 'Number of failed payouts', example: 0 })
  @IsInt()
  failed: number;

  @ApiProperty({ description: 'Number of duplicate payouts', example: 0 })
  @IsInt()
  duplicates: number;

  @ApiProperty({
    description: 'Detailed payout items',
    type: [PayoutItemResponseDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PayoutItemResponseDTO)
  details: PayoutItemResponseDTO[];
}

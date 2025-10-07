import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class PayoutItemResponseDTO {
  @ApiProperty({
    description: 'External identifier for the payout',
    example: 'u1-001',
  })
  @IsString()
  external_id: string;

  @ApiProperty({ description: 'Status of the payout', example: 'paid' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Payment amount in cents', example: 35000 })
  @IsInt()
  amount_cents: number;
}

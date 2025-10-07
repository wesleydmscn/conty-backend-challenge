import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class PayoutItemDTO {
  @ApiProperty({
    description: 'External identifier for the payout',
    example: 'u1-001',
  })
  @IsString()
  external_id: string;

  @ApiProperty({ description: 'User ID', example: 'u1' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: 'Payment amount in cents', example: 35000 })
  @IsInt()
  amount_cents: number;

  @ApiProperty({ description: 'User PIX key', example: 'u1@email.com' })
  @IsString()
  pix_key: string;
}

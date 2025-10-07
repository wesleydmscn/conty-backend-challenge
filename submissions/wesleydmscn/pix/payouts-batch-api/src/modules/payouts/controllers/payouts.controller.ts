import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PayoutsService } from '../services/payouts.service';

import { PayoutBatchDTO } from '../dtos/payout-batch';
import { PayoutBatchResponseDTO } from '../dtos/payout-batch-response';

@ApiTags('Payouts')
@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payout batch' })
  @ApiResponse({
    status: 201,
    description: 'The payout batch has been successfully created.',
    type: PayoutBatchResponseDTO,
  })
  create(@Body() body: PayoutBatchDTO): Promise<PayoutBatchResponseDTO> {
    return this.payoutsService.createBatch(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payout batch by ID' })
  @ApiResponse({
    status: 200,
    description: 'The payout batch was successfully retrieved.',
    type: PayoutBatchResponseDTO,
  })
  @ApiResponse({ status: 404, description: 'Payout batch not found.' })
  findOne(@Param('id') batchId: string): Promise<PayoutBatchResponseDTO> {
    return this.payoutsService.getBatchById(batchId);
  }
}

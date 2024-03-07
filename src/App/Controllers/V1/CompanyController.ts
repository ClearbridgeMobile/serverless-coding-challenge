import {Controller, Get, Request} from '@nestjs/common';
import {ApiOperation, ApiSecurity, ApiTags} from '@nestjs/swagger';
import {EntityTransactionService} from 'Core/Database/entity-transaction.service';
import BaseController from './BaseController';

@Controller('subscriptions')
@ApiTags('Subscriptions')
@ApiSecurity('Bearer Authentication')
export default class CompanyController extends BaseController {
  constructor(private transaction: EntityTransactionService) {
    super();
  }

  @Get('/plans')
  @ApiOperation({
    summary: 'List subscription plans',
  })
  async listPlans(@Request() req: any) {
  }
}

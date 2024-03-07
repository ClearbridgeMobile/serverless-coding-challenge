import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {EntityTransactionService} from 'Core/Database/entity-transaction.service';
import BaseController from './BaseController';
import {CompanyFounderDto} from "App/Dto/FounderDto";
import FounderService from "Domain/Founder/FounderService";

@Controller('founder')
@ApiTags('Founder')
export default class FounderController extends BaseController {
  constructor(private transaction: EntityTransactionService, private founderService: FounderService){
    super();
  }

  @Post('/')
  @ApiOperation({
    summary: 'create founder',
  })
  async createCompany(@Body() body: CompanyFounderDto) {
    return this.responseOk({
      data: await this.founderService.createFounder(body)
    })
  }
}

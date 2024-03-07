import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {EntityTransactionService} from 'Core/Database/entity-transaction.service';
import BaseController from './BaseController';
import {CompanyCreationDto, CompanyIdParamDto} from "App/Dto/CompanyDto";
import CompanyService from "Domain/Company/CompanyService";

@Controller('company')
@ApiTags('Company')
export default class CompanyController extends BaseController {
  constructor(private transaction: EntityTransactionService, private companyService: CompanyService){
    super();
  }

  @Get('/')
  @ApiOperation({
    summary: 'List companies',
  })
  async listCompanies() {
    return this.companyService.listCompanies();
  }

  @Post('/')
  @ApiOperation({
    summary: 'create company',
  })
  async createCompany(@Body() body: CompanyCreationDto) {
    return this.companyService.createCompany(body);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'update company',
  })
  async updateCompany(@Body() body: CompanyCreationDto, @Param() param: CompanyIdParamDto) {
    return this.companyService.updateCompany(body, Number(param.id));
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get company by id',
  })
  async getCompany(@Param() param: CompanyIdParamDto) {
    return this.companyService.getCompany(Number(param.id));
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete company by id',
  })
  async deleteCompany(@Param() param: CompanyIdParamDto) {
    return this.companyService.deleteCompany(Number(param.id));
  }
}

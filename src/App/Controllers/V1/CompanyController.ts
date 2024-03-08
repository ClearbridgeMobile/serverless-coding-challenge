import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import BaseController from './BaseController';
import { CompanyCreationDto, CompanyIdParamDto } from 'App/Dto/CompanyDto';
import CompanyService from 'Domain/Company/CompanyService';

@Controller('company')
@ApiTags('Company')
export default class CompanyController extends BaseController {
  constructor(private companyService: CompanyService) {
    super();
  }

  @Get('/')
  @ApiOperation({
    summary: 'List companies',
  })
  async listCompanies() {
    return this.responseOk({
      data: await this.companyService.listCompanies(),
    });
  }

  @Post('/')
  @ApiOperation({
    summary: 'create company',
  })
  async createCompany(@Body() body: CompanyCreationDto) {
    return this.responseOk({
      data: await this.companyService.createCompany(body),
    });
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'update company',
  })
  async updateCompany(
    @Body() body: CompanyCreationDto,
    @Param() param: CompanyIdParamDto,
  ) {
    await this.companyService.updateCompany(body, Number(param.id));
    return this.responseOk({
      message: 'Company updated successfully',
    });
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get company by id',
  })
  async getCompany(@Param() param: CompanyIdParamDto) {
    return this.responseOk({
      data: await this.companyService.getCompany(Number(param.id)),
    });
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete company by id',
  })
  async deleteCompany(@Param() param: CompanyIdParamDto) {
    await this.companyService.deleteCompany(Number(param.id));
    return this.responseOk({
      message: 'Company deleted successfully',
    });
  }
}

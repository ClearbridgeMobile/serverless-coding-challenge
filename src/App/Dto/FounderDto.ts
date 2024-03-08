import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {CompanyExists} from "Core/Decorators/Validations/Company/company-exists.decorator";

export class CompanyFounderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  @CompanyExists()
  companyId: number;
}

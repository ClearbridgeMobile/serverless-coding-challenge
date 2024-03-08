import {ApiProperty} from '@nestjs/swagger';
import {CompanyNameExists} from 'Core/Decorators/Validations/Company/company-name-exists.decorator';
import {IsString} from 'class-validator';

export class CompanyCreationDto {
  @ApiProperty()
  @IsString()
  @CompanyNameExists()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  foundedDate: string;
}

export class CompanyIdParamDto {
  @ApiProperty()
  @IsString()
  id: string;
}

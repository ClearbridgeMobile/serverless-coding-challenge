import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {BaseRepository} from 'Core/Database/Repositories/BaseRepository';
import Company from "Core/Database/Models/Company";

@Injectable()
export class CompanyRepository extends BaseRepository {
  constructor(
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
  ) {
    super(companyModel);
  }
}

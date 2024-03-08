import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'Core/Database/Repositories/BaseRepository';
import Company from 'Core/Database/Models/Company';
import Founder from 'Core/Database/Models/Founder';
interface ICreateCompany {
  name: string;
  description: string;
  city: string;
  state: string;
  foundedDate: string;
}
@Injectable()
export class CompanyRepository extends BaseRepository {
  constructor(
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
  ) {
    super(companyModel);
  }

  async createCompany(data: ICreateCompany): Promise<Company> {
    return this.companyModel.create(data as any);
  }

  async updateCompany(
    id: number,
    data: ICreateCompany,
  ): Promise<[affectedCount: number]> {
    return this.companyModel.update(data as any, {
      where: {
        id,
      },
    });
  }

  async deleteCompany(id: number): Promise<number> {
    return this.companyModel.destroy({
      where: {
        id,
      },
    });
  }

  async getCompany(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id, {
      include: [Founder],
    });
  }

  async listCompanies(): Promise<Company[]> {
    return this.companyModel.findAll({
      include: [Founder],
    });
  }

  async findCompanyBySlug(slug: string): Promise<Company | null> {
    return this.companyModel.findOne({
      where: {
        slug,
      },
    });
  }
}

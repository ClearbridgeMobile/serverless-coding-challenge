import {Injectable} from '@nestjs/common';
import {CompanyRepository} from "Core/Database/Repositories/CompanyRepository";
import {CompanyCreationDto} from "App/Dto/CompanyDto";
import Company from "Core/Database/Models/Company";

@Injectable()
export default class CompanyService {
  constructor(
      private companyRepository: CompanyRepository,
  ) {}

  async createCompany(data: CompanyCreationDto) {
    return this.companyRepository.createCompany(data);
  }

  async updateCompany(data: CompanyCreationDto, id: number) {
    return this.companyRepository.updateCompany(id, data);
  }

  async deleteCompany(id: number) {
    return this.companyRepository.deleteCompany(id);
  }

  async getCompany(id: number): Promise<Company> {
    return this.companyRepository.getCompany(id);
  }

  async listCompanies(): Promise<Company[]> {
    return this.companyRepository.listCompanies();
  }
}

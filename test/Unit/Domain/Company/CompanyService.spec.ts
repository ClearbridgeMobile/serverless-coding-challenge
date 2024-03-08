import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { CompanyRepository } from 'Core/Database/Repositories/CompanyRepository';
import { DatabaseModule } from 'Core/Database/database.module';
import CompanyService from 'Domain/Company/CompanyService';
import { CompanyCreationDto } from 'App/Dto/CompanyDto';
import Company from 'Core/Database/Models/Company';

describe('UserService Unit Test', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();
  });

  const baseSetup = () => {
    const companyRepo = sinon.createStubInstance(CompanyRepository);

    const companyService = new CompanyService(companyRepo);
    return {
      companyRepo,
      companyService,
    };
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('Test CompanyService Methods', () => {
    it('Should return create company', async () => {
      const { companyRepo, companyService } = baseSetup();
      const data = {
        name: 'Abba Holdings',
        description: 'Test Company',
        state: 'Saskatchewan',
        city: 'Regina',
      } as CompanyCreationDto;
      const company = Company.build({
        id: 1,
        ...data,
      });
      companyRepo.createCompany.withArgs(data).resolves(company);
      const result = await companyService.createCompany(data);
      expect(result).toEqual(company);
    });

    it('Should list companies', async () => {
      const { companyRepo, companyService } = baseSetup();
      const data = {
        name: 'Abba Holdings',
        description: 'Test Company',
        state: 'Saskatchewan',
        city: 'Regina',
      } as CompanyCreationDto;
      const company = Company.build({
        id: 1,
        ...data,
      });
      companyRepo.listCompanies.withArgs().resolves([company]);
      const result = await companyService.listCompanies();
      expect(result).toEqual([company]);
    });
  });
});

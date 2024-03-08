import {Injectable} from '@nestjs/common';
import {FounderRepository} from "Core/Database/Repositories/FounderRepository";
import Founder from "Core/Database/Models/Founder";
import {CompanyFounderDto} from "App/Dto/FounderDto";

@Injectable()
export default class FounderService {
  constructor(private founderRepo: FounderRepository) {}

  async createFounder(data: CompanyFounderDto): Promise<Founder> {
    return this.founderRepo.createFounder(data);
  }
}

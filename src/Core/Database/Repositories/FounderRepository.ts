import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {BaseRepository} from 'Core/Database/Repositories/BaseRepository';
import Founder from "Core/Database/Models/Founder";

interface ICreateFounder {
    name: string;
    title: string;
    companyId: number;
}

@Injectable()
export class FounderRepository extends BaseRepository {
  constructor(
    @InjectModel(Founder)
    private readonly founderModel: typeof Founder,
  ) {
    super(founderModel);
  }

  async createFounder(data: ICreateFounder) {
    return this.founderModel.create(data as any);
  }
}

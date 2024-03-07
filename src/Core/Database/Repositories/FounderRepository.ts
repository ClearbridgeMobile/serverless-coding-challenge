import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {BaseRepository} from 'Core/Database/Repositories/BaseRepository';
import Founder from "Core/Database/Models/Founder";

@Injectable()
export class FounderRepository extends BaseRepository {
  constructor(
    @InjectModel(Founder)
    private readonly founderModel: typeof Founder,
  ) {
    super(founderModel);
  }
}

import {Expose} from 'class-transformer';
import {AutoIncrement, BeforeCreate, Column, HasMany, PrimaryKey, Table,} from 'sequelize-typescript';

import BaseModel from './BaseModel';
import Founder from "Core/Database/Models/Founder";

import slugify from 'slugify';

@Table({ tableName: 'companies' })
export default class Company extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Expose()
  id: number;


  @Expose()
  @Column
  name: string;

  @Expose()
  @Column
  description?: string;

  @Expose()
  @Column
  city: string;

  @Expose()
  @Column
  state: string;

  @Expose()
  @Column
  slug: string;

  @Expose()
  @Column({ allowNull: true })
  foundedDate: Date;

  @HasMany(() => Founder, { as: 'founders' })
  founders?: Founder[];

  @BeforeCreate
  static slugifyCompanyName(company: Company) {
    company.slug = slugify(company.name, {
      lower: true,
    });
  }


}

import Company from 'Core/Database/Models/Company';
import {Expose} from 'class-transformer';
import {AutoIncrement, BelongsTo, Column, PrimaryKey, Table,} from 'sequelize-typescript';

import BaseModel from './BaseModel';

@Table({ tableName: 'founders' })
export default class Founder extends BaseModel {
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
  founded_date: Date;

  @BelongsTo(() => Company, { as: 'company' })
  company?: Company;

}

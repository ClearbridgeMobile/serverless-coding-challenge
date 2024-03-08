import Company from 'Core/Database/Models/Company';
import {Expose} from 'class-transformer';
import {AutoIncrement, BelongsTo, Column, ForeignKey, PrimaryKey, Table,} from 'sequelize-typescript';

import BaseModel from './BaseModel';

@Table({ tableName: 'founders' })
export default class Founder extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Expose()
  id: number;

  @Column
  @ForeignKey(() => Company)
  companyId: number;

  @Expose()
  @Column
  name: string;

  @Expose()
  @Column
  title?: string;

  @BelongsTo(() => Company, { as: 'company' })
  company?: Company;
}

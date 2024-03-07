import {Expose} from 'class-transformer';
import {AutoIncrement, Column, HasMany, PrimaryKey, Table,} from 'sequelize-typescript';

import BaseModel from './BaseModel';
import Founder from "Core/Database/Models/Founder";

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
  founded_date: Date;

  @HasMany(() => Founder, { as: 'founders' })
  founders?: Founder[];

}

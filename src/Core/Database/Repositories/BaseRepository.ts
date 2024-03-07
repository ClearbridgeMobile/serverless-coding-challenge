import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { GeneralError, GeneralErrorCode } from 'Core/Error/Catalog';
import { Model } from 'sequelize-typescript';
import { Includeable } from 'sequelize/types/model';
import { Transaction } from 'sequelize/types/transaction';

@Injectable()
export class BaseRepository {
  constructor(private model: typeof Model) {}

  getModelInstance() {
    return this.model as any;
  }

  async getAll<T>({ transaction, includeables }: { transaction?: Transaction; includeables?: Includeable[] }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await this.model.findAll({
      transaction,
      include: includeables,
    });
    return result as unknown as T[];
  }

  async findById<T>({
    id,
    includeables = [],
    transaction,
  }: {
    id: string | number;
    includeables?: Includeable[];
    transaction?: Transaction;
  }): Promise<T | null> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await this.model.findByPk(id, {
      include: includeables,
      transaction,
    });

    if (result) {
      return result as unknown as T;
    }
    return null;
  }

  async findOrFailById<T>({
    id,
    includeables = [],
    transaction,
    exception,
  }: {
    id: string | number;
    includeables?: Includeable[];
    transaction?: Transaction;
    exception?: HttpException;
  }): Promise<T> {
    const result = await this.findById<T>({ id, includeables, transaction });
    if (!result) {
      if (exception) {
        throw exception;
      } else {
        throw new NotFoundException({
          requestedId: id,
          ...GeneralError[GeneralErrorCode.RESOURCE_DOES_NOT_EXIST],
        });
      }
    }
    return result as unknown as T;
  }
}

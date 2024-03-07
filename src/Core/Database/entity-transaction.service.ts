import { Injectable } from '@nestjs/common';
import { TxContainer } from 'Core/Database/TxContainer';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types/transaction';

export interface EntityTransactionProvider {
  createTransaction(existingTransaction?: Transaction): Promise<Transaction>;
}

@Injectable()
export class EntityTransactionService implements EntityTransactionProvider {
  constructor(private readonly sequelizeInstance: Sequelize) {}

  createTxContainer(): TxContainer {
    return TxContainer.make(this);
  }

  async createTransaction(baseTransaction?: Transaction): Promise<Transaction> {
    return this.sequelizeInstance.transaction({ transaction: baseTransaction });
  }
}

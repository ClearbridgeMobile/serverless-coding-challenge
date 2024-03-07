/**
 * Transaction container
 */
import { Transaction } from 'sequelize/types/transaction';
import { EntityTransactionProvider } from 'Core/Database/entity-transaction.service';
import { InternalServerErrorException } from '@nestjs/common';

/**
 * A transaction "container" to be used for executing use cases across one or more service boundaries.
 * This will allow services and interactors to enforce transactional integrity without knowing the details
 * of the transactions themselves.
 */
export class TxContainer {
  private level = -1;
  private transactions = [];

  constructor(private readonly transactionProvider: EntityTransactionProvider) {}

  static make(transactionProvider: EntityTransactionProvider): TxContainer {
    return new TxContainer(transactionProvider);
  }

  async transaction(): Promise<Transaction> {
    const baseTransaction = this.getBaseTransaction();
    // Sequelize can keep track of "SAVEPOINTS" if we pass the FIRST transaction instance (i.e. the transaction object that has no parent).
    const newTransaction = await this.transactionProvider.createTransaction(baseTransaction);
    this.level++;
    this.transactions.push(newTransaction);

    return newTransaction;
  }

  async commit() {
    const currentTransaction = this.getTransactionAtCurrentLevel();
    if (!currentTransaction) {
      throw new InternalServerErrorException({
        message: 'Bad TxContainer container state. Attempting to commit an undefined transaction',
      });
    }

    // Savepoints cannot be committed, so we only commit if we are at level 0.
    if (this.getCurrentLevel() === 0) {
      await currentTransaction.commit();
    }

    this.level--;
    this.transactions.pop();
  }

  async rollback() {
    const currentTransaction = this.getTransactionAtCurrentLevel();
    if (!currentTransaction) {
      throw new InternalServerErrorException({
        message: 'Bad TxContainer container state. Attempting to rollback an undefined transaction',
      });
    }

    await currentTransaction.rollback();
    this.level--;
    this.transactions.pop();
  }

  getCurrentLevel(): number {
    return this.level;
  }

  /**
   *
   */
  getCurrentTransaction(): Transaction | undefined {
    return this.getTransactionAtCurrentLevel();
  }

  /**
   * Please make sure to not commit or rollback the transaction provided by this function when invoking
   * your executionFn function. Let the method handle it for you.
   * @param executionFn
   */
  async executeInTransaction<T>(executionFn: (tx: Transaction) => Promise<any>): Promise<T> {
    await this.transaction();

    try {
      const result: T = await executionFn(this.getCurrentTransaction());
      await this.commit();
      return result;
    } catch (e) {
      await this.rollback();
      throw e;
    }
  }

  /**
   *
   */
  getTotalTransactions(): number {
    return this.transactions.length;
  }

  /**
   *
   * @private
   */
  private getBaseTransaction(): Transaction | undefined {
    if (this.level < 0) {
      return undefined;
    }
    return this.transactions[0];
  }

  private getTransactionAtCurrentLevel(): Transaction | undefined {
    if (this.level < 0) {
      return undefined;
    }

    return this.transactions[this.level];
  }
}

export enum OperationType {
  Income = 'Income',
  Expense = 'Expense',
}

export type NewTransactionType = {
  amount: number;
  comment: string;
  operationType: OperationType;

  index: number;
};

export type TransactionType = {
  amount: number;
  comment: string;
  operationType: OperationType;

  indexTransaction: number;
  cardIndex: number;
};

export type TransactionsMappedType = { [cardId: string]: TransactionType[] };

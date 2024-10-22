export type TransactionType = 'deposit' | 'withdrawal';

export type TransactionRecord = {
  id: string;
  startingBalance: number;
  type: TransactionType;
  amount: number;
  newBalance: number;
  created: number;
};

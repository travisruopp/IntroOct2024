export type TransactionRecord = {
  id: string;
  startingBalance: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  newBalance: number;
};

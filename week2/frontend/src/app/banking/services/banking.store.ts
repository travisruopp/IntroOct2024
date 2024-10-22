import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { TransactionRecord, TransactionType } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const BankingStore = signalStore(
  withDevtools('banking-store'),
  withState({ balance: 0 }),
  withEntities<TransactionRecord>(),
  withMethods((store) => {
    return {
      deposit(amount: number) {
        const newTransaction = createTransactionRecord(
          amount,
          store.balance(),
          'deposit'
        );
        patchState(
          store,
          { balance: store.balance() + amount },
          addEntity(newTransaction)
        );
      },
      withdraw(amount: number) {
        const newTransaction = createTransactionRecord(
          amount,
          store.balance(),
          'withdrawal'
        );
        patchState(
          store,
          { balance: store.balance() - amount },
          addEntity(newTransaction)
        );
      },
    };
  }),
  withComputed((store) => {
    return {
      isGoldAccount: computed(() => store.balance() >= 5000),
      amountNeededToBeGold: computed(() => 5000 - store.balance()),
      sortedTransactionHistory: computed(() =>
        store.entities().sort((a, b) => b.created - a.created)
      ),
    };
  })
);

function createTransactionRecord(
  amount: number,
  startingBalance: number,
  txType: TransactionType
): TransactionRecord {
  return {
    id: crypto.randomUUID(),
    amount,
    startingBalance: startingBalance,
    newBalance:
      txType === 'deposit'
        ? startingBalance + amount
        : startingBalance - amount,
    type: txType,
    created: Date.now(),
  };
}

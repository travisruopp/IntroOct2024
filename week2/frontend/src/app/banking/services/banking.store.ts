import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntities, addEntity, withEntities } from '@ngrx/signals/entities';
import { TransactionRecord, TransactionType } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { BankDataService } from './bank-data.service';

export const BankingStore = signalStore(
  withDevtools('banking-store'),
  withState({ balance: 0 }),
  withEntities<TransactionRecord>(),
  withMethods((store) => {
    const service = inject(BankDataService);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.getCurrentBankStatement().pipe(
              tap((r) => {
                const b = r[0].newBalance;
                patchState(store, { balance: b }, addEntities(r));
              })
            )
          )
        )
      ),
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
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
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

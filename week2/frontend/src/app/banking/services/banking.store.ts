import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { TransactionRecord, TransactionType } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { BankDataService } from './bank-data.service';
import { tapResponse } from '@ngrx/operators';
export const BankingStore = signalStore(
  withDevtools('banking-store'),
  withState({ balance: 0, loaded: false }),
  withEntities({
    collection: '_settledTransactions',
    entity: type<TransactionRecord>(),
  }),
  withEntities({
    collection: '_pendingTransactions',
    entity: type<TransactionRecord>(),
  }),
  withMethods((store) => {
    const service = inject(BankDataService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loaded: false })),
          switchMap(() =>
            service.getCurrentBankStatement().pipe(
              tap((r) => {
                const b = r[0].newBalance;
                patchState(
                  store,
                  { balance: b, loaded: true },
                  addEntities(r, { collection: '_settledTransactions' })
                );
              })
            )
          )
        )
      ),
      // deposit(amount: number) {
      //   const newTransaction = createTransactionRecord(
      //     amount,
      //     store.balance(),
      //     'deposit'
      //   );
      //   patchState(
      //     store,
      //     { balance: store.balance() + amount },
      //     addEntity(newTransaction)
      //   );
      // },
      deposit: rxMethod<number>(
        pipe(
          map((amount) => {
            const newPendingTransaction = createTransactionRecord(
              amount,
              store.balance(),
              'deposit'
            );
            patchState(
              store,
              addEntity(newPendingTransaction, {
                collection: '_pendingTransactions',
              })
            );
            return [amount, newPendingTransaction.id] as [number, string];
          }),
          mergeMap(([amount, pendingId]) =>
            service.addDeposit(amount, pendingId).pipe(
              tapResponse({
                next: (r) => {
                  const pendingTransaction =
                    store._pendingTransactionsEntityMap()[r.temporaryId];
                  const newRealTransaction = {
                    ...pendingTransaction,
                    ...r.result,
                  };

                  patchState(
                    store,
                    removeEntity(r.temporaryId, {
                      collection: '_pendingTransactions',
                    }),
                    addEntity(newRealTransaction, {
                      collection: '_settledTransactions',
                    })
                  );
                },
                error: (e) =>
                  patchState(
                    store,
                    removeEntity(pendingId, {
                      collection: '_pendingTransactions',
                    })
                  ),
              })
            )
          )
        )
      ),
      withdraw(amount: number) {
        const newTransaction = createTransactionRecord(
          amount,
          store.balance(),
          'withdrawal'
        );
        patchState(
          store,
          { balance: store.balance() - amount },
          addEntity(newTransaction, { collection: '_settledTransactions' })
        );
      },
    };
  }),
  withComputed((store) => {
    return {
      hasPendingTransactions: computed(
        () => store._pendingTransactionsIds().length > 0
      ),
      isGoldAccount: computed(() => store.balance() >= 5000),
      amountNeededToBeGold: computed(() => 5000 - store.balance()),
      sortedTransactionHistory: computed(() => {
        const pendingTransactions = store
          ._pendingTransactionsEntities()
          .map((t) => ({ ...t, pending: true }));
        const realTransactions = store
          ._settledTransactionsEntities()
          .map((t) => ({ ...t, pending: false }));
        const allOfThem = [...pendingTransactions, ...realTransactions];
        return allOfThem.sort((a, b) => b.created - a.created);
      }),
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

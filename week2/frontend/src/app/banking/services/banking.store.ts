import { computed } from '@angular/core';
import { withNoHttpTransferCache } from '@angular/platform-browser';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const BankingStore = signalStore(
  withState({ balance: 5229 }),
  withMethods((store) => {
    return {
      deposit(amount: number) {
        patchState(store, { balance: store.balance() + amount });
      },
      withdraw(amount: number) {
        patchState(store, { balance: store.balance() - amount });
      },
    };
  }),
  withComputed((store) => {
    return {
      isGoldAccount: computed(() => store.balance() >= 5000),
      amountNeededToBeGold: computed(() => 5000 - store.balance()),
    };
  })
);

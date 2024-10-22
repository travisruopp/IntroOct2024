import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { TransactionHistoryComponent } from './components/transaction-history.component';
import { TransactionRecord } from './types';
import { CurrencyPipe } from '@angular/common';
import { BankingSuccessNotificationComponent } from './components/banking-success-notification.component';
import { BankingTransactionInputComponent } from './components/banking-transaction-input.component';
import { RouterOutlet } from '@angular/router';
import { BankingNavComponent } from './components/banking-nav-component';
import { BankingStore } from './services/banking.store';

@Component({
  selector: 'app-banking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TransactionHistoryComponent,
    BankingSuccessNotificationComponent,
    BankingTransactionInputComponent,
    RouterOutlet,
    BankingNavComponent,
  ],
  template: `
    <app-banking-nav />
    <div>
      <p>Your Balance is {{ store.balance() }}</p>
      @if(store.isGoldAccount()){
      <app-banking-success-notification
        message="You are a Gold Account! You'll get a BONUS on your next deposit!"
      />
      } @else {
      <div role="alert" class="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          >If you deposit {{ store.amountNeededToBeGold() }} you will be a gold
          account!</span
        >
      </div>
      }

      <div>
        <app-banking-transaction-input
          label="Deposit"
          (transaction)="store.deposit($event)"
        />
        <app-banking-transaction-input
          label="Withdraw"
          (transaction)="store.withdraw($event)"
        />
      </div>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class BankingComponent {
  store = inject(BankingStore);

  // history = signal<TransactionRecord[]>([]);

  // goldAccountCutoff = signal(5000);
  // isGoldAccount = computed(() => this.balance() >= this.goldAccountCutoff());
  // moneyTillGoldAccount = computed(() => 5000 - this.balance());
  // deposit(amount: number) {
  //   const newTransaction: TransactionRecord = {
  //     id: crypto.randomUUID(),
  //     amount: amount,
  //     startingBalance: this.balance(),
  //     newBalance: this.balance() + amount,
  //     type: 'deposit',
  //   };
  //   this.history.set([newTransaction, ...this.history()]);
  //   this.store.deposit(amount);
  // }

  // withdraw(amount: number) {
  //   const newTransaction: TransactionRecord = {
  //     id: crypto.randomUUID(),
  //     amount: amount,
  //     startingBalance: this.balance(),
  //     newBalance: this.balance() - amount,
  //     type: 'withdrawal',
  //   };
  //   this.history.set([newTransaction, ...this.history()]);
  //   this.store.withdraw(amount);
  // }
}

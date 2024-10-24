import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BankingNavComponent } from './components/banking-nav.component';
import { BankingSuccessNotificationComponent } from './components/banking-success-notification.component';
import { BankingTransactionInputComponent } from './components/banking-transaction-input.component';
import { TransactionHistoryComponent } from './components/transaction-history.component';
import { BankingStore } from './services/banking.store';

// id, starting balance , type (deposit | withdraw), amount, new balance

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
    RouterLink,
    CurrencyPipe,
  ],
  template: `
    <app-banking-nav />
    @if(store.hasError()) {
    <div role="alert" class="alert alert-error">
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Error! Task failed successfully.</span>
    </div>
    } @if(store.loaded()) {
    <div>
      <p>
        Your Balance is {{ store.balance() | currency }}
        @if(store.hasPendingTransactions()) {
        <small>Note: Some transactions are pending, yo.</small>
        }
      </p>

      <div class="p-12">
        <a routerLink="deposit" class="m-8 btn btn-lg btn-success"
          >Make a Deposit</a
        >
        @if(store.balance() === 0){
        <p>You got no money!</p>
        } @else {
        <a routerLink="withdrawal" class="m-8 btn btn-lg btn-success"
          >Make a Withdrawal</a
        >
        }
      </div>
      <router-outlet />
    </div>
    } @else {
    <span class="loading loading-bars loading-lg"></span>
    }
  `,
  styles: ``,
})
export class BankingComponent {
  store = inject(BankingStore);

  constructor() {}
}

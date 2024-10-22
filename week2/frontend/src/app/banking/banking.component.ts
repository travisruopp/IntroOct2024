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
import { RouterLink, RouterOutlet } from '@angular/router';
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
    RouterLink,
    CurrencyPipe,
  ],
  template: `
    <app-banking-nav />
    <div>
      <p>Your Balance is {{ store.balance() | currency }}</p>
    </div>

    <div class="p-12">
      <a routerLink="deposit" class="m-8 btn btn-lg btn-success"
        >Make a Deposit</a
      >
      <a routerLink="withdrawal" class="m-8 btn btn-lg btn-success"
        >Make a Withdrawal</a
      >
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BankingComponent {
  store = inject(BankingStore);
}

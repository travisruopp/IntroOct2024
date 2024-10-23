import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BankingNavComponent } from './components/banking-nav-component';
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
    <div>
      <p>Your Balance is {{ store.balance() | currency }}</p>

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
  `,
  styles: ``,
})
export class BankingComponent {
  store = inject(BankingStore);

  constructor() {}
}

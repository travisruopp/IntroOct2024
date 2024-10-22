import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TransactionHistoryComponent } from '../components/transaction-history.component';
import { BankingStore } from '../services/banking.store';

@Component({
  selector: 'app-banking-statement',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TransactionHistoryComponent],
  template: `
    <h1 class="text-2xl font-black">Your Statement</h1>
    <app-banking-transaction-history
      [historyToDisplay]="store.sortedTransactionHistory()"
    />
  `,
  styles: ``,
})
export class StatementComponent {
  store = inject(BankingStore);
}

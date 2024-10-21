import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
} from '@angular/core';
import { TransactionRecord } from '../types';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-banking-transaction-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Balance Before</th>
            <th>Transaction Type</th>
            <th>Amount of Transaction</th>
            <th>New Balance</th>
          </tr>
        </thead>
        <tbody>
          @for(tx of historyToDisplay(); track tx.id) {
          <tr class="bg-base-200">
            <th>{{ tx.id }}</th>
            <td>{{ tx.startingBalance | currency }}</td>
            <td>
              @if(tx.type === 'deposit') {
              <span>👆</span>
              } @else {
              <span>👇</span>
              }
            </td>
            <td>{{ tx.amount | currency }}</td>
            <td>{{ tx.newBalance | currency }}</td>
          </tr>
          } @empty {
          <p>No Transactions Yet!</p>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class TransactionHistoryComponent {
  historyToDisplay = input.required<TransactionRecord[]>();
}

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { BankingTransactionInputComponent } from '../components/banking-transaction-input.component';
import { BankingStore } from '../services/banking.store';

@Component({
  selector: 'app-banking-withdraw',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BankingTransactionInputComponent],
  template: `
    <h1 class="text-2xl font-black">
      Make a Withdrawal (Up to {{ store.balance() }})
    </h1>
    @if(hasOverdraftWarning()) {
    <div class="alert alert-information">
      You don't have that much money. Sorry. Try again.
    </div>
    }
    <app-banking-transaction-input
      label="Withdrawal Amount"
      (transaction)="withdraw($event)"
    />
  `,
  styles: ``,
})
export class WithdrawComponent {
  store = inject(BankingStore);

  hasOverdraftWarning = signal(false);
  withdraw(amount: number) {
    if (this.store.balance() >= amount) {
      this.store.deposit(amount);
      this.hasOverdraftWarning.set(false);
    } else {
      this.hasOverdraftWarning.set(true);
    }
  }
}

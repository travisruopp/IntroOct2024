import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

type TransactionRecord = {
  id: string;
  startingBalance: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  newBalance: number;
};

@Component({
  selector: 'app-banking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <p>Your Balance is {{ balance() }}</p>
      @if(isGoldAccount()){
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
          >You have a gold account! Your next deposit will get a bonus!</span
        >
      </div>
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
          >If you deposit {{ moneyTillGoldAccount() }} you will be a gold
          account!</span
        >
      </div>
      }
      <div>
        <input
          #depositAmount
          class="input"
          class="input input-bordered"
          type="number"
        /><button
          (click)="deposit(depositAmount.valueAsNumber)"
          class="btn btn-primary"
        >
          Deposit
        </button>
        <input
          #withdrawalAmount
          class="input"
          class="input input-bordered"
          type="number"
        /><button
          (click)="withdraw(withdrawalAmount.valueAsNumber)"
          class="btn btn-primary"
        >
          Withdraw
        </button>
      </div>
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
            @for(tx of history(); track tx.id) {
            <tr class="bg-base-200">
              <th>{{ tx.id }}</th>
              <td>{{ tx.startingBalance }}</td>
              <td>
                @if(tx.type === 'deposit') {
                <span>👆</span>
                } @else {
                <span>👇</span>
                }
              </td>
              <td>{{ tx.amount }}</td>
              <td>{{ tx.newBalance }}</td>
            </tr>
            } @empty {
            <p>No Transactions Yet!</p>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class BankingComponent {
  balance = signal(0);

  history = signal<TransactionRecord[]>([]);

  goldAccountCutoff = signal(5000);
  isGoldAccount = computed(() => this.balance() >= this.goldAccountCutoff());
  moneyTillGoldAccount = computed(
    () => this.goldAccountCutoff() - this.balance()
  );
  deposit(amount: number) {
    const newTransaction: TransactionRecord = {
      id: crypto.randomUUID(),
      amount: amount,
      startingBalance: this.balance(),
      newBalance: this.balance() + amount,
      type: 'deposit',
    };
    this.history.set([newTransaction, ...this.history()]);
    this.balance.update((b) => b + amount);
  }

  withdraw(amount: number) {
    const newTransaction: TransactionRecord = {
      id: crypto.randomUUID(),
      amount: amount,
      startingBalance: this.balance(),
      newBalance: this.balance() - amount,
      type: 'withdrawal',
    };
    this.balance.update((b) => b - amount);
  }
}

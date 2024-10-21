import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-banking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <p>Your Balance is {{ balance() }}</p>
      <div>
        <input
          class="input"
          class="input input-bordered"
          type="number"
        /><button (click)="deposit()" class="btn btn-primary">Deposit</button>
        <input
          class="input"
          class="input input-bordered"
          type="number"
        /><button (click)="withdraw()" class="btn btn-primary">Withdraw</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class BankingComponent {
  balance = signal(7000);

  deposit() {
    this.balance.update((b) => b + 10);
  }

  withdraw() {
    this.balance.update((b) => b - 10);
  }
}

import { signal } from '@angular/core';

export class BankingService {
  private balance = signal(5000);

  getBalance() {
    return this.balance.asReadonly();
  }

  deposit(amount: number) {
    this.balance.update((s) => s + amount);
  }
}

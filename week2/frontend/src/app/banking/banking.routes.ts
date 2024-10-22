import { Routes } from '@angular/router';
import { BankingComponent } from './banking.component';
import { StatementComponent } from './pages/statement.component';
import { BankingStore } from './services/banking.store';
import { DepositComponent } from './pages/deposit.component';
import { WithdrawComponent } from './pages/withdraw.component';

export const BANKING_ROUTES: Routes = [
  {
    path: '',
    component: BankingComponent,
    providers: [BankingStore],
    children: [
      {
        path: 'statement',
        component: StatementComponent,
      },
      {
        path: 'withdrawal',
        component: WithdrawComponent,
      },
      {
        path: 'deposit',
        component: DepositComponent,
      },
    ],
  },
];

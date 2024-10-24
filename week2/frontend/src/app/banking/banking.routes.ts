import { Routes } from '@angular/router';
import { BankingComponent } from './banking.component';
import { StatementComponent } from './pages/statement.component';
import { BankingStore } from './services/banking.store';
import { WithdrawComponent } from './pages/withdraw.component';
import { DepositComponent } from './pages/deposit.component';
import { BankDataService } from './services/bank-data.service';

export const BANKING_ROUTES: Routes = [
  {
    path: '', // /banking
    component: BankingComponent,
    providers: [BankingStore, BankDataService],
    children: [
      {
        path: 'statement', // banking/statement
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

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-banking-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div role="tablist" class="tabs tabs-bordered">
      <a
        role="tab"
        class="tab"
        routerLink="/banking"
        [routerLinkActive]="['tab-active']"
        [routerLinkActiveOptions]="{ exact: true }"
        >Home</a
      >
      <a
        role="tab"
        class="tab"
        routerLink="/banking/statement"
        [routerLinkActive]="['tab-active']"
        [routerLinkActiveOptions]="{ exact: true }"
        >Statement</a
      >
    </div>
  `,
  styles: ``,
})
export class BankingNavComponent {}

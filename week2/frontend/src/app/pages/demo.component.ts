import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BankDataService } from '../banking/services/bank-data.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, AsyncPipe],
  providers: [],
  template: `
    <p>Raw Data From API</p>
    <div class="flex ">
      <div class="flex-col border-2 m-2 border-gray-50 p-4">
        <pre>{{ rawResponse$ | async | json }}</pre>
      </div>
      <div class="flex-col border-2 m-2 border-gray-50 p-4">
        <pre>{{ ourResponse$ | async | json }}</pre>
      </div>
    </div>
  `,
  styles: ``,
})
export class DemoComponent {
  #http = inject(HttpClient);
  ourResponse$ = inject(BankDataService).getCurrentBankStatement();
  rawResponse$ = this.#http.get(
    `http://fake-api.bankohypertheory.com/user/statements/10/99`
  );
}

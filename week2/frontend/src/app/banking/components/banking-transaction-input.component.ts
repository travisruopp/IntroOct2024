import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-banking-transaction-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="doTransaction()">
      <input
        name="transaction-amount"
        class="input input-bordered"
        type="number"
        formControlName="transactionAmount"
      /><button type="submit" class="btn btn-primary">
        <label for="transaction-amount"> {{ label() }} </label>
      </button>
      @if(form.invalid && (form.controls.transactionAmount.dirty ||
      form.controls.transactionAmount.touched)) {
      <span role="alert" class="alert alert-error">Errors</span>
      }
    </form>
  `,
  styles: ``,
})
export class BankingTransactionInputComponent {
  form = new FormGroup({
    transactionAmount: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.min(0.01)],
    }),
  });
  label = input.required<string>();
  transaction = output<number>();
  doTransaction() {
    if (this.form.valid) {
      const amount = this.form.controls.transactionAmount.value;
      this.transaction.emit(amount);
      this.form.reset();
    }
  }
}

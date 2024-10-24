import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SoftwareStore } from '../services/software.store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SoftwareItemCreateModel } from '../types';

@Component({
  selector: 'app-software-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <p>Create Component Here</p>
    <form [formGroup]="form" (ngSubmit)="addItem()">
      <div class="form-group">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Put the title here"
            formControlName="title"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="label">
            <span class="label-text-alt">The vendor's name for this item.</span>
          </div>
        </label>
      </div>
      <div class="form-group">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Vendor</span>
          </div>
          <input
            type="text"
            placeholder="Put the name of the vendor here"
            formControlName="vendor"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="label">
            <span class="label-text-alt">The vendor's name.</span>
          </div>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Is This Open Source?</span>
          <input
            type="checkbox"
            checked="checked"
            class="checkbox"
            formControlName="isOpenSource"
          />
        </label>
      </div>
      <button class="btn btn-primary" type="submit">Add Item</button>
    </form>
  `,
  styles: ``,
})
export class CreateComponent {
  store = inject(SoftwareStore);

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    vendor: new FormControl<string>('', { nonNullable: true }),
    isOpenSource: new FormControl<boolean>(false, { nonNullable: true }),
  });

  addItem() {
    const itemToAdd = this.form.value as unknown as SoftwareItemCreateModel;
    this.store.addItem(itemToAdd);
  }
}

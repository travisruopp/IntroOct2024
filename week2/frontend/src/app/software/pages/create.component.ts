import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SoftwareStore } from '../services/software.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SoftwareItemCreateModel } from '../types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-software-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, JsonPipe],
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
        @let titleControl = form.controls.title; @if(titleControl.invalid &&
        (titleControl.touched || titleControl.dirty)) {
        <div class="alert alert-error">
          @if(titleControl.hasError('required')) {
          <p>A Title is Required</p>
          } @if(titleControl.hasError('minlength')) {
          <p>That is too short</p>
          } @if(titleControl.hasError('maxlength')) {
          <p>That is too long</p>
          }
        </div>
        }
      </div>
      <div class="form-group">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Vendor</span>
          </div>
          <select formControlName="vendor" class="input">
            @for(v of store.vendors(); track v.id) {
            <option [value]="v.id">{{ v.name }}</option>
            }
          </select>
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
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      asyncValidators: [], // GET /users?email=jeff@hypertheory.com
    }),
    vendor: new FormControl<string>('', {
      validators: [],
      nonNullable: true,
    }),
    isOpenSource: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  addItem() {
    if (this.form.valid) {
      const itemToAdd = this.form.value as unknown as SoftwareItemCreateModel;
      this.store.addItem(itemToAdd);
      this.form.reset();
    } else {
      // go through all the controls and mark them as touched so that validation is triggered.
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

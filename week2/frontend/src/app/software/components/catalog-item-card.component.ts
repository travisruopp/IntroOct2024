import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SoftwareItemModel } from '../types';

@Component({
  selector: 'app-software-catalog-item-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card bg-neutral text-neutral-content w-96">
      <div class="card-body items-center text-center">
        @let i = item();
        <h2 class="card-title">{{ i.title }}</h2>
        <p>{{ i.title }} from {{ i.vendor }}</p>
        @if(i.isOpenSource) {
        <p>This is Open Source Software</p>
        } @else {
        <p>This is commercial (closed-source) software</p>
        }
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Edit</button>
          <button class="btn btn-ghost">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CatalogItemCardComponent {
  item = input.required<SoftwareItemModel>();
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SoftwareStore } from '../services/software.store';
import { CatalogItemCardComponent } from '../components/catalog-item-card.component';

@Component({
  selector: 'app-software-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CatalogItemCardComponent],
  template: `
    <p>List of Software Here</p>

    @for(item of store.entities(); track item.id) {
    <app-software-catalog-item-card [item]="item" />

    }
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(SoftwareStore);
}

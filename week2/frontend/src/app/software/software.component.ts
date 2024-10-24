import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateComponent } from './pages/create.component';
import { ListComponent } from './pages/list.component';

@Component({
  selector: 'app-software',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CreateComponent, ListComponent],
  template: `
    <p>The software stuff will go here</p>
    <div class="flex">
      <div class="flex-col border-2 m-2 border-gray-50 p-4">
        <app-software-create />
      </div>
      <div class="flex-col border-2 m-2 border-gray-50 p-4">
        <app-software-list />
      </div>
    </div>
  `,
  styles: ``,
})
export class SoftwareComponent {}

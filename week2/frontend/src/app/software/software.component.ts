import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateComponent } from './pages/create.component';

@Component({
  selector: 'app-software',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CreateComponent],
  template: `
    <p>The software stuff will go here</p>
    <app-software-create />
  `,
  styles: ``,
})
export class SoftwareComponent {}

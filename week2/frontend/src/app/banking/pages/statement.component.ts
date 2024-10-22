import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-banking-statement',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <p>Statement will go here.</p>
    `,
    styles: ``
})
export class StatementComponent {

}
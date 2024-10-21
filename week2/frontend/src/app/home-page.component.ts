import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <p>Home Page Stuff Here</p>
    `,
    styles: ``
})
export class HomePageComponent {

}
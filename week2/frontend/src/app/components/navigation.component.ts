import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" routerLink="home"
          >Intro To Programming</a
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a routerLink="banking">Banking</a>
          </li>
          <li>
            <a routerLink="software">Software Center</a>
          </li>
          <li>
            <a routerLink="demo">Demo</a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationComponent {}

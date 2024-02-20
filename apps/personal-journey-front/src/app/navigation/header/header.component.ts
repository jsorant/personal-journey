import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

const HOME_ROUTE = '/home';
const ADD_EVENT_ROUTE = '/events/add';
const LIST_EVENTS_ROUTE = '/events/list';

@Component({
  selector: 'duckrulz-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  router = inject(Router);

  async onHomeClicked(): Promise<void> {
    await this.router.navigateByUrl(HOME_ROUTE);
  }

  async onListClicked() {
    await this.router.navigateByUrl(LIST_EVENTS_ROUTE);
  }

  async onAddClicked() {
    await this.router.navigateByUrl(ADD_EVENT_ROUTE);
  }
}

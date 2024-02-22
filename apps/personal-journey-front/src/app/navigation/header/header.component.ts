import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

const HOME_ROUTE = '/home';
const ADD_EVENT_ROUTE = '/events/add';
const HISTORY_ROUTE = '/history';

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
  static ADD_EVENT_BUTTON_TEXT = 'Ajouter un évènement';
  static HISTORY_BUTTON_TEXT = 'Historique';

  addEventButtonText() {
    return HeaderComponent.ADD_EVENT_BUTTON_TEXT;
  }

  historyButtonText() {
    return HeaderComponent.HISTORY_BUTTON_TEXT;
  }

  async onHomeClicked(): Promise<void> {
    await this.router.navigateByUrl(HOME_ROUTE);
  }

  async onHistoryClicked() {
    await this.router.navigateByUrl(HISTORY_ROUTE);
  }

  async onAddClicked() {
    await this.router.navigateByUrl(ADD_EVENT_ROUTE);
  }
}

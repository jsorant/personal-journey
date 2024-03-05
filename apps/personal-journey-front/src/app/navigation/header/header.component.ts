import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {
  HISTORY_ROUTE,
  HOME_ROUTE,
  SITUATION_PASS_THROUGH_ROUTE,
} from '../../app.routes';

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

  static readonly MY_SITUATIONS_BUTTON_TEXT = 'Mes situations';
  static readonly ADD_SITUATION_BUTTON_TEXT = 'Nouvelle situation';

  mySituationButtonText() {
    return HeaderComponent.MY_SITUATIONS_BUTTON_TEXT;
  }

  addSituationButtonText() {
    return HeaderComponent.ADD_SITUATION_BUTTON_TEXT;
  }

  async onHomeClicked(): Promise<void> {
    await this.router.navigateByUrl(HOME_ROUTE);
  }

  async onMySituationsClicked() {
    await this.router.navigateByUrl(HISTORY_ROUTE);
  }

  async onAddSituationClicked() {
    await this.router.navigateByUrl(SITUATION_PASS_THROUGH_ROUTE);
  }
}

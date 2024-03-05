import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PHYSICAL_SYMPTOMS_ROUTE } from '../../app.routes';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'duckrulz-situation-pass-through-intro',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButton, MatCard, MatCardContent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  readonly #router: Router = inject(Router);

  async onBeginClicked() {
    await this.#router.navigate([PHYSICAL_SYMPTOMS_ROUTE]);
  }
}

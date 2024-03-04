import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PHYSICAL_SYMPTOMS_ROUTE } from '../../app.routes';

@Component({
  selector: 'duckrulz-situation-pass-through-intro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './situation-pass-through-intro.component.html',
  styleUrl: './situation-pass-through-intro.component.css',
})
export class SituationPassThroughIntroComponent {
  readonly #router: Router = inject(Router);

  async onBeginClicked() {
    await this.#router.navigate([PHYSICAL_SYMPTOMS_ROUTE]);
  }
}

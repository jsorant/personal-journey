import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { physicalSymptomsRoute } from '../../app.routes';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-intro',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButton,
    MatCard,
    MatCardContent,
    StepsButtonsComponent,
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  readonly #router: Router = inject(Router);
  readonly #situationService: SituationService = inject(SituationService);

  async onBeginClicked() {
    const newSituationId = await this.#situationService.createNewSituation();
    await this.#router.navigate(physicalSymptomsRoute(newSituationId));
  }
}

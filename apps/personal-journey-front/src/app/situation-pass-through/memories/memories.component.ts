import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { autoPilotsRoute, durationRoute } from '../../app.routes';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-memories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TherapyCardComponent,
    MatLabel,
    StepsButtonsComponent,
  ],
  templateUrl: './memories.component.html',
  styleUrl: './memories.component.css',
})
export class MemoriesComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);
  readonly #situationService: SituationService = inject(SituationService);

  readonly form: FormGroup = this.#formBuilder.group({
    memories: '',
  });

  infosTitle = 'Souvenirs liés';
  infoDescriptions = [
    "Les situations difficiles sont généralement liées à un ou plusieurs évènement passés, datant souvent de l'enfance.",
    'Ces évènement passés ont contribué à forger notre façon de réagir aux sollicitations du monde extérieur.',
    "Les identifier peut nous permettre de comprendre ce qui est à l'origine d'une situation difficile.",
  ];

  readonly therapyDescriptions = [
    'J’identifie ce qui pourrait être à la source de ce type de situation.',
    'J’apprends à mieux me connaître en comprenant l’impact du passé sur ma construction personnelle.',
  ];

  situationId = '';

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  async onNextClicked() {
    await this.#situationService.addMemories(
      this.form.value.memories,
      this.situationId
    );

    await this.#router.navigate(durationRoute(this.situationId));
  }

  async onPrevClicked() {
    await this.#router.navigate(autoPilotsRoute(this.situationId));
  }

  async onIgnoreClicked() {
    await this.#router.navigate(durationRoute(this.situationId));
  }
}

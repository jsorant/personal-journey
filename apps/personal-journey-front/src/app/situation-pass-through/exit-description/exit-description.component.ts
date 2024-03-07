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
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { descriptionRoute, emotionsRoute } from '../../app.routes';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-exit-description',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MatButton,
    MatDatepicker,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    TherapyCardComponent,
    StepsButtonsComponent,
  ],
  templateUrl: './exit-description.component.html',
  styleUrl: './exit-description.component.css',
})
export class ExitDescriptionComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);
  readonly #situationService: SituationService = inject(SituationService);

  readonly form: FormGroup = this.#formBuilder.group({
    event: '',
  });

  readonly infosTitle = 'Optionel : Sortie de situation spontanée';
  readonly infoDescriptions = [
    'On entend parfois en séance de travail “Ça va mieux, je ne sais pas pourquoi”.',
    'Dans ces cas là, un évènement indépendant de notre volonté nous a fait sortir de la situation.',
    'Dans le but de mieux se connaître et de permettre d’effectuer un travail sur soi-même, il est important de ne pas s’arrêter là et d’essayer d’identifier ce qu’il s’est effectivement passé.',
  ];

  readonly therapyDescriptions = [
    'Je recherche des éléments liés à cet évènement qui pourraient expliquer la sortie de crise.',
    'Je me sers de ces éléments pour mieux comprendre les origines de cette situation.',
  ];

  situationId = '';

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  async onPrevClicked() {
    await this.#router.navigate(descriptionRoute(this.situationId));
  }

  async onIgnoreClicked() {
    await this.#router.navigate(emotionsRoute(this.situationId));
  }

  async onNextClicked() {
    await this.#situationService.addExitEvent(
      this.form.value.event,
      this.situationId
    );

    await this.#router.navigate(emotionsRoute(this.situationId));
  }
}

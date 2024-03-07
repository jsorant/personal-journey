import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { emotionsRoute, triggersNeedsRoute } from '../../app.routes';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-trigger-thoughts',
  standalone: true,
  imports: [
    CommonModule,
    InfoCardComponent,
    ReactiveFormsModule,
    MatCheckbox,
    MatButton,
    TherapyCardComponent,
    StepsButtonsComponent,
  ],
  templateUrl: './trigger-thoughts.component.html',
  styleUrl: './trigger-thoughts.component.css',
})
export class TriggerThoughtsComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;
  readonly #situationService: SituationService = inject(SituationService);

  readonly infosTitle = 'Déclencheurs - Mes types de pensées';
  readonly infoDescriptions = [
    "Un déclencheur correspond à quelque chose qui augmente l'inconfort.",
    'Nous nous intéressons ici aux déclencheurs relatifs aux types de pensées.',
    "Il existe quatre types de pensées principaux articulés autour de la sécurité, de l'image de soi, du sentiment de culpabilité et de la sensation d'absence de choix",
  ];

  readonly therapyDescriptions = [
    'J’observe ma façon de penser pour identifier les déclencheurs de ce type de situations.',
    'Ainsi :',
    "- J'apprends à mieux me connaître en comprenant ma façon de penser",
    "- Je peux à l'avenir identifier plus rapidement l'arrivée de ces schémas de pensées",
  ];

  readonly thoughtsTypesData = this.#situationService.allThoughtsTypes();

  situationId = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      thoughtsTypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  private addCheckboxes() {
    this.thoughtsTypesData.forEach(() =>
      this.thoughtsTypesFormArray().push(new FormControl(false))
    );
  }

  thoughtsTypesFormArray(): FormArray<FormControl> {
    return this.form.get('thoughtsTypes') as FormArray;
  }

  async onPrevClicked() {
    await this.#router.navigate(emotionsRoute(this.situationId));
  }

  async onNextClicked() {
    await this.#situationService.addThoughtsTriggers(
      this.selectedThoughtsTypes(),
      this.situationId
    );

    await this.#router.navigate(triggersNeedsRoute(this.situationId));
  }

  private selectedThoughtsTypes() {
    return this.form.value.thoughtsTypes
      .map((checked: boolean, index: number) =>
        checked ? this.thoughtsTypesData[index] : null
      )
      .filter((name: string | null) => name !== null);
  }
}

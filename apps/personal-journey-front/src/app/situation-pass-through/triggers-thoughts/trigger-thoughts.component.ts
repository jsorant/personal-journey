import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { EMOTIONS_ROUTE, TRIGGERS_NEEDS_ROUTE } from '../../app.routes';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';

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
export class TriggerThoughtsComponent {
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;

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

  readonly thoughtsTypesData = [
    'Pensées liées à la sécurité (je suis en danger, je vais mourir...)',
    "Pensées liées à l'image de soi (je suis trop nul, je ne saurais jamais faire cela...)",
    "Pensées liées à la culpabilité (c'est de ma faute, je suis responsable de la situation...)",
    "Pensées liées à l'absence de choix (je ne peux rien y faire, je ne vois pas le moyen de m'en sortir, je suis dans une impasse...)",
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      thoughtsTypes: new FormArray([]),
    });

    this.addCheckboxes();
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
    await this.#router.navigate([EMOTIONS_ROUTE]);
  }

  async onNextClicked() {
    await this.#router.navigate([TRIGGERS_NEEDS_ROUTE]);
  }
}

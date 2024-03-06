import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
} from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  DESCRIPTION_ROUTE,
  SITUATION_PASS_THROUGH_ROUTE,
} from '../../app.routes';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';

@Component({
  selector: 'duckrulz-physical-symptoms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatCardModule,
    MatIcon,
    InfoCardComponent,
    MatIconButton,
    StepsButtonsComponent,
  ],
  templateUrl: './physical-symptoms.component.html',
  styleUrl: './physical-symptoms.component.css',
})
export class PhysicalSymptomsComponent {
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;

  readonly infosTitle = 'Mes signes physiologiques';
  readonly infoDescriptions = [
    'Une émotion forte se ressent dans le corps au travers de signes physiologiques aussi appelés symptômes physiques.',
  ];
  readonly infoExamples =
    'Ex : Je suis rouge de colère, j’ai la moutarde qui me monte au nez, j’ai la boule au ventre, j’ai la gorge qui se serre, j’ai l’estomac noué…';

  readonly physicalSymptomsData = [
    'Colopathie fonctionnelle',
    'Nausée',
    'Hyperphagie boulimique',
    "Perte d'appetit",
    'Incapacite à manger',
    'Douleurs',
    'Tensions musculaires',
    'Fourmillements',
    'Palpitations',
    'Douleurs thoraciques',
    "Envie fréquente d'uriner",
    'Insomnies',
    'Somnolences dans la journee',
    'Fatigue',
    'Mal de tête',
    'Vertiges',
    'Sensation de faiblesse',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      physicalSymptoms: new FormArray([]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.physicalSymptomsData.forEach(() =>
      this.physicalSymptomsFormArray().push(new FormControl(false))
    );
  }

  physicalSymptomsFormArray(): FormArray<FormControl> {
    return this.form.get('physicalSymptoms') as FormArray;
  }

  async onPrevClicked() {
    await this.#router.navigate([SITUATION_PASS_THROUGH_ROUTE]);
  }

  async onNextClicked() {
    const selectedPhysicalSymptoms = this.form.value.physicalSymptoms
      .map((checked: boolean, index: number) =>
        checked ? this.physicalSymptomsData[index] : null
      )
      .filter((name: string | null) => name !== null);
    console.log(selectedPhysicalSymptoms);
    //TODO map to enum
    await this.#router.navigate([DESCRIPTION_ROUTE]);
  }
}

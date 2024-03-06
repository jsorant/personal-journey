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
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import {
  EXIT_DESCRIPTION_ROUTE,
  TRIGGERS_THOUGHTS_ROUTE,
} from '../../app.routes';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';

@Component({
  selector: 'duckrulz-situation-pass-through-emotions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MatButton,
    MatCheckbox,
    ReactiveFormsModule,
    StepsButtonsComponent,
  ],
  templateUrl: './emotions.component.html',
  styleUrl: './emotions.component.css',
})
export class EmotionsComponent {
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;

  readonly infosTitle = 'Mes émotions';
  readonly infoDescriptions = ['TODO'];

  readonly emotionsData = ['Joie', 'Anxiété', 'Tristesse', 'Peur', 'Colère'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      emotions: new FormArray([]),
    });

    this.addCheckboxes();
  }

  emotionsFormArray(): FormArray<FormControl> {
    return this.form.get('emotions') as FormArray;
  }

  private addCheckboxes() {
    this.emotionsData.forEach(() =>
      this.emotionsFormArray().push(new FormControl(false))
    );
  }

  async onNextClicked() {
    await this.#router.navigate([TRIGGERS_THOUGHTS_ROUTE]);
  }

  async onPrevClicked() {
    await this.#router.navigate([EXIT_DESCRIPTION_ROUTE]);
  }
}

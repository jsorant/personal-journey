import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { exitDescriptionRoute, triggersThoughtsRoute } from '../../app.routes';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

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
export class EmotionsComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;
  readonly #situationService: SituationService = inject(SituationService);

  readonly infosTitle = 'Mes émotions';
  readonly infoDescriptions = ['TODO'];

  readonly emotionsData = this.#situationService.allEmotions();

  situationId = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      emotions: new FormArray([]),
    });

    this.addCheckboxes();
  }

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
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
    await this.#situationService.addEmotions(
      this.selectedEmotions(),
      this.situationId
    );

    await this.#router.navigate(triggersThoughtsRoute(this.situationId));
  }

  async onPrevClicked() {
    await this.#router.navigate(exitDescriptionRoute(this.situationId));
  }

  private selectedEmotions() {
    return this.form.value.emotions
      .map((checked: boolean, index: number) =>
        checked ? this.emotionsData[index] : null
      )
      .filter((name: string | null) => name !== null);
  }
}

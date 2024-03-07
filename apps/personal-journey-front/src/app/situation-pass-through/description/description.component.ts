import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Time,
  TimeInputComponent,
  validateTimeInput,
} from '../../custom-components/time-input.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { exitDescriptionRoute, physicalSymptomsRoute } from '../../app.routes';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { TimeHelper } from '../../helpers/time.helper';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-description',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepicker,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatError,
    MatIcon,
    TimeInputComponent,
    InfoCardComponent,
    StepsButtonsComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent implements OnInit {
  readonly #dateAdapter: DateAdapter<unknown> = inject(DateAdapter<unknown>);
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);
  readonly #situationService: SituationService = inject(SituationService);

  readonly infosTitle = 'La situation';
  readonly infoDescriptions = [
    'La situation est l’ensemble des évènements et éléments présents, liés de près ou de loin à la montée de l’inconfort.',
    'On peut aussi appeler cela le contexte.',
  ];

  situationId = '';

  readonly form: FormGroup = this.#formBuilder.group({
    date: new FormControl(TimeHelper.toHtmlDateInputValue(new Date()), []),
    time: new FormControl(Time.buildWithDate(new Date()), [validateTimeInput]),
    location: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  ngOnInit() {
    this.#dateAdapter.setLocale('fr');

    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  async onNextClicked() {
    await this.#situationService.addDescription(
      this.extractDate(),
      this.form.value.location,
      this.form.value.description,
      this.situationId
    );

    await this.#router.navigate(exitDescriptionRoute(this.situationId));
  }

  private extractDate() {
    const date = new Date(this.form.value.date);
    return this.form.value.time.applyCurrentTimeInto(date);
  }

  async onPrevClicked() {
    await this.#router.navigate(physicalSymptomsRoute(this.situationId));
  }
}

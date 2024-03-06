import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { exitDescriptionRoute, physicalSymptomsRoute } from '../../app.routes';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';

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
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  readonly infosTitle = 'La situation';
  readonly infoDescriptions = [
    'La situation est l’ensemble des évènements et éléments présents, liés de près ou de loin à la montée de l’inconfort.',
    'On peut aussi appeler cela le contexte.',
  ];

  situationId = '';

  readonly form: FormGroup = this.#formBuilder.group({
    date: new FormControl('', [Validators.required]),
    time: new FormControl(Time.MIDNIGHT, [
      Validators.required,
      validateTimeInput,
    ]),
    location: '',
    description: '',
  });

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = this.#route.snapshot.paramMap.get('id')!;
    console.log(id);
    //this.#hero$ = this.#service.getHero(id);
    this.situationId = id;
  }

  async onNextClicked() {
    await this.#router.navigate(exitDescriptionRoute(this.situationId));
  }

  async onPrevClicked() {
    await this.#router.navigate(physicalSymptomsRoute(this.situationId));
  }
}

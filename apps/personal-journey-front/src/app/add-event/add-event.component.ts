/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TimeHelper } from '../helpers/time.helper';
import {
  AddEventPresenter,
  AddEventViewModel,
  AddNewEventInputs,
} from '../../adapters/presenters/add-event/add-event.presenter';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatOption,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  Time,
  TimeInputComponent,
  validateTimeInput,
} from '../custom-components/time-input.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'duckrulz-add-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelect,
    MatOption,
    MatSlider,
    MatSliderThumb,
    MatSliderModule,
    MatButton,
    MatIcon,
    TimeInputComponent,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  readonly #dateAdapter: DateAdapter<unknown> = inject(DateAdapter<unknown>);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);
  readonly #presenter: AddEventPresenter;
  readonly viewModel: AddEventViewModel;
  static ANXIETY_TYPE_TEXT = "Crise d'angoisse";
  static DEPRESSION_TYPE_TEXT = 'Moment dépressif';

  @Output() eventAdded: EventEmitter<void> = new EventEmitter();

  anxietyTypeText() {
    return AddEventComponent.ANXIETY_TYPE_TEXT;
  }

  depressionTypeText() {
    return AddEventComponent.DEPRESSION_TYPE_TEXT;
  }

  form = this.#formBuilder.group({
    date: new FormControl('', [Validators.required]),
    time: new FormControl(Time.MIDNIGHT, [
      Validators.required,
      validateTimeInput,
    ]),
    durationMinutes: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    type: '',
    level: 0,
    thoughts: '',
  });

  constructor(@Inject('AddEventPresenter') presenter: AddEventPresenter) {
    this.#dateAdapter.setLocale('fr');
    this.#presenter = presenter;
    this.viewModel = this.#presenter.initialViewModel();
    this.applyViewModel();
  }

  applyViewModel() {
    this.form.setValue({
      date: TimeHelper.toHtmlDateInputValue(this.viewModel.date),
      time: Time.buildWithDate(this.viewModel.date),
      durationMinutes: this.viewModel.durationMinutes,
      type: this.viewModel.type,
      level: this.viewModel.level,
      thoughts: this.viewModel.thoughts,
    });
  }

  async addNewEvent(): Promise<void> {
    console.log('valid', this.form.valid);
    //TODO loader

    //TODO validate

    const inputs: AddNewEventInputs = {
      type: this.adaptType(),
      date: this.adaptDate(),
      level: this.form.value.level!,
      durationMinutes: this.form.value.durationMinutes!,
      thoughts: this.form.value.thoughts!,
    };
    await this.#presenter.addNewEvent(inputs);

    //TODO hide loader
    //TODO confirm snackbar

    //console.log(this.form.value);
    //console.log(inputs);

    this.eventAdded.emit();
    console.log(this.form.value.date);
    console.log(this.adaptDate());
  }

  private adaptDate() {
    const date = new Date(this.form.value.date!);
    return this.form.value.time!.applyCurrentTimeInto(date);
  }

  private adaptType(): 'anxiety' | 'depression' {
    if (this.form.value.type! === 'anxiety') return 'anxiety';
    return 'depression';
  }
}

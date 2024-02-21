import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TimeHelper } from '../helpers/time.helper';
import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatButton } from '@angular/material/button';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  readonly #formBuilder: FormBuilder = inject(FormBuilder);
  readonly #presenter: AddEventPresenter;
  viewModel: AddEventViewModel;

  form = this.#formBuilder.group({
    date: '',
    time: '',
    durationMinutes: 0,
    type: '',
    level: 0,
    thoughts: '',
  });

  constructor(@Inject('AddEventPresenter') presenter: AddEventPresenter) {
    this.#presenter = presenter;
    this.viewModel = this.#presenter.initialViewModel();
    this.applyViewModel();
  }

  applyViewModel() {
    this.form.setValue({
      date: TimeHelper.toHtmlDateInputValue(this.viewModel.date),
      time: TimeHelper.toHtmlTimeInputValue(this.viewModel.date),
      durationMinutes: this.viewModel.durationMinutes,
      type: this.viewModel.type,
      level: this.viewModel.level,
      thoughts: this.viewModel.thoughts,
    });
  }

  async addNewEvent(): Promise<void> {
    let date = new Date(this.form.value.date!);
    const hours = Number.parseInt(this.form.value.time!.split(':')[0]);
    const minutes = Number.parseInt(this.form.value.time!.split(':')[1]);
    date = new Date(date.setHours(hours, minutes));

    console.log('date', date);
    //TODO loader
    await this.#presenter.addNewEvent(date, this.form.value.thoughts!);
    //TODO hide loader then confirm
    //TODO notify => navigate to list

    console.log(this.form.value);
  }
}

import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { MyTel, MyTelInputComponent } from './tel.component';

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
    MyTelInputComponent,
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
    date: '',
    time: '',
    durationMinutes: 0,
    type: '',
    level: 0,
    thoughts: '',
    tel: new FormControl(new MyTel('', '', '')),
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
      time: TimeHelper.toHtmlTimeInputValue(this.viewModel.date),
      durationMinutes: this.viewModel.durationMinutes,
      type: this.viewModel.type,
      level: this.viewModel.level,
      thoughts: this.viewModel.thoughts,
      tel: new MyTel('', '', ''),
    });
  }

  async addNewEvent(): Promise<void> {
    //TODO DATE
    let date = new Date(this.form.value.date!);
    const hours = Number.parseInt(this.form.value.time!.split(':')[0]);
    const minutes = Number.parseInt(this.form.value.time!.split(':')[1]);
    date = new Date(date.setHours(hours, minutes));

    //TODO loader
    const inputs: AddNewEventInputs = {
      type: this.adaptType(this.form.value.type!),
      date,
      level: this.form.value.level!,
      durationMinutes: this.form.value.durationMinutes!,
      thoughts: this.form.value.thoughts!,
    };
    await this.#presenter.addNewEvent(inputs);
    //TODO hide loader then confirm
    //TODO notify => navigate to list

    console.log(this.form.value);

    this.eventAdded.emit();
  }

  private adaptType(type: string): 'anxiety' | 'depression' {
    if (type === 'anxiety') return 'anxiety';
    return 'depression';
  }
}

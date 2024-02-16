import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TimeHelper } from '../helpers/time.helper';
import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';

@Component({
  selector: 'duckrulz-add-event',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  readonly #presenter: AddEventPresenter;
  viewModel: AddEventViewModel;
  myForm: FormGroup;

  #dateControl = new FormControl();
  #timeControl = new FormControl();
  #durationMinutesControl = new FormControl();
  #typeControl = new FormControl();
  #levelControl = new FormControl();
  #thoughtsControl = new FormControl();

  constructor(@Inject('AddEventPresenter') presenter: AddEventPresenter) {
    this.#presenter = presenter;
    this.myForm = new FormGroup({
      date: this.#dateControl,
      time: this.#timeControl,
      duration: this.#durationMinutesControl,
      type: this.#typeControl,
      level: this.#levelControl,
      thoughts: this.#thoughtsControl,
    });
    this.viewModel = this.#presenter.initialViewModel();
    this.applyViewModel();
  }

  applyViewModel() {
    this.#dateControl.setValue(
      TimeHelper.toHtmlDateInputValue(this.viewModel.date)
    );
    this.#timeControl.setValue(
      TimeHelper.toHtmlTimeInputValue(this.viewModel.date)
    );
    this.#typeControl.setValue(this.viewModel.type);
    this.#durationMinutesControl.setValue(this.viewModel.durationMinutes);
    this.#levelControl.setValue(this.viewModel.level);
    this.#thoughtsControl.setValue(this.viewModel.thoughts);
  }

  async addNewEvent(): Promise<void> {
    const date = new Date(
      this.#dateControl.value + ' ' + this.#timeControl.value
    );

    console.log('date', date);
    console.log('type', this.#typeControl.value);
    console.log('level', this.#levelControl.value);
    console.log('duration', this.#durationMinutesControl.value);
    console.log('thoughts', this.#thoughtsControl.value);
    //TODO loader
    await this.#presenter.addNewEvent(date, this.#thoughtsControl.value);
    //TODO hide loader then confirm
    //TODO notify => navigate to list
  }
}

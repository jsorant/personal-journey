import { Inject, Injectable } from '@angular/core';
import { AddEventPresenter, AddEventViewModel } from './add-event.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { Promise } from 'cypress/types/cy-bluebird';
import { CurrentDate } from './current-date';

@Injectable({
  providedIn: 'root',
})
export class AddEventPresenterImpl implements AddEventPresenter {
  readonly #eventsRepository: EventsRepository;
  readonly #currentDate: CurrentDate;

  constructor(
    @Inject('EventsRepository') eventsRepository: EventsRepository,
    @Inject('CurrentDate') currentDate: CurrentDate
  ) {
    this.#eventsRepository = eventsRepository;
    this.#currentDate = currentDate;
  }

  addNewEvent(thoughts: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  initialViewModel(): AddEventViewModel {
    return {
      date: this.#currentDate.value(),
      durationMinutes: 5,
      type: 'anxiety',
      level: 1,
      minLevel: 0,
      maxLevel: 10,
      thoughtsPlaceholder: 'Describe how you feel',
      thoughts: '',
    };
  }
}

import { Inject, Injectable } from '@angular/core';
import { AddEventPresenter, AddEventViewModel } from './add-event.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { Promise } from 'cypress/types/cy-bluebird';

@Injectable({
  providedIn: 'root',
})
export class AddEventPresenterImpl implements AddEventPresenter {
  readonly #eventsRepository: EventsRepository;

  constructor(@Inject('EventsRepository') eventsRepository: EventsRepository) {
    this.#eventsRepository = eventsRepository;
  }

  addNewEvent(thoughts: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  initialViewModel(): AddEventViewModel {
    return {
      date: new Date(),
      durationMinutes: 5,
      type: 'anxiety',
      level: 7,
      minLevel: 0,
      maxLevel: 10,
      thoughtsPlaceholder: 'Describe how you feel',
      thoughts: '',
    };
  }
}

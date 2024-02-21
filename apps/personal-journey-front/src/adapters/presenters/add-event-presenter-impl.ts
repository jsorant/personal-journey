import { Inject, Injectable } from '@angular/core';
import { AddEventPresenter, AddEventViewModel } from './add-event.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { CurrentDate } from '../current-date';
import { EventType } from '../../domain/event';

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

  async addNewEvent(date: Date, thoughts: string): Promise<void> {
    this.#eventsRepository.saveEvent({
      date,
      type: EventType.ANXIETY,
      level: 0,
      durationMinutes: 10,
      thoughts,
    });
  }

  initialViewModel(): AddEventViewModel {
    return {
      date: this.#currentDate.value(),
      durationMinutes: 5,
      type: 'anxiety',
      level: 1,
      minLevel: 0,
      maxLevel: 10,
      thoughtsPlaceholder:
        'Décrivez ce que vous avez ressenti, vos pensées, vos émotions...',
      thoughts: '',
    };
  }
}

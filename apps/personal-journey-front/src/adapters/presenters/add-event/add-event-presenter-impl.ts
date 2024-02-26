import { Inject, Injectable } from '@angular/core';
import {
  AddEventPresenter,
  AddEventViewModel,
  AddNewEventInputs,
} from './add-event.presenter';
import { EventsRepository } from '../../../domain/events.repository';
import { CurrentDate } from '../../../shared-kernel/current-date';
import { EventType } from '../../../domain/event';

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

  async addNewEvent(inputs: AddNewEventInputs): Promise<void> {
    this.#eventsRepository.saveEvent({
      date: inputs.date,
      type: this.adaptType(inputs.type),
      level: inputs.level,
      durationMinutes: inputs.durationMinutes,
      thoughts: inputs.thoughts,
    });
  }

  private adaptType(presenterType: 'anxiety' | 'depression'): EventType {
    if (presenterType === 'anxiety') return EventType.ANXIETY;
    return EventType.DEPRESSION;
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

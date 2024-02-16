import { ListEventsPresenter } from './list-events.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { Inject, Injectable } from '@angular/core';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class ListEventsPresenterImpl implements ListEventsPresenter {
  readonly #eventsRepository: EventsRepository;

  constructor(@Inject('EventsRepository') eventsRepository: EventsRepository) {
    this.#eventsRepository = eventsRepository;
  }

  getEvents(): Event[] {
    return this.#eventsRepository.listEvents();
  }
}

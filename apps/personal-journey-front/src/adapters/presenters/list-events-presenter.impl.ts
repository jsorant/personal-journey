import { ListEventsView } from './list-events.view';
import { Event, ListEventsPresenter } from './list-events.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListEventsPresenterImpl implements ListEventsPresenter {
  readonly #eventsRepository: EventsRepository;

  constructor(@Inject('EventsRepository') eventsRepository: EventsRepository) {
    this.#eventsRepository = eventsRepository;
  }

  initialEvents(): Event[] {
    return this.#eventsRepository.listEvents();
  }

  setView(view: ListEventsView): void {}
}

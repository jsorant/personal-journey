import { HistoryPresenter } from './history.presenter';
import { EventsRepository } from '../../domain/events.repository';
import { Inject, Injectable } from '@angular/core';
import { Event, EventType } from '../../domain/event';
import { EventViewModel, EventViewModelType } from './event-view-model';

@Injectable({
  providedIn: 'root',
})
export class HistoryPresenterImpl implements HistoryPresenter {
  readonly #eventsRepository: EventsRepository;

  constructor(@Inject('EventsRepository') eventsRepository: EventsRepository) {
    this.#eventsRepository = eventsRepository;
  }

  getEvents(): EventViewModel[] {
    return this.adaptEvents(this.#eventsRepository.listEvents());
  }

  private adaptEvents(domainEvents: Event[]): EventViewModel[] {
    return domainEvents.map(HistoryPresenterImpl.adaptEvent);
  }

  private static adaptEvent(domainEvent: Event): EventViewModel {
    return EventViewModel.builder()
      .withType(HistoryPresenterImpl.adaptType(domainEvent.type))
      .withDate(domainEvent.date)
      .withDurationMinutes(domainEvent.durationMinutes)
      .withLevel(domainEvent.level)
      .withThoughts(domainEvent.thoughts)
      .build();
  }

  private static adaptType(domainEventType: EventType): EventViewModelType {
    if (domainEventType === EventType.ANXIETY)
      return EventViewModelType.ANXIETY;
    return EventViewModelType.DEPRESSION;
  }
}

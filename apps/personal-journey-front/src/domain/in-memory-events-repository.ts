import { Injectable } from '@angular/core';
import { EventsRepository } from './events.repository';
import { Event } from './event';
import {
  domainEvent1,
  domainEvent2,
  domainEvent3,
} from '../tests/domain-events';

@Injectable({
  providedIn: 'root',
})
export class InMemoryEventsRepository implements EventsRepository {
  readonly #events: Event[] = [domainEvent1, domainEvent2, domainEvent3];

  listEvents(): Event[] {
    return this.#events;
  }

  saveEvent(newEvent: Event): void {
    this.#events.push(newEvent);
  }
}

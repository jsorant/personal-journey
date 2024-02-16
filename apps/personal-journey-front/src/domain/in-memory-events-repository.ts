import { Injectable } from '@angular/core';
import { EventsRepository } from './events.repository';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class InMemoryEventsRepository implements EventsRepository {
  readonly #events: Event[] = [
    {
      date: new Date('2024-01-02 08:00'),
      thoughts: 'Vertiges',
    },
    {
      date: new Date('2024-01-15 20:00'),
      thoughts: 'Tremblements',
    },
  ];

  listEvents(): Event[] {
    return this.#events;
  }

  saveEvent(newEvent: Event): void {
    this.#events.push(newEvent);
  }
}

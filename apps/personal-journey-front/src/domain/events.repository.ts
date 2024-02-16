import { Event } from './event';

export interface EventsRepository {
  listEvents(): Event[];

  saveEvent(newEvent: Event): void;
}

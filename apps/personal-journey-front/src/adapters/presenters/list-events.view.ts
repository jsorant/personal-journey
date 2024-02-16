import { Event } from './event';

export interface ListEventsView {
  eventsUpdated(events: Event[]): void;
}

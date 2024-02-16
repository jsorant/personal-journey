import { Event } from './list-events.presenter';

export interface ListEventsView {
  eventsUpdated(events: Event[]): void;
}

import { Event } from './event';

export interface ListEventsPresenter {
  getEvents(): Event[];
}

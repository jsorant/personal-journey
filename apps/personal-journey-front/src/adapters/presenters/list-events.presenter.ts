import { ListEventsView } from './list-events.view';
import { Event } from './event';

export interface ListEventsPresenter {
  setView(view: ListEventsView): void;
  initialEvents(): Event[];
}

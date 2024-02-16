import { ListEventsView } from './list-events.view';

export interface Event {
  date: Date;
  thoughts: string;
}

export interface ListEventsPresenter {
  setView(view: ListEventsView): void;
  initialEvents(): Event[];
}

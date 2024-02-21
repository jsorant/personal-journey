import { EventViewModel } from './event-view-model';

export interface ListEventsPresenter {
  getEvents(): EventViewModel[];
}

import { EventViewModel } from '../event-view-model';

export interface HistoryPresenter {
  getEvents(): EventViewModel[];
}

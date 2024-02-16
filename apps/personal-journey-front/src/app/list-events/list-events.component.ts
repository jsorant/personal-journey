import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEventsPresenter } from '../../adapters/presenters/list-events.presenter';
import { ListEventsView } from '../../adapters/presenters/list-events.view';
import { Event } from '../../adapters/presenters/event';
import { EventItemComponent } from '../event-item/event-item.component';

@Component({
  selector: 'duckrulz-list-events',
  standalone: true,
  imports: [EventItemComponent, CommonModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css',
})
export class ListEventsComponent implements ListEventsView {
  readonly #presenter: ListEventsPresenter;
  events: Event[];

  constructor(@Inject('ListEventsPresenter') presenter: ListEventsPresenter) {
    this.#presenter = presenter;
    this.#presenter.setView(this);
    this.events = presenter.initialEvents();
  }

  eventsUpdated(events: Event[]): void {
    this.events = events;
  }
}

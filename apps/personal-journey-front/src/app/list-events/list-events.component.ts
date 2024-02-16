import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEventsPresenter } from '../../adapters/presenters/list-events.presenter';
import { Event } from '../../adapters/presenters/event';
import { EventItemComponent } from '../event-item/event-item.component';

@Component({
  selector: 'duckrulz-list-events',
  standalone: true,
  imports: [EventItemComponent, CommonModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css',
})
export class ListEventsComponent {
  events: Event[];

  constructor(@Inject('ListEventsPresenter') presenter: ListEventsPresenter) {
    this.events = presenter.getEvents();
  }
}

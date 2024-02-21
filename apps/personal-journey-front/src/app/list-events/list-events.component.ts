import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListEventsPresenter } from '../../adapters/presenters/list-events.presenter';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  EventViewModel,
  EventViewModelType,
} from '../../adapters/presenters/event-view-model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'duckrulz-list-events',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css',
})
export class ListEventsComponent {
  events: EventViewModel[];

  constructor(@Inject('ListEventsPresenter') presenter: ListEventsPresenter) {
    this.events = presenter.getEvents();
  }

  protected readonly EventViewModel = EventViewModel;
  protected readonly EventViewModelType = EventViewModelType;
}

import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistoryPresenter } from '../../adapters/presenters/history/history.presenter';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  EventViewModel,
  EventViewModelType,
} from '../../adapters/presenters/event-view-model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'duckrulz-history',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  events: EventViewModel[];

  constructor(@Inject('HistoryPresenter') presenter: HistoryPresenter) {
    this.events = presenter.getEvents();
  }

  protected readonly EventViewModel = EventViewModel;
  protected readonly EventViewModelType = EventViewModelType;
}

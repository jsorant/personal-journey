import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { AddEventPresenterImpl } from '../adapters/presenters/add-event-presenter-impl';
import { InMemoryEventsRepository } from '../domain/in-memory-events-repository';
import { CurrentDateImpl } from '../adapters/current-date-impl';
import { ListEventsComponent } from './list-events/list-events.component';
import { ListEventsPresenterImpl } from '../adapters/presenters/list-events-presenter.impl';

@Component({
  standalone: true,
  imports: [
    AddEventComponent,
    ListEventsComponent,
    RouterModule,
    NgOptimizedImage,
  ],
  selector: 'duckrulz-personal-journey-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: 'ListEventsPresenter', useClass: ListEventsPresenterImpl },
    { provide: 'AddEventPresenter', useClass: AddEventPresenterImpl },
    { provide: 'EventsRepository', useClass: InMemoryEventsRepository },
    { provide: 'CurrentDate', useClass: CurrentDateImpl },
  ],
})
export class AppComponent {
  title = 'Personal Journey';
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { AddEventPresenterImpl } from '../adapters/presenters/add-event-presenter-impl';
import { InMemoryEventsRepository } from '../domain/in-memory-events-repository.service';
import { CurrentDateImpl } from '../adapters/current-date-impl';

@Component({
  standalone: true,
  imports: [AddEventComponent, RouterModule, NgOptimizedImage],
  selector: 'duckrulz-personal-journey-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: 'AddEventPresenter', useClass: AddEventPresenterImpl },
    { provide: 'EventsRepository', useClass: InMemoryEventsRepository },
    { provide: 'CurrentDate', useClass: CurrentDateImpl },
  ],
})
export class AppComponent {
  title = 'Personal Journey';
}

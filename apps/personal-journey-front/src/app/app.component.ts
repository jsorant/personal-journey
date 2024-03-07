import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { AddEventPresenterImpl } from '../adapters/presenters/add-event/add-event-presenter-impl';
import { HistoryComponent } from './history/history.component';
import { HistoryPresenterImpl } from '../adapters/presenters/history/history-presenter-impl';
import { InMemoryEventsRepository } from '../domain/in-memory-events-repository';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './navigation/header/header.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UuidV4GeneratorImpl } from '../secondary/uuid-v4-generator-impl';
import { SituationService } from '../adapters/services/situation-service';
import { SituationFactory } from '../domain/entities/situation/situation-factory';
import { InMemorySituationRepository } from '../adapters/services/in-memory-situation-repository';
import { CurrentDateImpl } from '../shared-kernel/current-date-impl';

export const situationServiceFactory = () => {
  const uuidGenerator = new UuidV4GeneratorImpl();
  const currentDate = new CurrentDateImpl();
  const situationFactory = new SituationFactory(uuidGenerator, currentDate);
  const situationsRepository = new InMemorySituationRepository(
    situationFactory
  );
  return new SituationService(situationsRepository);
}; // Deps to have a situation repository ?

@Component({
  standalone: true,
  imports: [
    AddEventComponent,
    HistoryComponent,
    RouterModule,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
  ],
  selector: 'duckrulz-personal-journey-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: 'HistoryPresenter', useClass: HistoryPresenterImpl },
    { provide: 'AddEventPresenter', useClass: AddEventPresenterImpl },
    { provide: 'EventsRepository', useClass: InMemoryEventsRepository },
    { provide: 'CurrentDate', useClass: CurrentDateImpl },
    { provide: SituationService, useFactory: situationServiceFactory },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class AppComponent {
  title = 'Personal Journey';
}

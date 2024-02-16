import { Route } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { ListEventsComponent } from './list-events/list-events.component';

export const appRoutes: Route[] = [
  { path: 'events/add', component: AddEventComponent },
  { path: 'events/list', component: ListEventsComponent },
];

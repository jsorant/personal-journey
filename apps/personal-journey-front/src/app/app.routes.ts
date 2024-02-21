import { Route } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events/add', component: AddEventComponent },
  { path: 'history', component: HistoryComponent },
];

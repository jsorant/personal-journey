import { Route } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { SituationPassThroughComponent } from './situation-pass-through/situation-pass-through.component';
import { SituationPassThroughIntroComponent } from './situation-pass-through/intro/situation-pass-through-intro.component';
import { SituationPassThroughPhysicalSymptomsComponent } from './situation-pass-through/physical-symptoms/situation-pass-through-physical-symptoms.component';

export const HOME_ROUTE = '/home';
export const ADD_EVENT_ROUTE = '/events/add';
export const HISTORY_ROUTE = '/history';
export const PHYSICAL_SYMPTOMS_ROUTE =
  '/situation/pass-through/physical-symptoms';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events/add', component: AddEventComponent },
  { path: 'history', component: HistoryComponent },
  {
    path: 'situation/pass-through',
    component: SituationPassThroughComponent,
    children: [
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full',
      },
      {
        path: 'intro',
        component: SituationPassThroughIntroComponent,
      },
      {
        path: 'physical-symptoms',
        component: SituationPassThroughPhysicalSymptomsComponent,
      },
    ],
  },
];

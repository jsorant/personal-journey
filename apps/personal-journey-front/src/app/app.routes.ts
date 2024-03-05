import { Route } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { SituationPassThroughComponent } from './situation-pass-through/situation-pass-through.component';
import { IntroComponent } from './situation-pass-through/intro/intro.component';
import { PhysicalSymptomsComponent } from './situation-pass-through/physical-symptoms/physical-symptoms.component';
import { DescriptionComponent } from './situation-pass-through/description/description.component';
import { ExitDescriptionComponent } from './situation-pass-through/exit-description/exit-description.component';
import { EmotionsComponent } from './situation-pass-through/emotions/emotions.component';
import { TriggerThoughtsComponent } from './situation-pass-through/triggers-thoughts/trigger-thoughts.component';
import { TriggerNeedsComponent } from './situation-pass-through/triggers-needs/trigger-needs.component';
import { AutoPilotComponent } from './situation-pass-through/auto-pilot/auto-pilot.component';
import { MemoriesComponent } from './situation-pass-through/memories/memories.component';
import { DurationComponent } from './situation-pass-through/duration/duration.component';

export const HOME_ROUTE = '/home';
export const ADD_EVENT_ROUTE = '/events/add';
export const HISTORY_ROUTE = '/history';

export const SITUATION_PASS_THROUGH_ROUTE = '/situation/pass-through/intro';
export const PHYSICAL_SYMPTOMS_ROUTE =
  '/situation/pass-through/physical-symptoms';
export const DESCRIPTION_ROUTE = '/situation/pass-through/description';
export const EXIT_DESCRIPTION_ROUTE =
  '/situation/pass-through/exit-description';
export const EMOTIONS_ROUTE = '/situation/pass-through/emotions';
export const TRIGGERS_THOUGHTS_ROUTE =
  '/situation/pass-through/triggers-thoughts';
export const TRIGGERS_NEEDS_ROUTE = '/situation/pass-through/triggers-needs';
export const AUTO_PILOT_ROUTE = '/situation/pass-through/auto-pilot';
export const MEMORIES_ROUTE = '/situation/pass-through/memories';
export const DURATION_ROUTE = '/situation/pass-through/duration';

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
        component: IntroComponent,
      },
      {
        path: 'physical-symptoms',
        component: PhysicalSymptomsComponent,
      },
      {
        path: 'description',
        component: DescriptionComponent,
      },
      {
        path: 'exit-description',
        component: ExitDescriptionComponent,
      },
      {
        path: 'emotions',
        component: EmotionsComponent,
      },
      {
        path: 'triggers-thoughts',
        component: TriggerThoughtsComponent,
      },
      {
        path: 'triggers-needs',
        component: TriggerNeedsComponent,
      },
      {
        path: 'auto-pilot',
        component: AutoPilotComponent,
      },
      {
        path: 'memories',
        component: MemoriesComponent,
      },
      {
        path: 'duration',
        component: DurationComponent,
      },
    ],
  },
];

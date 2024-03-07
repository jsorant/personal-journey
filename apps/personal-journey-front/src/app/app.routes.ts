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
import { MySituationsComponent } from './my-situations/my-situations.component';

export const HOME_ROUTE = '/home';
export const ADD_EVENT_ROUTE = '/events/add';
export const HISTORY_ROUTE = '/history';

export const SITUATION_PASS_THROUGH_ROUTE = '/situation/pass-through/intro';

export const MY_SITUATIONS_ROUTE = '/my-situations';

const SITUATION_PASS_THROUGH_BASE_PARTS = ['situation', 'pass-through'];

export function physicalSymptomsRoute(situationId: string) {
  return [
    ...SITUATION_PASS_THROUGH_BASE_PARTS,
    situationId,
    'physical-symptoms',
  ];
}

export function descriptionRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'description'];
}

export function exitDescriptionRoute(situationId: string) {
  return [
    ...SITUATION_PASS_THROUGH_BASE_PARTS,
    situationId,
    'exit-description',
  ];
}

export function emotionsRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'emotions'];
}

export function triggersThoughtsRoute(situationId: string) {
  return [
    ...SITUATION_PASS_THROUGH_BASE_PARTS,
    situationId,
    'triggers-thoughts',
  ];
}

export function triggersNeedsRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'triggers-needs'];
}

export function autoPilotsRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'auto-pilots'];
}

export function memoriesRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'memories'];
}

export function durationRoute(situationId: string) {
  return [...SITUATION_PASS_THROUGH_BASE_PARTS, situationId, 'duration'];
}

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events/add', component: AddEventComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'my-situations', component: MySituationsComponent },
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
        path: ':situationId/physical-symptoms',
        component: PhysicalSymptomsComponent,
      },
      {
        path: ':situationId/description',
        component: DescriptionComponent,
      },
      {
        path: ':situationId/exit-description',
        component: ExitDescriptionComponent,
      },
      {
        path: ':situationId/emotions',
        component: EmotionsComponent,
      },
      {
        path: ':situationId/triggers-thoughts',
        component: TriggerThoughtsComponent,
      },
      {
        path: ':situationId/triggers-needs',
        component: TriggerNeedsComponent,
      },
      {
        path: ':situationId/auto-pilots',
        component: AutoPilotComponent,
      },
      {
        path: ':situationId/memories',
        component: MemoriesComponent,
      },
      {
        path: ':situationId/duration',
        component: DurationComponent,
      },
    ],
  },
];

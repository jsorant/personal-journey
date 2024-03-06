import { Component } from '@angular/core';
import {
  ADD_EVENT_ROUTE,
  HISTORY_ROUTE,
  SITUATION_PASS_THROUGH_ROUTE,
} from '../app.routes';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'duckrulz-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
})
export class HomeComponent {
  addSituationRoute = SITUATION_PASS_THROUGH_ROUTE;
  historyRoute = HISTORY_ROUTE;
  addEventRoute = ADD_EVENT_ROUTE;
}

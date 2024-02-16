import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../adapters/presenters/event';

@Component({
  selector: 'duckrulz-event-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {
  @Input() event: Event | undefined;
}

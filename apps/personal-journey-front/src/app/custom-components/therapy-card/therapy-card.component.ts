import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'duckrulz-therapy-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './therapy-card.component.html',
  styleUrl: './therapy-card.component.css',
})
export class TherapyCardComponent {
  @Input() descriptions?: string[];
}

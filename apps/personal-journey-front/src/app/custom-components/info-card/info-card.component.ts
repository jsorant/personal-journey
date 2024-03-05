import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'duckrulz-info-card',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  @Input() title?: string;
  @Input() descriptions?: string[];
  @Input() examples?: string;
}

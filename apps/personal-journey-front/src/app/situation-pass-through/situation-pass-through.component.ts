import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'duckrulz-situation-pass-through',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './situation-pass-through.component.html',
  styleUrl: './situation-pass-through.component.css',
})
export class SituationPassThroughComponent {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  selector: 'duckrulz-personal-journey-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Personal Journey';
}

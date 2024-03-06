import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'duckrulz-steps-buttons',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './steps-buttons.component.html',
  styleUrl: './steps-buttons.component.css',
})
export class StepsButtonsComponent {
  @Output() previousButtonClicked = new EventEmitter<void>();
  @Output() ignoreButtonClicked = new EventEmitter<void>();
  @Output() submitButtonClicked = new EventEmitter<void>();

  @Input() hidePreviousButton?: string;
  @Input() displayIgnoreButton?: string;

  @Input() previousButtonText = 'Étape précédente';
  @Input() ignoreButtonText = 'Ignorer';
  @Input() submitButtonText = 'Étape suivante';

  onPrevClicked() {
    this.previousButtonClicked.emit();
  }

  onIgnoreClicked() {
    this.ignoreButtonClicked.emit();
  }

  onSubmitClicked() {
    this.submitButtonClicked.emit();
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MEMORIES_ROUTE } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'duckrulz-duration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
  ],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.css',
})
export class DurationComponent {
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  readonly form: FormGroup = this.#formBuilder.group({
    duration: '',
  });

  infosTitle = 'La durée de la situation';
  infoDescriptions = [
    'La durée de la situation correspond au temps nécessaire pour retrouver un confort (niveau de perturbation compris entre 1 et 5).',
    "Durant l'analyse de la situation, si votre niveau de perturbation est repassé au dessus de 5 plusieurs fois, retenez le dernier retour au confort pour déterminer la durée de la situation.",
  ];

  async onPrevClicked() {
    await this.#router.navigate([MEMORIES_ROUTE]);
  }

  onFinishClicked() {}
}

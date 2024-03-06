import { Component, inject, OnInit } from '@angular/core';
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
import { memoriesRoute } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';

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
    StepsButtonsComponent,
  ],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.css',
})
export class DurationComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  readonly form: FormGroup = this.#formBuilder.group({
    duration: '',
  });

  situationId = '';

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = this.#route.snapshot.paramMap.get('id')!;
    console.log(id);
    //this.#hero$ = this.#service.getHero(id);
    this.situationId = id;
  }

  infosTitle = 'La durée de la situation';
  infoDescriptions = [
    'La durée de la situation correspond au temps nécessaire pour retrouver un confort (niveau de perturbation compris entre 1 et 5).',
    "Durant l'analyse de la situation, si votre niveau de perturbation est repassé au dessus de 5 plusieurs fois, retenez le dernier retour au confort pour déterminer la durée de la situation.",
  ];

  async onPrevClicked() {
    await this.#router.navigate(memoriesRoute(this.situationId));
  }

  onFinishClicked() {
    console.log('FINISHED');
  }
}

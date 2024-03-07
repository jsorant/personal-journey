import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InfoCardComponent } from '../../custom-components/info-card/info-card.component';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { autoPilotsRoute, triggersThoughtsRoute } from '../../app.routes';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-trigger-needs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MatButton,
    MatCheckbox,
    ReactiveFormsModule,
    TherapyCardComponent,
    StepsButtonsComponent,
  ],
  templateUrl: './trigger-needs.component.html',
  styleUrl: './trigger-needs.component.css',
})
export class TriggerNeedsComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;
  readonly #situationService: SituationService = inject(SituationService);

  readonly infosTitle = 'Déclencheurs - Mes besoins non satisfaits';
  readonly infoDescriptions = [
    "Un déclencheur correspond à quelque chose qui augmente l'inconfort.",
    'Nous nous intéressons ici aux déclencheurs relatifs aux besoins non satisfaits.',
    "Il existe cinq grands types de besoins : la survie, le confort, l'accomplissement, la relation, la gratitude.",
  ];

  therapyDescriptions = [
    "J'identifie les besoins qui peuvent jouer un rôle déclencheur.",
    'Ainsi :',
    "- J'apprends à mieux me connaître en comprenant mes besoins",
    "- Je peux à l'avenir identifier plus rapidement quel besoin n'est pas satisfait",
  ];

  readonly needsTypesData = this.#situationService.allNeeds();

  situationId = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      needsTypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  private addCheckboxes() {
    this.needsTypesData.forEach(() =>
      this.needsTypesFormArray().push(new FormControl(false))
    );
  }

  needsTypesFormArray(): FormArray<FormControl> {
    return this.form.get('needsTypes') as FormArray;
  }

  async onPrevClicked() {
    await this.#router.navigate(triggersThoughtsRoute(this.situationId));
  }

  async onNextClicked() {
    await this.#situationService.addNeeds(
      this.selectedNeeds(),
      this.situationId
    );

    await this.#router.navigate(autoPilotsRoute(this.situationId));
  }

  private selectedNeeds() {
    return this.form.value.needsTypes
      .map((checked: boolean, index: number) =>
        checked ? this.needsTypesData[index] : null
      )
      .filter((name: string | null) => name !== null);
  }
}

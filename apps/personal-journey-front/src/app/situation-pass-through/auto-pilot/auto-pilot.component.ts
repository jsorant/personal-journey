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
import { memoriesRoute, triggersNeedsRoute } from '../../app.routes';
import { TherapyCardComponent } from '../../custom-components/therapy-card/therapy-card.component';
import { StepsButtonsComponent } from '../../custom-components/steps-buttons/steps-buttons.component';
import { SituationService } from '../../../adapters/services/situation-service';

@Component({
  selector: 'duckrulz-situation-pass-through-auto-pilot',
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
  templateUrl: './auto-pilot.component.html',
  styleUrl: './auto-pilot.component.css',
})
export class AutoPilotComponent implements OnInit {
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #router: Router = inject(Router);
  readonly form: FormGroup;
  readonly #situationService: SituationService = inject(SituationService);

  infosTitle = 'Mes pilotes automatiques';
  infoDescriptions = [
    'Les pilotes automatiques sont de mécanismes innés et nécessaire à notre survie dans des situations de danger.',
    "Cependant, il peuvent dans certains cas s'exprimer très fortement, parfois en l'absence de menace concrète.",
    "Ils sont au nombre de cinq : le combat, la fuite, la sidération, l'agrippement et la soumission.",
    '- Le combat consiste à affronter physiquement une menace.',
    '- La fuite consiste à éviter une menace.',
    '- La sidération est un mécanisme qui consiste à couper brièvement le flux de pensées pour permettre une réaction rapide face au danger. Il devient problématique lorsqu\'elle dure dans le temps. Exemples : "j\'hallucine", "mon patron me hurlait dessus, je suis resté figé, de retour à mon bureau, je suis resté bloqué encore un moment".',
    "- L'agrippement est à la base un mécanisme propre au bébé pour trouver de l'aide (au pouce, à la tétine, à sa maman). Il peut se manifester à l'âge adulte par un attachement aux êtres humains ou aux objets et substances. Exemples : attachement à l'agresseur, addictions (alcool, drogue, sexe, TV...)",
    "- La soumission consiste à s'écraser devant la menace. Exemple : la souris fait le mort devant le chat pour éviter d'être mangée.",
  ];
  infoExamples =
    "Exemple chez le lapin : Un lapin est au milieu de la route en pleine nuit. Une voiture arrive et l'éblouit avec ses phares. Il entre dans une phase de sidération pendant un court instant pour couper ses pensées puis active la fuite pour survivre.";

  readonly therapyDescriptions = [
    'J’apprends à mieux me connaître en comprenant mon mode de survie.',
    'Je comprends mieux ma manière d’interagir en société.',
  ];

  readonly autoPilotsData = this.#situationService.allAutoPilots();

  situationId = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autoPilotTypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  ngOnInit() {
    this.situationId = <string>this.#route.snapshot.paramMap.get('situationId');
  }

  private addCheckboxes() {
    this.autoPilotsData.forEach(() =>
      this.autoPilotTypesFormArray().push(new FormControl(false))
    );
  }

  autoPilotTypesFormArray(): FormArray<FormControl> {
    return this.form.get('autoPilotTypes') as FormArray;
  }

  async onPrevClicked() {
    await this.#router.navigate(triggersNeedsRoute(this.situationId));
  }

  async onNextClicked() {
    await this.#situationService.addAutoPilots(
      this.selectedAutoPilots(),
      this.situationId
    );

    await this.#router.navigate(memoriesRoute(this.situationId));
  }

  private selectedAutoPilots() {
    return this.form.value.autoPilotTypes
      .map((checked: boolean, index: number) =>
        checked ? this.autoPilotsData[index] : null
      )
      .filter((name: string | null) => name !== null);
  }
}

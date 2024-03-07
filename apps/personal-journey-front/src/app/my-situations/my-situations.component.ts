import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SituationService } from '../../adapters/services/situation-service';
import { SituationViewModel } from '../../adapters/services/situation-view-model';

@Component({
  selector: 'duckrulz-my-situations',
  standalone: true,
  imports: [CommonModule, MatDivider, MatListModule],
  templateUrl: './my-situations.component.html',
  styleUrl: './my-situations.component.css',
})
export class MySituationsComponent implements OnInit {
  readonly #situationService: SituationService = inject(SituationService);

  situations: SituationViewModel[] = [];

  async ngOnInit() {
    this.situations = await this.#situationService.getAllSituations();
  }
}

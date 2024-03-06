import { SituationFactory } from '../../domain/entities/situation/situation-factory';
import { Injectable } from '@angular/core';
import { Situation } from '../../domain/entities/situation/situation';
import { SituationId } from '../../domain/entities/situation/value-objects/situation-id';

@Injectable({
  providedIn: 'root',
})
export class SituationService {
  readonly #situations: Situation[] = [];

  constructor(private readonly situationFactory: SituationFactory) {}

  async createNewSituation() {
    const newSituation = this.situationFactory.createSituation();
    this.#situations.push(newSituation);
    return newSituation;
  }

  async getSituationWithId(id: string) {
    const idToFind = SituationId.of(id);
    return this.#situations.find((situation: Situation) => {
      situation.id.equals(idToFind);
    });
  }
}

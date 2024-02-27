import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { SituationId } from './value-objects/situation-id';
import { Situation } from './situation';

export class SituationFactory {
  #generator: UuidV4Generator;

  constructor(generator: UuidV4Generator) {
    this.#generator = generator;
  }

  createSituation() {
    const id = SituationId.of(this.#generator.generate());
    return Situation.buildWithId(id);
  }
}
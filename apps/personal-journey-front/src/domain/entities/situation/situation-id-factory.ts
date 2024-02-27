import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { SituationId } from './value-objects/situation-id';

export class SituationIdFactory {
  #generator: UuidV4Generator;

  constructor(generator: UuidV4Generator) {
    this.#generator = generator;
  }

  create(): SituationId {
    return SituationId.of(this.#generator.generate());
  }
}

import { SituationId } from './value-objects/situation-id';
import { Situation } from './situation';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';

export class SituationFactory {
  constructor(private readonly generator: UuidV4Generator) {}

  createSituation() {
    const id = SituationId.of(this.generator.generate());
    return Situation.buildWithId(id);
  }
}

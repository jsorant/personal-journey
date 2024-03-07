import { SituationId } from './value-objects/situation-id';
import { Situation } from './situation';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { CurrentDate } from '../../../shared-kernel/current-date';
import { CreationDate } from './value-objects/creation-date';

export class SituationFactory {
  constructor(
    private readonly generator: UuidV4Generator,
    private readonly currentDate: CurrentDate
  ) {}

  createSituation() {
    const id = SituationId.of(this.generator.generate());
    const date = CreationDate.of(this.currentDate.value());

    return Situation.buildWithIdAndDate(id, date);
  }
}

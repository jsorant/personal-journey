import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { CurrentDate } from '../../../shared-kernel/current-date';
import { Situation } from '../../entities/situation/situation';
import { SituationCreated } from '../situation-created';
import { BaseEventFactory } from './base-event-factory';

export class SituationCreatedFactory extends BaseEventFactory {
  constructor(generator: UuidV4Generator, currentDate: CurrentDate) {
    super(generator, currentDate);
  }

  generateFrom(aBlankSituation: Situation): SituationCreated {
    return {
      ...this.baseEvent(),
      situationId: aBlankSituation.id,
      physicalSymptoms: aBlankSituation.physicalSymptoms,
    };
  }
}

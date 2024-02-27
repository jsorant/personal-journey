import { CreateNewSituationEvent } from '../create-new-situation-event';
import { aBlankSituation } from '../../../tests-utils/domain/fixtures';
import { CreateNewSituationEventFactory } from './create-new-situation-event-factory';
import {
  buildMockUuidv4Generator,
  buildMockCurrentDate,
} from '../../../tests-utils/domain/mocks';

describe(CreateNewSituationEventFactory.name, () => {
  it('should generate an event based on a random generator and the current date', () => {
    const event: CreateNewSituationEvent = new CreateNewSituationEventFactory(
      buildMockUuidv4Generator(),
      buildMockCurrentDate()
    ).generateFrom(aBlankSituation);

    expect(event.situationId).toStrictEqual(aBlankSituation.id);
    expect(event.physicalSymptoms).toStrictEqual(
      aBlankSituation.physicalSymptoms
    );
  });
});

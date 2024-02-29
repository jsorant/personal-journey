import { SituationCreated } from '../situation-created';
import { aBlankSituation } from '../../../tests-utils/domain/fixtures';
import { SituationCreatedFactory } from './situation-created-factory';
import {
  buildMockUuidv4Generator,
  buildMockCurrentDate,
} from '../../../tests-utils/domain/mocks';

describe(SituationCreatedFactory.name, () => {
  it('should generate an event based on a random generator and the current date', () => {
    const event: SituationCreated = new SituationCreatedFactory(
      buildMockUuidv4Generator(),
      buildMockCurrentDate()
    ).generateFrom(aBlankSituation);

    expect(event.situationId).toStrictEqual(aBlankSituation.id);
    expect(event.physicalSymptoms).toStrictEqual(
      aBlankSituation.physicalSymptoms
    );
  });
});

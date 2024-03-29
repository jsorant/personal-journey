import { Situation } from './situation';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { aDate, anUuidV4 } from '../../../tests-utils/domain/fixtures';
import { mock } from 'ts-jest-mocker';
import { SituationFactory } from './situation-factory';
import { CurrentDate } from '../../../shared-kernel/current-date';

describe(SituationFactory.name, () => {
  const mockGenerator = mock<UuidV4Generator>();
  mockGenerator.generate.mockReturnValue(anUuidV4);
  const mockCurrentDate = mock<CurrentDate>();
  mockCurrentDate.value.mockReturnValue(aDate);
  const sut = new SituationFactory(mockGenerator, mockCurrentDate);

  it('should create a situation with a generated id', () => {
    const situation: Situation = sut.createSituation();

    expect(situation.id.value).toStrictEqual(anUuidV4);
  });

  it('should create a situation with current date', () => {
    const situation: Situation = sut.createSituation();

    expect(situation.creationDate.value).toStrictEqual(aDate);
  });
});

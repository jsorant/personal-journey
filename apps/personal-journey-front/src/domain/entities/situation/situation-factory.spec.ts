import { Situation } from './situation';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { anUuidV4 } from '../../../tests-utils/domain/fixtures';
import { mock } from 'ts-jest-mocker';
import { SituationFactory } from './situation-factory';

describe(SituationFactory.name, () => {
  it('should create a situation with a generated id', () => {
    const mockGenerator = mock<UuidV4Generator>();
    mockGenerator.generate.mockReturnValue(anUuidV4);
    const sut = new SituationFactory(mockGenerator);

    const situation: Situation = sut.createSituation();

    expect(situation.id.value).toStrictEqual(anUuidV4);
  });
});

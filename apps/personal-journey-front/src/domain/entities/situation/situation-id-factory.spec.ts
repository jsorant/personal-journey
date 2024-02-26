import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { SituationIdFactory } from './situation-id-factory';
import { anUuidV4 } from '../../../tests-utils/domain/fixtures';
import { mock } from 'ts-jest-mocker';

describe(SituationIdFactory.name, () => {
  it('should create a situation with the correct unique identifier', () => {
    const mockGenerator = mock<UuidV4Generator>();
    mockGenerator.generate.mockReturnValue(anUuidV4);
    const factory = new SituationIdFactory(mockGenerator);

    const id = factory.create();

    expect(id.value).toStrictEqual(anUuidV4);
  });
});

import { DomainEventIdFactory } from './domain-event-id-factory';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { anUuidV4 } from '../../../tests-utils/domain/fixtures';
import { mock } from 'ts-jest-mocker';

describe(DomainEventIdFactory.name, () => {
  it('should create a situation with the correct unique identifier', () => {
    const mockGenerator = mock<UuidV4Generator>();
    mockGenerator.generate.mockReturnValue(anUuidV4);
    const factory = new DomainEventIdFactory(mockGenerator);

    const id = factory.create();

    expect(id.value).toStrictEqual(anUuidV4);
  });
});

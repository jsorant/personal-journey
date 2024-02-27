import { BaseEventFactory } from './base-event-factory';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { CurrentDate } from '../../../shared-kernel/current-date';
import { DomainEvent } from '../domain-event';
import { Mock, mock } from 'ts-jest-mocker';
import { aDate, anUuidV4 } from '../../../tests-utils/domain/fixtures';

interface SimpleEvent extends DomainEvent {
  readonly dummy: string;
}

class SimpleEventFactory extends BaseEventFactory {
  constructor(generator: UuidV4Generator, currentDate: CurrentDate) {
    super(generator, currentDate);
  }

  generate() {
    return {
      ...this.baseEvent(),
      dummy: 'dummy value',
    };
  }
}

describe(BaseEventFactory.name, () => {
  let mockGenerator: Mock<UuidV4Generator>;
  let mockCurrentDate: Mock<CurrentDate>;

  let sut: SimpleEventFactory;
  let generatedEvent: SimpleEvent;

  beforeEach(() => {
    mockGenerator = mock<UuidV4Generator>();
    mockGenerator.generate.mockReturnValue(anUuidV4);

    mockCurrentDate = mock<CurrentDate>();
    mockCurrentDate.value.mockReturnValue(aDate);

    sut = new SimpleEventFactory(mockGenerator, mockCurrentDate);
    generatedEvent = sut.generate();
  });

  it('should generate an event with a generated event', () => {
    expect(generatedEvent.id.value).toContain(anUuidV4);
    expect(generatedEvent.id.value).toContain('domain-event');
  });

  it('should generate an event with current date', () => {
    expect(generatedEvent.date).toStrictEqual(aDate);
  });
});

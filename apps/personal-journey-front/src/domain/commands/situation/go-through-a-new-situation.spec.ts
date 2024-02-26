import { CurrentDate } from '../../../shared-kernel/current-date';
import {
  aDate,
  aDomainEventId,
  aSituationId,
  somePhysicalSymptoms,
} from '../../../tests-utils/domain/fixtures';
import { Mock, mock } from 'ts-jest-mocker';
import { CreateNewSituationEvent } from '../../events/create-new-situation-event';
import { SituationIdFactory } from '../../entities/situation/situation-id-factory';
import { DomainEventIdFactory } from '../../events/factories/domain-event-id-factory';
import { DomainEventsEmitter } from '../../ports/domain-events-emitter';
import { GoThroughANewSituation } from './go-through-a-new-situation';
import { Situation } from '../../entities/situation/situation';
import { SituationRepository } from '../../ports/situation-repository';

describe(GoThroughANewSituation.name, () => {
  let sut: GoThroughANewSituation;

  let mockSituationIdFactory: Mock<SituationIdFactory>;
  let mockDomainEventIdFactory: Mock<DomainEventIdFactory>;
  let mockEventsEmitter: Mock<DomainEventsEmitter>;
  let mockCurrentDate: Mock<CurrentDate>;
  let mockSituationRepository: Mock<SituationRepository>;

  beforeEach(() => {
    mockSituationIdFactory = mock<SituationIdFactory>();
    mockSituationIdFactory.create.mockReturnValue(aSituationId);

    mockDomainEventIdFactory = mock<DomainEventIdFactory>();
    mockDomainEventIdFactory.create.mockReturnValue(aDomainEventId);

    mockEventsEmitter = mock<DomainEventsEmitter>();
    mockEventsEmitter.emitEvent.mockResolvedValue();

    mockCurrentDate = mock<CurrentDate>();
    mockCurrentDate.value.mockReturnValue(aDate);

    mockSituationRepository = mock<SituationRepository>();
    mockSituationRepository.add.mockResolvedValue();

    sut = new GoThroughANewSituation(
      mockCurrentDate,
      mockSituationIdFactory,
      mockDomainEventIdFactory,
      mockSituationRepository,
      mockEventsEmitter
    );
  });

  it('should return the new situation id', async () => {
    const newSituationId = await sut.execute(somePhysicalSymptoms);

    expect(newSituationId).toStrictEqual(aSituationId);
  });

  it('should add the new situation into the repository', async () => {
    await sut.execute(somePhysicalSymptoms);

    const expectedSituation = Situation.builder()
      .withId(aSituationId)
      .withPhysicalSymptoms(somePhysicalSymptoms)
      .build();
    expect(mockSituationRepository.add).toHaveBeenCalledWith(expectedSituation);
  });

  it('should generate a domain event', async () => {
    await sut.execute(somePhysicalSymptoms);

    const expectedEvent: CreateNewSituationEvent = {
      id: aDomainEventId,
      date: aDate,
      situationId: aSituationId,
      physicalSymptoms: somePhysicalSymptoms,
    };
    expect(mockEventsEmitter.emitEvent).toHaveBeenCalledWith(expectedEvent);
  });
});

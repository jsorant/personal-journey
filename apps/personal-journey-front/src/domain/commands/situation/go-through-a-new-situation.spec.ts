import {
  aBlankSituation,
  aDate,
  aDomainEventId,
  somePhysicalSymptoms,
} from '../../../tests-utils/domain/fixtures';
import { Mock, mock } from 'ts-jest-mocker';
import { DomainEventsEmitter } from '../../ports/domain-events-emitter';
import { GoThroughANewSituation } from './go-through-a-new-situation';
import { SituationRepository } from '../../ports/situation-repository';
import { SituationFactory } from '../../entities/situation/situation-factory';
import { CreateNewSituationEventFactory } from '../../events/factories/create-new-situation-event-factory';
import { CreateNewSituationEvent } from '../../events/create-new-situation-event';

const generatedSituation = aBlankSituation;
const symptoms = somePhysicalSymptoms;
const generatedEvent = {
  id: aDomainEventId,
  date: aDate,
  situationId: generatedSituation.id,
  physicalSymptoms: symptoms,
};

describe(GoThroughANewSituation.name, () => {
  let sut: GoThroughANewSituation;

  let mockSituationFactory: Mock<SituationFactory>;
  let mockEventFactory: Mock<CreateNewSituationEventFactory>;
  let mockEventsEmitter: Mock<DomainEventsEmitter>;
  let mockSituationRepository: Mock<SituationRepository>;

  beforeEach(() => {
    mockSituationFactory = mock<SituationFactory>();
    mockSituationFactory.createSituation.mockReturnValue(generatedSituation);

    mockEventFactory = mock<CreateNewSituationEventFactory>();
    mockEventFactory.generateFrom.mockReturnValue(generatedEvent);

    mockEventsEmitter = mock<DomainEventsEmitter>();
    mockEventsEmitter.emitEvent.mockResolvedValue();

    mockSituationRepository = mock<SituationRepository>();
    mockSituationRepository.add.mockResolvedValue();

    sut = new GoThroughANewSituation(
      mockSituationFactory,
      mockEventFactory,
      mockSituationRepository,
      mockEventsEmitter
    );
  });

  it('should return the new situation id', async () => {
    const newSituationId = await sut.executeWith(symptoms);

    expect(newSituationId).toStrictEqual(generatedSituation.id);
  });

  it('should add the new situation into the repository', async () => {
    await sut.executeWith(symptoms);

    const expectedSituation =
      generatedSituation.identifyPhysicalSymptoms(symptoms);

    expect(mockSituationRepository.add).toHaveBeenCalledWith(expectedSituation);
  });

  it('should generate a domain event', async () => {
    await sut.executeWith(symptoms);

    expect(mockEventsEmitter.emitEvent).toHaveBeenCalledTimes(1);
    const emittedEvent = mockEventsEmitter.emitEvent.mock
      .calls[0][0] as CreateNewSituationEvent;
    expect(emittedEvent.situationId).toStrictEqual(generatedSituation.id);
    expect(emittedEvent.physicalSymptoms).toStrictEqual(symptoms);
  });
});

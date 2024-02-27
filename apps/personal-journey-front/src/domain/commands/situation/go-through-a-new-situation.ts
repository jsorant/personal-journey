import { CurrentDate } from '../../../shared-kernel/current-date';
import { SituationIdFactory } from '../../entities/situation/situation-id-factory';
import { DomainEventIdFactory } from '../../events/factories/domain-event-id-factory';
import { DomainEventsEmitter } from '../../ports/domain-events-emitter';
import { PhysicalSymptoms } from '../../entities/situation/value-objects/physical-symptoms';
import { SituationId } from '../../entities/situation/value-objects/situation-id';
import { Situation } from '../../entities/situation/situation';
import { CreateNewSituationEvent } from '../../events/create-new-situation-event';
import { SituationRepository } from '../../ports/situation-repository';

export class GoThroughANewSituation {
  readonly #currentDate: CurrentDate;
  readonly #situationIdFactory: SituationIdFactory;
  readonly #domainEventIdFactory: DomainEventIdFactory;
  readonly #situationRepository: SituationRepository;
  readonly #eventsEmitter: DomainEventsEmitter;

  constructor(
    currentDate: CurrentDate,
    situationIdFactory: SituationIdFactory,
    domainEventIdFactory: DomainEventIdFactory,
    situationRepository: SituationRepository,
    eventsEmitter: DomainEventsEmitter
  ) {
    this.#currentDate = currentDate;
    this.#situationIdFactory = situationIdFactory;
    this.#domainEventIdFactory = domainEventIdFactory;
    this.#situationRepository = situationRepository;
    this.#eventsEmitter = eventsEmitter;
  }

  async execute(physicalSymptoms: PhysicalSymptoms[]): Promise<SituationId> {
    const newSituation = this.makeNewSituation(physicalSymptoms);
    await this.persist(newSituation);
    await this.emitDomainEvent(newSituation);
    return newSituation.id;
  }

  private makeNewSituation(physicalSymptoms: PhysicalSymptoms[]) {
    return Situation.builder()
      .withId(this.#situationIdFactory.create())
      .withPhysicalSymptoms(physicalSymptoms)
      .build();
  }

  private async persist(newSituation: Situation) {
    await this.#situationRepository.add(newSituation);
  }

  private async emitDomainEvent(newSituation: Situation) {
    const event: CreateNewSituationEvent = {
      id: this.#domainEventIdFactory.create(),
      date: this.#currentDate.value(),
      situationId: newSituation.id,
      physicalSymptoms: newSituation.physicalSymptoms,
    };
    await this.#eventsEmitter.emitEvent(event);
  }
}

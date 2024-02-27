import { DomainEventsEmitter } from '../../ports/domain-events-emitter';
import { PhysicalSymptoms } from '../../entities/situation/value-objects/physical-symptoms';
import { SituationId } from '../../entities/situation/value-objects/situation-id';
import { Situation } from '../../entities/situation/situation';
import { SituationRepository } from '../../ports/situation-repository';
import { SituationFactory } from '../../entities/situation/situation-factory';
import { CreateNewSituationEventFactory } from '../../events/factories/create-new-situation-event-factory';

export class GoThroughANewSituation {
  readonly #situationFactory: SituationFactory;
  readonly #eventFactory: CreateNewSituationEventFactory;
  readonly #situationRepository: SituationRepository;
  readonly #eventsEmitter: DomainEventsEmitter;

  constructor(
    situationFactory: SituationFactory,
    eventFactory: CreateNewSituationEventFactory,
    situationRepository: SituationRepository,
    eventsEmitter: DomainEventsEmitter
  ) {
    this.#situationFactory = situationFactory;
    this.#eventFactory = eventFactory;
    this.#situationRepository = situationRepository;
    this.#eventsEmitter = eventsEmitter;
  }

  async executeWith(
    physicalSymptoms: PhysicalSymptoms[]
  ): Promise<SituationId> {
    const newSituation = this.makeNewSituationAndIdentify(physicalSymptoms);
    await this.persist(newSituation);
    await this.emitDomainEvent(newSituation);
    return newSituation.id;
  }

  private makeNewSituationAndIdentify(
    somePhysicalSymptoms: PhysicalSymptoms[]
  ) {
    return this.#situationFactory
      .createSituation()
      .identifyPhysicalSymptoms(somePhysicalSymptoms);
  }

  private async persist(aSituation: Situation) {
    await this.#situationRepository.add(aSituation);
  }

  private async emitDomainEvent(aSituation: Situation) {
    const event = this.#eventFactory.generateFrom(aSituation);
    await this.#eventsEmitter.emitEvent(event);
  }
}

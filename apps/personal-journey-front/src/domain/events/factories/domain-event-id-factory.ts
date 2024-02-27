import { DomainEventId } from '../value-objects/domain-event-id';
import { UuidV4Generator } from '../../ports/uuid-v4-generator';

export class DomainEventIdFactory {
  #generator: UuidV4Generator;

  constructor(generator: UuidV4Generator) {
    this.#generator = generator;
  }

  create(): DomainEventId {
    return DomainEventId.of(this.#generator.generate());
  }
}

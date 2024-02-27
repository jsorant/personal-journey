import { UuidV4Generator } from '../../ports/uuid-v4-generator';
import { CurrentDate } from '../../../shared-kernel/current-date';
import { DomainEvent } from '../domain-event';
import { DomainEventId } from '../value-objects/domain-event-id';

const DOMAIN_EVENT_ID_PREFIX = 'domain-event-';

export abstract class BaseEventFactory {
  readonly #generator: UuidV4Generator;
  readonly #currentDate: CurrentDate;

  protected constructor(generator: UuidV4Generator, currentDate: CurrentDate) {
    this.#generator = generator;
    this.#currentDate = currentDate;
  }

  protected baseEvent(): DomainEvent {
    return {
      id: this.makeDomainEventId(),
      date: this.#currentDate.value(),
    };
  }

  private makeDomainEventId() {
    return DomainEventId.of(
      DOMAIN_EVENT_ID_PREFIX + this.#generator.generate()
    );
  }
}

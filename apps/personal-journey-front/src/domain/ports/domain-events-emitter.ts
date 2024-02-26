import { DomainEvent } from '../events/domain-event';

export interface DomainEventsEmitter {
  emitEvent(event: DomainEvent): Promise<void>;
}

import { DomainEventId } from './value-objects/domain-event-id';

export interface DomainEvent {
  readonly id: DomainEventId;
  readonly date: Date;
}

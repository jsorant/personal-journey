import { DomainEvent } from './domain-event';
import { PhysicalSymptoms } from '../entities/situation/value-objects/physical-symptoms';
import { SituationId } from '../entities/situation/value-objects/situation-id';

export interface SituationCreated extends DomainEvent {
  readonly situationId: SituationId;
  readonly physicalSymptoms: PhysicalSymptoms[];
}

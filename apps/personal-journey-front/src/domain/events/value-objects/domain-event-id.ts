import { assertMemberIsNotEmpty } from '../../../shared-kernel/assertions';

export class DomainEventId {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): DomainEventId {
    assertMemberIsNotEmpty('value', value, DomainEventId.name);
    return new DomainEventId(value);
  }
}

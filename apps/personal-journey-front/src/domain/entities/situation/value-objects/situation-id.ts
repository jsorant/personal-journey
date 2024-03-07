import { assertMemberIsNotEmpty } from '../../../../shared-kernel/assertions';

export class SituationId {
  value: string;

  equals(other: SituationId) {
    return this.value.localeCompare(other.value) === 0;
  }

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): SituationId {
    assertMemberIsNotEmpty('value', value, SituationId.name);
    return new SituationId(value);
  }
}

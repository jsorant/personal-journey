import { assertMemberIsNotEmpty } from '../../../../shared-kernel/assertions';

export class SituationId {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): SituationId {
    assertMemberIsNotEmpty('value', value, SituationId.name);
    return new SituationId(value);
  }
}

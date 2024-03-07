import { assertMemberIsNotEmpty } from '../../../../shared-kernel/assertions';

export class Memories {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): Memories {
    assertMemberIsNotEmpty('value', value, Memories.name);
    return new Memories(value);
  }
}

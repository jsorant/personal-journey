import { assertMemberIsNotEmpty } from '../../shared-kernel/assertions';

export class Description {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): Description {
    assertMemberIsNotEmpty('value', value, Description.name);
    return new Description(value);
  }
}

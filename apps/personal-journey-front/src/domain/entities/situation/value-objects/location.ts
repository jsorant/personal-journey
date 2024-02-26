import { assertMemberIsNotEmpty } from '../../../../shared-kernel/assertions';

export class Location {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): Location {
    assertMemberIsNotEmpty('value', value, Location.name);
    return new Location(value);
  }
}

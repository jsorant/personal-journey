import { assertMemberIsNotEmpty } from '../../../../shared-kernel/assertions';

export class ExitEvent {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string): ExitEvent {
    assertMemberIsNotEmpty('value', value, ExitEvent.name);
    return new ExitEvent(value);
  }
}

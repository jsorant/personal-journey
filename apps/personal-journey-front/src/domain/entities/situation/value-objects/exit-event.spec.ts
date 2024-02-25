import { EmptyMemberException } from '../../../../shared-kernel/empty-member-exception';
import { ExitEvent } from './exit-event';

describe(ExitEvent.name, () => {
  it('should build with a value', () => {
    const exitEvent = ExitEvent.of('Un évènement...');

    expect(exitEvent.value).toStrictEqual('Un évènement...');
  });

  it('should not build with an value', () => {
    expect(() => ExitEvent.of('')).toThrow(
      new EmptyMemberException('value', ExitEvent.name)
    );
  });
});

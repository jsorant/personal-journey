import { EmptyMemberException } from '../../../../shared-kernel/empty-member-exception';
import { Memories } from './memories';

describe(Memories.name, () => {
  it('should build with a value', () => {
    const memories = Memories.of('Un évènement...');

    expect(memories.value).toStrictEqual('Un évènement...');
  });

  it('should not build with an value', () => {
    expect(() => Memories.of('')).toThrow(
      new EmptyMemberException('value', Memories.name)
    );
  });
});

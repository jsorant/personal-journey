import { EmptyMemberException } from '../../shared-kernel/empty-member-exception';
import { Description } from './description';

describe(Description.name, () => {
  it('should build with a value', () => {
    const description = Description.of('Une description...');

    expect(description.value).toStrictEqual('Une description...');
  });

  it('should not build with an value', () => {
    expect(() => Description.of('')).toThrow(
      new EmptyMemberException('value', Description.name)
    );
  });
});

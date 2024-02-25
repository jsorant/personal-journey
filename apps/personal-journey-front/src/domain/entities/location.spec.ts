import { Location } from './location';
import { EmptyMemberException } from '../../shared-kernel/empty-member-exception';

describe(Location.name, () => {
  it('should build with value', () => {
    const location = Location.of('Au centre commercial');

    expect(location.value).toStrictEqual('Au centre commercial');
  });

  it('should not build with an value', () => {
    expect(() => Location.of('')).toThrow(
      new EmptyMemberException('value', 'Location')
    );
  });
});

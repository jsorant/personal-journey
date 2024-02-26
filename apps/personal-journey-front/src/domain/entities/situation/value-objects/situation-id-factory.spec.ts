import { SituationId } from './situation-id';
import { EmptyMemberException } from '../../../../shared-kernel/empty-member-exception';

describe(SituationId.name, () => {
  it('should not build with an empty value', () => {
    expect(() => SituationId.of('')).toThrow(
      new EmptyMemberException('value', SituationId.name)
    );
  });

  it('should build', () => {
    expect(() => SituationId.of('any-id')).not.toThrow();
  });
});

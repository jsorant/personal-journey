import { DomainEventId } from './domain-event-id';
import { EmptyMemberException } from '../../../shared-kernel/empty-member-exception';

describe(DomainEventId.name, () => {
  it('should not build with an empty value', () => {
    expect(() => DomainEventId.of('')).toThrow(
      new EmptyMemberException('value', DomainEventId.name)
    );
  });

  it('should build', () => {
    expect(() => DomainEventId.of('any-id')).not.toThrow();
  });
});

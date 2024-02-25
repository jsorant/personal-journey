import { MissingMemberException } from './missing-member-exception';
import { EmptyMemberException } from './empty-member-exception';

export function assertMemberIsDefined<TValue>(
  name: string,
  value: TValue | undefined,
  className: string
): TValue {
  if (value === undefined) throw new MissingMemberException(name, className);
  return value;
}

export function assertMemberIsNotEmpty(
  name: string,
  value: string,
  className: string
): void {
  if (value.length === 0) throw new EmptyMemberException(name, className);
}

export function assertMemberIsDefinedAndNotEmpty(
  name: string,
  value: string | undefined,
  className: string
): string {
  const definedValue = assertMemberIsDefined<string>(name, value, className);
  if (definedValue.length === 0)
    throw new EmptyMemberException(name, className);
  return definedValue;
}

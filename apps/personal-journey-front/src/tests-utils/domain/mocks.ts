import { mock, Mock } from 'ts-jest-mocker';
import { CurrentDate } from '../../shared-kernel/current-date';
import { UuidV4Generator } from '../../domain/ports/uuid-v4-generator';
import { aDate, anUuidV4 } from './fixtures';

export function buildMockCurrentDate(): Mock<CurrentDate> {
  const mockCurrentDate = mock<CurrentDate>();
  mockCurrentDate.value.mockReturnValue(aDate);
  return mockCurrentDate;
}

export function buildMockUuidv4Generator(): Mock<UuidV4Generator> {
  const mockGenerator = mock<UuidV4Generator>();
  mockGenerator.generate.mockReturnValue(anUuidV4);
  return mockGenerator;
}

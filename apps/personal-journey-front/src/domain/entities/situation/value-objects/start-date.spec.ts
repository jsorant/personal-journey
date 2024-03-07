import { StartDate } from './start-date';
import { aDate } from '../../../../tests-utils/domain/fixtures';

describe(StartDate.name, () => {
  it('should build with a date', () => {
    const startDate = StartDate.of(aDate);

    expect(startDate.value).toStrictEqual(aDate);
  });
});

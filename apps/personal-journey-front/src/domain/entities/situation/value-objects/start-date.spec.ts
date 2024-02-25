import { StartDate } from './start-date';

describe(StartDate.name, () => {
  it('should build with a date', () => {
    const aDate = new Date();

    const description = StartDate.of(aDate);

    expect(description.value).toStrictEqual(aDate);
  });
});

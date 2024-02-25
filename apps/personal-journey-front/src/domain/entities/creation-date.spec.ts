import { CreationDate } from './creation-date';

describe(CreationDate.name, () => {
  it('should build with a date', () => {
    const aDate = new Date();

    const description = CreationDate.of(aDate);

    expect(description.value).toStrictEqual(aDate);
  });
});

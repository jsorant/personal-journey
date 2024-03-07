import { CreationDate } from './creation-date';
import { aDate } from '../../../../tests-utils/domain/fixtures';

describe(CreationDate.name, () => {
  it('should build with a date', () => {
    const creationDate = CreationDate.of(aDate);

    expect(creationDate.value).toStrictEqual(aDate);
  });
});

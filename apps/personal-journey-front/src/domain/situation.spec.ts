import { CurrentDate } from '../shared-kernel/current-date';
import { mock } from 'ts-jest-mocker';
import { Situation } from './situation';

describe('', () => {
  it('should create a new situation with current date', () => {
    const now = new Date('2022-12-25 15:45');
    const currentDate = mock<CurrentDate>();
    currentDate.value.mockReturnValue(now);

    const situation = Situation.builder(currentDate).build();

    expect(situation.date).toStrictEqual(now);
  });
});

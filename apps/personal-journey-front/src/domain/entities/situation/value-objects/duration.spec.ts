import { Duration } from './duration';

describe(Duration.name, () => {
  it('should build with a value', () => {
    const duration = Duration.ofMinutes(10);

    expect(duration.valueInMinutes).toStrictEqual(10);
  });
});

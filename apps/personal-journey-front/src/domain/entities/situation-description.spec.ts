import { SituationDescription } from './situation-description';
import { aDate, aDescription, aLocation } from './fixtures';
import { MissingMemberException } from '../../shared-kernel/missing-member-exception';

describe(SituationDescription.name, () => {
  it('should build with a date, a location and a description', () => {
    const situationDescription = SituationDescription.builder()
      .withDate(aDate)
      .withLocation(aLocation)
      .withDescription(aDescription)
      .build();

    expect(situationDescription.date).toStrictEqual(aDate);
    expect(situationDescription.location).toStrictEqual(aLocation);
    expect(situationDescription.description).toStrictEqual(aDescription);
  });

  it('should not build without a date', () => {
    expect(() =>
      SituationDescription.builder()
        .withLocation(aLocation)
        .withDescription(aDescription)
        .build()
    ).toThrow(new MissingMemberException('date', 'SituationDescription'));
  });

  it('should not build without a location', () => {
    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withDescription(aDescription)
        .build()
    ).toThrow(new MissingMemberException('location', 'SituationDescription'));
  });

  it('should not build without a description', () => {
    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withLocation(aLocation)
        .build()
    ).toThrow(
      new MissingMemberException('description', 'SituationDescription')
    );
  });
});

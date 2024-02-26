import { SituationDescription } from './situation-description';
import {
  aStartDate,
  aDescription,
  aLocation,
} from '../../../../tests-utils/domain/fixtures';
import { MissingMemberException } from '../../../../shared-kernel/missing-member-exception';

describe(SituationDescription.name, () => {
  it('should build with a date, a location and a description', () => {
    const situationDescription = SituationDescription.builder()
      .withDate(aStartDate)
      .withLocation(aLocation)
      .withDescription(aDescription)
      .build();

    expect(situationDescription.date).toStrictEqual(aStartDate);
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
        .withDate(aStartDate)
        .withDescription(aDescription)
        .build()
    ).toThrow(new MissingMemberException('location', 'SituationDescription'));
  });

  it('should not build without a description', () => {
    expect(() =>
      SituationDescription.builder()
        .withDate(aStartDate)
        .withLocation(aLocation)
        .build()
    ).toThrow(
      new MissingMemberException('description', 'SituationDescription')
    );
  });
});

import { SituationDescription } from './situation-description';
import { aDate, aDescription, aLocation } from './fixtures';

describe(SituationDescription.name, () => {
  it('should build with a date, location and description', () => {
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
    ).toThrow('Cannot create a situation description without a date');
  });

  it('should not build without a location', () => {
    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withDescription(aDescription)
        .build()
    ).toThrow('Cannot create a situation description without a location');

    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withLocation('')
        .withDescription(aDescription)
        .build()
    ).toThrow('Cannot create a situation description without a location');
  });

  it('should not build without a description', () => {
    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withLocation(aLocation)
        .build()
    ).toThrow('Cannot create a situation description without a description');

    expect(() =>
      SituationDescription.builder()
        .withDate(aDate)
        .withLocation(aLocation)
        .withDescription('')
        .build()
    ).toThrow('Cannot create a situation description without a description');
  });
});

import { assertMemberIsDefined } from '../../shared-kernel/assertions';
import { Location } from './location';
import { Description } from './description';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace SituationDescription {
  type SituationDescriptionBuilder =
    typeof SituationDescription.SituationDescriptionBuilder.prototype;
}

export class SituationDescription {
  readonly date: Date;
  readonly location: Location;
  readonly description: Description;

  private constructor(
    builder: SituationDescription.SituationDescriptionBuilder
  ) {
    this.date = builder.date;
    this.location = builder.location;
    this.description = builder.description;
  }
  static builder(): SituationDescription.SituationDescriptionBuilder {
    return new SituationDescription.SituationDescriptionBuilder();
  }

  static SituationDescriptionBuilder = class {
    #date?: Date;
    #location?: Location;
    #description?: Description;

    get date(): Date {
      return assertMemberIsDefined<Date>(
        'date',
        this.#date,
        SituationDescription.name
      );
    }

    get location(): Location {
      return assertMemberIsDefined<Location>(
        'location',
        this.#location,
        SituationDescription.name
      );
    }

    get description(): Description {
      return assertMemberIsDefined<Description>(
        'description',
        this.#description,
        SituationDescription.name
      );
    }

    withDate(aDate: Date): SituationDescription.SituationDescriptionBuilder {
      this.#date = aDate;
      return this;
    }

    withLocation(
      aLocation: Location
    ): SituationDescription.SituationDescriptionBuilder {
      this.#location = aLocation;
      return this;
    }

    withDescription(
      aDescription: Description
    ): SituationDescription.SituationDescriptionBuilder {
      this.#description = aDescription;
      return this;
    }

    build(): SituationDescription {
      return new SituationDescription(this);
    }
  };
}

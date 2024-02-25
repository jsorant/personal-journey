import {
  assertMemberIsDefined,
  assertMemberIsDefinedAndNotEmpty,
} from '../../shared-kernel/assertions';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace SituationDescription {
  type SituationDescriptionBuilder =
    typeof SituationDescription.SituationDescriptionBuilder.prototype;
}

export class SituationDescription {
  readonly date: Date;
  readonly location: string;
  readonly description: string;

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
    #location?: string;
    #description?: string;

    get date(): Date {
      return assertMemberIsDefined<Date>(
        'date',
        this.#date,
        SituationDescription.name
      );
    }

    get location(): string {
      return assertMemberIsDefinedAndNotEmpty(
        'location',
        this.#location,
        SituationDescription.name
      );
    }

    get description(): string {
      return assertMemberIsDefinedAndNotEmpty(
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
      aLocation: string
    ): SituationDescription.SituationDescriptionBuilder {
      this.#location = aLocation;
      return this;
    }

    withDescription(
      aDescription: string
    ): SituationDescription.SituationDescriptionBuilder {
      this.#description = aDescription;
      return this;
    }

    build(): SituationDescription {
      return new SituationDescription(this);
    }
  };
}

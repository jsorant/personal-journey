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
      if (this.#date === undefined)
        throw new Error('Cannot create a situation description without a date');
      return this.#date;
    }

    get location(): string {
      if (this.#location === undefined || this.#location.length === 0)
        throw new Error(
          'Cannot create a situation description without a location'
        );
      return this.#location;
    }

    get description(): string {
      if (this.#description === undefined || this.#description.length === 0)
        throw new Error(
          'Cannot create a situation description without a description'
        );
      return this.#description;
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

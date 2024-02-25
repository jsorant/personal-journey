import { PhysicalSymptoms } from './physical-symptoms';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export interface SituationDescription {
  date: Date;
  location: string;
  description: string;
}

export class Situation {
  readonly creationDate: Date;
  readonly physicalSymptoms: PhysicalSymptoms[];
  readonly description?: SituationDescription;

  private constructor(builder: Situation.SituationBuilder) {
    this.creationDate = builder.creationDate;
    this.physicalSymptoms = builder.physicalSymptoms;
    this.description = builder.description;
  }
  static builder(): Situation.SituationBuilder {
    return new Situation.SituationBuilder();
  }

  private static builderWithCurrentState(
    situation: Situation
  ): Situation.SituationBuilder {
    return new Situation.SituationBuilder().withSituation(situation);
  }

  isDescribed(): boolean {
    return this.description !== undefined;
  }

  describeSituation(description: SituationDescription) {
    return Situation.builderWithCurrentState(this)
      .withDescription(description)
      .build();
  }

  static SituationBuilder = class {
    creationDate: Date = new Date();
    physicalSymptoms: PhysicalSymptoms[] = [];
    description?: SituationDescription;

    build(): Situation {
      return new Situation(this);
    }

    withCreationDate(date: Date): Situation.SituationBuilder {
      this.creationDate = date;
      return this;
    }

    withSituation(situation: Situation): Situation.SituationBuilder {
      this.creationDate = situation.creationDate;
      this.physicalSymptoms = situation.physicalSymptoms;
      this.description = situation.description;
      return this;
    }

    withPhysicalSymptoms(
      symptoms: PhysicalSymptoms[]
    ): Situation.SituationBuilder {
      this.physicalSymptoms = symptoms;
      return this;
    }

    withDescription(description: SituationDescription) {
      this.description = description;
      return this;
    }
  };
}

import { CurrentDate } from '../shared-kernel/current-date';
import { PhysicalSymptoms } from './physical-symptoms';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export class Situation {
  readonly date: Date;
  physicalSymptoms: PhysicalSymptoms[];

  private constructor(builder: Situation.SituationBuilder) {
    this.date = builder.date;
    this.physicalSymptoms = builder.physicalSymptoms;
  }
  static builder(currentDate: CurrentDate): Situation.SituationBuilder {
    return new Situation.SituationBuilder(currentDate);
  }

  static SituationBuilder = class {
    date: Date;
    physicalSymptoms: PhysicalSymptoms[] = [];

    constructor(currentDate: CurrentDate) {
      this.date = currentDate.value();
    }

    build(): Situation {
      return new Situation(this);
    }

    withPhysicalSymptoms(
      symptoms: PhysicalSymptoms[]
    ): Situation.SituationBuilder {
      this.physicalSymptoms = symptoms;
      return this;
    }
  };
}

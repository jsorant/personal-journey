import { CurrentDate } from '../shared-kernel/current-date';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export class Situation {
  readonly date: Date;

  private constructor(builder: Situation.SituationBuilder) {
    this.date = builder.date;
  }
  static builder(currentDate: CurrentDate): Situation.SituationBuilder {
    return new Situation.SituationBuilder(currentDate);
  }

  static SituationBuilder = class {
    date: Date;

    constructor(currentDate: CurrentDate) {
      this.date = currentDate.value();
    }

    build(): Situation {
      return new Situation(this);
    }
  };
}

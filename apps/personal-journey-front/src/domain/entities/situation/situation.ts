import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import { SituationDescription } from './value-objects/situation-description';
import { UniqueIdentifier } from '../unique-identifier';
import { CreationDate } from './value-objects/creation-date';
import { ExitEvent } from './value-objects/exit-event';
import { assertMemberIsDefined } from '../../../shared-kernel/assertions';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export class Situation {
  readonly id: UniqueIdentifier;
  readonly creationDate: CreationDate;
  readonly physicalSymptoms: PhysicalSymptoms[];
  readonly description?: SituationDescription;
  readonly exitEvent?: ExitEvent;

  private constructor(builder: Situation.SituationBuilder) {
    this.id = builder.id;
    this.creationDate = builder.creationDate;
    this.physicalSymptoms = builder.physicalSymptoms;
    this.description = builder.description;
    this.exitEvent = builder.exitEvent;
  }
  static builder(): Situation.SituationBuilder {
    return new Situation.SituationBuilder();
  }

  private static builderWithCurrentState(
    situation: Situation
  ): Situation.SituationBuilder {
    return new Situation.SituationBuilder().fromSituation(situation);
  }

  isDescribed(): boolean {
    return this.description !== undefined;
  }

  hasExitEvent(): boolean {
    return this.exitEvent !== undefined;
  }

  describeSituation(description: SituationDescription): Situation {
    return Situation.builderWithCurrentState(this)
      .withDescription(description)
      .build();
  }

  describeExitEvent(anExitEvent: ExitEvent): Situation {
    return Situation.builderWithCurrentState(this)
      .withExitEvent(anExitEvent)
      .build();
  }

  static SituationBuilder = class {
    #id?: UniqueIdentifier;
    #creationDate?: CreationDate;
    physicalSymptoms: PhysicalSymptoms[] = [];
    description?: SituationDescription;
    exitEvent?: ExitEvent;

    get id(): UniqueIdentifier {
      if (this.#id === undefined)
        return UniqueIdentifier.generateNewUniqueIdentifier();
      return this.#id;
    }

    get creationDate(): CreationDate {
      return assertMemberIsDefined<CreationDate>(
        'creationDate',
        this.#creationDate,
        Situation.name
      );
    }

    build(): Situation {
      return new Situation(this);
    }

    fromSituation(aSituation: Situation): Situation.SituationBuilder {
      this.#id = aSituation.id;
      this.#creationDate = aSituation.creationDate;
      this.physicalSymptoms = aSituation.physicalSymptoms;
      this.description = aSituation.description;
      this.exitEvent = aSituation.exitEvent;
      return this;
    }

    withCreationDate(aDate: CreationDate): Situation.SituationBuilder {
      this.#creationDate = aDate;
      return this;
    }

    withPhysicalSymptoms(
      someSymptoms: PhysicalSymptoms[]
    ): Situation.SituationBuilder {
      this.physicalSymptoms = someSymptoms;
      return this;
    }

    withDescription(aDescription: SituationDescription) {
      this.description = aDescription;
      return this;
    }

    withExitEvent(anExitEvent: ExitEvent) {
      this.exitEvent = anExitEvent;
      return this;
    }
  };
}
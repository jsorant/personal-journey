import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import { SituationDescription } from './value-objects/situation-description';
import { UniqueIdentifier } from '../unique-identifier';
import { CreationDate } from './value-objects/creation-date';
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

  private constructor(builder: Situation.SituationBuilder) {
    this.id = builder.id;
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
    return new Situation.SituationBuilder().fromSituation(situation);
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
    #id?: UniqueIdentifier;
    #creationDate?: CreationDate;
    physicalSymptoms: PhysicalSymptoms[] = [];
    description?: SituationDescription;

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

    fromSituation(situation: Situation): Situation.SituationBuilder {
      this.#id = situation.id;
      this.#creationDate = situation.creationDate;
      this.physicalSymptoms = situation.physicalSymptoms;
      this.description = situation.description;
      return this;
    }

    withCreationDate(date: CreationDate): Situation.SituationBuilder {
      this.#creationDate = date;
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

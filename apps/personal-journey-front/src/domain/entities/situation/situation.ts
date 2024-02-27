import { SituationId } from './value-objects/situation-id';
import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import { SituationDescription } from './value-objects/situation-description';
import { ExitEvent } from './value-objects/exit-event';
import { Emotions } from './value-objects/emotions';
import { ThoughtsTypes } from './value-objects/thoughts-types';
import { AutoPilots } from './value-objects/auto-pilots';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export class Situation {
  readonly id: SituationId;
  readonly physicalSymptoms: PhysicalSymptoms[];
  readonly description?: SituationDescription;
  readonly exitEvent?: ExitEvent;
  readonly emotions: Emotions[];
  readonly thoughtsTypes: ThoughtsTypes[];
  readonly autoPilots: AutoPilots[];

  private constructor(builder: Situation.SituationBuilder) {
    this.id = builder.id;
    this.physicalSymptoms = builder.physicalSymptoms;
    this.description = builder.description;
    this.exitEvent = builder.exitEvent;
    this.emotions = builder.emotions;
    this.thoughtsTypes = builder.thoughtsTypes;
    this.autoPilots = builder.autoPilots;
  }

  static buildWithId(id: SituationId) {
    return new Situation.SituationBuilder(id).build();
  }

  private static builderWithCurrentState(
    situation: Situation
  ): Situation.SituationBuilder {
    return new Situation.SituationBuilder(situation.id).withInternalStateFrom(
      situation
    );
  }

  isDescribed(): boolean {
    return this.description !== undefined;
  }

  hasExitEvent(): boolean {
    return this.exitEvent !== undefined;
  }

  hasRelatedEmotions(): boolean {
    return this.emotions.length > 0;
  }

  hasRelatedThoughtsTypes(): boolean {
    return this.thoughtsTypes.length > 0;
  }

  hasRelatedAutoPilots(): boolean {
    return this.autoPilots.length > 0;
  }

  identifyPhysicalSymptoms(
    somePhysicalSymptoms: PhysicalSymptoms[]
  ): Situation {
    return Situation.builderWithCurrentState(this)
      .withPhysicalSymptoms(somePhysicalSymptoms)
      .build();
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

  identifyRelatedEmotions(someEmotions: Emotions[]): Situation {
    return Situation.builderWithCurrentState(this)
      .withEmotions(someEmotions)
      .build();
  }

  identifyRelatedThoughtsTypes(someThoughtsTypes: ThoughtsTypes[]): Situation {
    return Situation.builderWithCurrentState(this)
      .withThoughtsTypes(someThoughtsTypes)
      .build();
  }

  identifyRelatedAutoPilots(someAutoPilots: AutoPilots[]): Situation {
    return Situation.builderWithCurrentState(this)
      .withAutoPilots(someAutoPilots)
      .build();
  }

  static SituationBuilder = class {
    id: SituationId;
    physicalSymptoms: PhysicalSymptoms[] = [];
    description?: SituationDescription;
    exitEvent?: ExitEvent;
    emotions: Emotions[] = [];
    thoughtsTypes: ThoughtsTypes[] = [];
    autoPilots: AutoPilots[] = [];

    constructor(id: SituationId) {
      this.id = id;
    }

    build(): Situation {
      return new Situation(this);
    }

    withInternalStateFrom(aSituation: Situation): Situation.SituationBuilder {
      this.physicalSymptoms = aSituation.physicalSymptoms;
      this.description = aSituation.description;
      this.exitEvent = aSituation.exitEvent;
      this.emotions = aSituation.emotions;
      this.thoughtsTypes = aSituation.thoughtsTypes;
      this.autoPilots = aSituation.autoPilots;
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

    withEmotions(someEmotions: Emotions[]) {
      this.emotions = someEmotions;
      return this;
    }

    withThoughtsTypes(someThoughtsTypes: ThoughtsTypes[]) {
      this.thoughtsTypes = someThoughtsTypes;
      return this;
    }

    withAutoPilots(someAutoPilots: AutoPilots[]) {
      this.autoPilots = someAutoPilots;
      return this;
    }
  };
}

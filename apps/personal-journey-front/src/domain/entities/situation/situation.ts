import { SituationId } from './value-objects/situation-id';
import { PhysicalSymptoms } from './value-objects/physical-symptoms';
import { SituationDescription } from './value-objects/situation-description';
import { ExitEvent } from './value-objects/exit-event';
import { Emotions } from './value-objects/emotions';
import { ThoughtsTypes } from './value-objects/thoughts-types';
import { AutoPilots } from './value-objects/auto-pilots';
import { Needs } from './value-objects/needs';
import { Memories } from './value-objects/memories';
import { Duration } from './value-objects/duration';
import { CreationDate } from './value-objects/creation-date';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Situation {
  type SituationBuilder = typeof Situation.SituationBuilder.prototype;
}

export class Situation {
  readonly id: SituationId;
  readonly creationDate: CreationDate;
  readonly physicalSymptoms: PhysicalSymptoms[];
  readonly description?: SituationDescription;
  readonly exitEvent?: ExitEvent;
  readonly emotions: Emotions[];
  readonly thoughtsTypes: ThoughtsTypes[];
  readonly needs: Needs[];
  readonly autoPilots: AutoPilots[];
  readonly memories?: Memories;
  readonly duration?: Duration;

  private constructor(builder: Situation.SituationBuilder) {
    this.id = builder.id;
    this.creationDate = builder.creationDate;
    this.physicalSymptoms = builder.physicalSymptoms;
    this.description = builder.description;
    this.exitEvent = builder.exitEvent;
    this.emotions = builder.emotions;
    this.thoughtsTypes = builder.thoughtsTypes;
    this.needs = builder.needs;
    this.autoPilots = builder.autoPilots;
    this.memories = builder.memories;
    this.duration = builder.duration;
  }

  static buildWithIdAndDate(id: SituationId, date: CreationDate) {
    return new Situation.SituationBuilder(id, date).build();
  }

  private static builderWithCurrentState(
    situation: Situation
  ): Situation.SituationBuilder {
    return new Situation.SituationBuilder(
      situation.id,
      situation.creationDate
    ).withInternalStateFrom(situation);
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

  hasRelatedNeeds() {
    return this.needs.length > 0;
  }

  hasRelatedMemories() {
    return this.memories !== undefined;
  }

  hasDuration() {
    return this.duration !== undefined;
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

  identifyRelatedNeeds(someNeeds: Needs[]) {
    return Situation.builderWithCurrentState(this).withNeeds(someNeeds).build();
  }

  identifyRelatedAutoPilots(someAutoPilots: AutoPilots[]): Situation {
    return Situation.builderWithCurrentState(this)
      .withAutoPilots(someAutoPilots)
      .build();
  }

  describeRelatedMemories(someMemories: Memories) {
    return Situation.builderWithCurrentState(this)
      .withMemories(someMemories)
      .build();
  }

  describeDuration(aDuration: Duration) {
    return Situation.builderWithCurrentState(this)
      .withDuration(aDuration)
      .build();
  }

  static SituationBuilder = class {
    id: SituationId;
    creationDate: CreationDate;
    physicalSymptoms: PhysicalSymptoms[] = [];
    description?: SituationDescription;
    exitEvent?: ExitEvent;
    emotions: Emotions[] = [];
    thoughtsTypes: ThoughtsTypes[] = [];
    needs: Needs[] = [];
    autoPilots: AutoPilots[] = [];
    memories?: Memories;
    duration?: Duration;

    constructor(id: SituationId, creationDate: CreationDate) {
      this.id = id;
      this.creationDate = creationDate;
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
      this.needs = aSituation.needs;
      this.memories = aSituation.memories;
      this.duration = aSituation.duration;
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

    withNeeds(someNeeds: Needs[]) {
      this.needs = someNeeds;
      return this;
    }

    withAutoPilots(someAutoPilots: AutoPilots[]) {
      this.autoPilots = someAutoPilots;
      return this;
    }

    withMemories(someMemories: Memories) {
      this.memories = someMemories;
      return this;
    }

    withDuration(aDuration: Duration) {
      this.duration = aDuration;
      return this;
    }
  };
}

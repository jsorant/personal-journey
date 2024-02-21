export enum EventViewModelType {
  ANXIETY = 'Anxiety attack',
  DEPRESSION = 'Depressive situation',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace EventViewModel {
  type EventViewModelBuilder =
    typeof EventViewModel.EventViewModelBuilder.prototype;
}

export class EventViewModel {
  public readonly type: EventViewModelType;
  public readonly date: Date;
  public readonly durationMinutes: number;
  public readonly level: number;
  public readonly thoughts: string;

  private constructor(builder: EventViewModel.EventViewModelBuilder) {
    this.type = builder.type;
    this.date = builder.date;
    this.durationMinutes = builder.durationMinutes;
    this.level = builder.level;
    this.thoughts = builder.thoughts;
  }

  static builder() {
    return new EventViewModel.EventViewModelBuilder();
  }

  static EventViewModelBuilder = class {
    type: EventViewModelType = EventViewModelType.ANXIETY;
    date: Date = new Date();
    durationMinutes = 0;
    level = 0;
    thoughts = '';

    withType(type: EventViewModelType) {
      this.type = type;
      return this;
    }

    withDate(date: Date) {
      this.date = date;
      return this;
    }

    withLevel(level: number) {
      this.level = level;
      return this;
    }

    withDurationMinutes(duration: number) {
      this.durationMinutes = duration;
      return this;
    }

    withThoughts(thoughts: string) {
      this.thoughts = thoughts;
      return this;
    }

    build() {
      return new EventViewModel(this);
    }
  };
}

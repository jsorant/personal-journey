export enum EventType {
  ANXIETY,
  DEPRESSION,
}

export interface Event {
  readonly type: EventType;
  readonly date: Date;
  readonly durationMinutes: number;
  readonly level: number;
  readonly thoughts: string;
}

//TODO make a class with a builder, validations and primitive obsession

export class StartDate {
  readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  static of(value: Date): StartDate {
    return new StartDate(value);
  }
}

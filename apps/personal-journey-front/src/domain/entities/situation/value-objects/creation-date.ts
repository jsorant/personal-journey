export class CreationDate {
  readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  static of(value: Date): CreationDate {
    return new CreationDate(value);
  }
}

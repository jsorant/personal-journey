export class Duration {
  readonly valueInMinutes: number;

  private constructor(valueInMinutes: number) {
    this.valueInMinutes = valueInMinutes;
  }

  static ofMinutes(value: number): Duration {
    return new Duration(value);
  }
}

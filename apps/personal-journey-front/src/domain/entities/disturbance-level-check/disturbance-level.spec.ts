export class DisturbanceLevel {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static of(value: number): DisturbanceLevel {
    //gte 0
    // lte 10
    return new DisturbanceLevel(value);
  }
}

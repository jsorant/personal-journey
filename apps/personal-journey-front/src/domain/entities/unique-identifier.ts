import crypto from 'crypto';

export class UniqueIdentifier {
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static generateNewUniqueIdentifier(): UniqueIdentifier {
    const value = crypto.randomUUID();
    return new UniqueIdentifier(value);
  }
}

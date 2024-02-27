import { UuidV4Generator } from '../domain/ports/uuid-v4-generator';
import crypto from 'crypto';

export class UuidV4GeneratorImpl implements UuidV4Generator {
  generate(): string {
    return crypto.randomUUID();
  }
}

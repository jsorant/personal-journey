import { UuidV4Generator } from '../domain/ports/uuid-v4-generator';
import * as uuid from 'uuid';

export class UuidV4GeneratorImpl implements UuidV4Generator {
  generate(): string {
    return uuid.v4();
  }
}

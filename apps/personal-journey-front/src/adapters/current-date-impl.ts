import { CurrentDate } from './current-date';

export class CurrentDateImpl implements CurrentDate {
  value(): Date {
    return new Date();
  }
}

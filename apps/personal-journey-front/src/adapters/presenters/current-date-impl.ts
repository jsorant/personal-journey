import { CurrentDate } from './current-date';

class CurrentDateImpl implements CurrentDate {
  value(): Date {
    return new Date();
  }
}
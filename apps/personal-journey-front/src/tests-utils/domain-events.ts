import { Event, EventType } from '../domain/event';

const detailedThoughts =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
  'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
  'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
  'non proident, sunt in culpa qui officia deserunt mollit anim id est';

export const domainEvent1: Event = {
  type: EventType.DEPRESSION,
  date: new Date('2022-01-05 08:50'),
  durationMinutes: 60,
  level: 7,
  thoughts: detailedThoughts,
};
export const domainEvent2: Event = {
  type: EventType.ANXIETY,
  date: new Date('2022-01-06 14:50'),
  durationMinutes: 10,
  level: 8,
  thoughts: 'Tremblements et rythme cardiaque élevé',
};
export const domainEvent3: Event = {
  type: EventType.DEPRESSION,
  date: new Date('2022-01-07 09:30'),
  durationMinutes: 60,
  level: 4,
  thoughts: 'Envie de rester au lit',
};

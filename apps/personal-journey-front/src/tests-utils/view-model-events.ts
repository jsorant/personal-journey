import {
  EventViewModel,
  EventViewModelType,
} from '../adapters/presenters/event-view-model';

const detailedThoughts =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
  'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
  'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
  'non proident, sunt in culpa qui officia deserunt mollit anim id est';

export const anxietyEventViewModel: EventViewModel = EventViewModel.builder()
  .withType(EventViewModelType.ANXIETY)
  .withDate(new Date('2023-01-05 15:20'))
  .withDurationMinutes(20)
  .withLevel(3)
  .withThoughts(detailedThoughts)
  .build();

export const depressionEventViewModel: EventViewModel = EventViewModel.builder()
  .withType(EventViewModelType.DEPRESSION)
  .withDate(new Date('2023-06-11 19:15'))
  .withDurationMinutes(60)
  .withLevel(9)
  .withThoughts(detailedThoughts)
  .build();

export const eventViewModel1: EventViewModel = EventViewModel.builder()
  .withType(EventViewModelType.DEPRESSION)
  .withDate(new Date('2022-01-05 08:50'))
  .withDurationMinutes(60)
  .withLevel(7)
  .withThoughts(detailedThoughts)
  .build();

export const eventViewModel2: EventViewModel = EventViewModel.builder()
  .withType(EventViewModelType.ANXIETY)
  .withDate(new Date('2022-01-06 10:50'))
  .withDurationMinutes(10)
  .withLevel(8)
  .withThoughts('Heartbeats')
  .build();

export const eventViewModel3: EventViewModel = EventViewModel.builder()
  .withType(EventViewModelType.DEPRESSION)
  .withDate(new Date('2022-01-07 23:50'))
  .withDurationMinutes(55)
  .withLevel(4)
  .withThoughts('Sleepy')
  .build();

export const eventWithoutThoughtsViewModel: EventViewModel =
  EventViewModel.builder()
    .withType(EventViewModelType.DEPRESSION)
    .withDate(new Date('2022-01-05 08:50'))
    .withDurationMinutes(60)
    .withLevel(7)
    .build();

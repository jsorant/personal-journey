import { EventViewModel, EventViewModelType } from './event-view-model';

describe('EventViewModel', () => {
  it('should build', () => {
    expect(() =>
      EventViewModel.builder()
        .withType(EventViewModelType.ANXIETY)
        .withDate(new Date())
        .withLevel(5)
        .withDurationMinutes(10)
        .withThoughts('Dizzy')
        .build()
    ).not.toThrow();
  });

  it('should have a short description of thoughts', () => {
    const event = EventViewModel.builder()
      .withType(EventViewModelType.ANXIETY)
      .withDate(new Date())
      .withLevel(5)
      .withDurationMinutes(10)
      .withThoughts(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
          '    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
          '    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
          '    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
          '    non proident, sunt in culpa qui officia deserunt mollit anim id est'
      )
      .build();
  });
});

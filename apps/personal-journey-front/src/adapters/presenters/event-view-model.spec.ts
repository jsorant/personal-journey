import { EventViewModel, EventViewModelType } from './event-view-model';

describe(EventViewModel.name, () => {
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
});

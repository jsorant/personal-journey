import { EventsRepository } from '../../domain/events.repository';
import { Event, EventType } from '../../domain/event';
import { mock, Mock } from 'ts-jest-mocker';
import { HistoryPresenterImpl } from './history-presenter-impl';
import {
  domainEvent1,
  domainEvent2,
  domainEvent3,
} from '../../tests/domain-events';
import { EventViewModel, EventViewModelType } from './event-view-model';

describe(HistoryPresenterImpl.name, () => {
  let mockEventsRepository: Mock<EventsRepository>;
  let sut: HistoryPresenterImpl;

  beforeEach(() => {
    mockEventsRepository = mock<EventsRepository>();

    sut = new HistoryPresenterImpl(mockEventsRepository);
  });

  test('should define initial events', () => {
    mockEventsRepository.listEvents.mockReturnValue([
      domainEvent1,
      domainEvent2,
      domainEvent3,
    ]);

    const events = sut.getEvents();

    expect(events.length).toEqual(3);
    expectMatch(events[0], domainEvent1);
    expectMatch(events[1], domainEvent2);
    expectMatch(events[2], domainEvent3);
  });

  function expectMatch(
    eventViewModel: EventViewModel,
    domainEvent: Event
  ): void {
    expectTypesMatch(eventViewModel, domainEvent);
    expect(eventViewModel.date).toStrictEqual(domainEvent.date);
    expect(eventViewModel.level).toStrictEqual(domainEvent.level);
    expect(eventViewModel.durationMinutes).toStrictEqual(
      domainEvent.durationMinutes
    );
    expect(eventViewModel.thoughts).toStrictEqual(domainEvent.thoughts);
  }

  function expectTypesMatch(
    eventViewModel: EventViewModel,
    domainEvent: Event
  ) {
    if (eventViewModel.type === EventViewModelType.ANXIETY)
      expect(domainEvent.type).toStrictEqual(EventType.ANXIETY);
    if (eventViewModel.type === EventViewModelType.DEPRESSION)
      expect(domainEvent.type).toStrictEqual(EventType.DEPRESSION);
  }
});

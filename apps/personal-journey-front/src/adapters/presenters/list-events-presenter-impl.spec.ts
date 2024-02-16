import { EventsRepository } from '../../domain/events.repository';
import { Event } from '../../domain/event';
import { mock, Mock } from 'ts-jest-mocker';
import { ListEventsPresenterImpl } from './list-events-presenter.impl';

const event1: Event = {
  date: new Date('2022-11-05 11:11'),
  thoughts: 'Freezing',
};

const event2: Event = {
  date: new Date('2022-11-15 20:11'),
  thoughts: 'Sleepy',
};
describe('ListEventsPresenterImpl', () => {
  let mockEventsRepository: Mock<EventsRepository>;
  let sut: ListEventsPresenterImpl;

  beforeEach(() => {
    mockEventsRepository = mock<EventsRepository>();

    sut = new ListEventsPresenterImpl(mockEventsRepository);
  });

  test('should define initial events', () => {
    mockEventsRepository.listEvents.mockReturnValue([event1, event2]);

    const events = sut.getEvents();

    expect(events.length).toEqual(2);
    expect(events[0]).toEqual(event1);
    expect(events[1]).toEqual(event2);
  });

  test('should update view if events repository is updated', () => {
    //TODO
  });
});

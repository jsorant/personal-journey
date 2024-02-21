import { InMemoryEventsRepository } from './in-memory-events-repository';
import { EventType } from './event';

describe('InMemoryEventsRepository', () => {
  test('should initially have two events', () => {
    const sut = new InMemoryEventsRepository();

    expect(sut.listEvents().length).toBe(3);
  });

  test('should save an event', () => {
    const sut = new InMemoryEventsRepository();
    expect(sut.listEvents().length).toBe(3);

    const newEvent = {
      type: EventType.DEPRESSION,
      date: new Date('2024-06-10 11:50'),
      durationMinutes: 5,
      level: 5,
      thoughts: 'Dizzy',
    };
    sut.saveEvent(newEvent);

    expect(sut.listEvents().length).toBe(4);
    expect(sut.listEvents()[3]).toStrictEqual(newEvent);
  });
});

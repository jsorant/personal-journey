import { InMemoryEventsRepository } from './in-memory-events-repository';

describe('InMemoryEventsRepository', () => {
  test('should initially have two events', () => {
    const sut = new InMemoryEventsRepository();

    expect(sut.listEvents().length).toBe(2);
  });

  test('should save an event', () => {
    const sut = new InMemoryEventsRepository();
    expect(sut.listEvents().length).toBe(2);

    const newEvent = {
      date: new Date('2025-06-29 12:30'),
      thoughts: 'Nausées',
    };
    sut.saveEvent(newEvent);

    expect(sut.listEvents().length).toBe(3);
    expect(sut.listEvents()[2].date).toEqual(newEvent.date);
    expect(sut.listEvents()[2].thoughts).toEqual(newEvent.thoughts);
  });
});

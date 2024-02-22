import { Mock, mock } from 'ts-jest-mocker';
import { AddEventPresenterImpl } from './add-event-presenter-impl';
import { EventsRepository } from '../../../domain/events.repository';
import { CurrentDate } from '../../current-date';
import { EventType } from '../../../domain/event';
import { AddNewEventInputs } from './add-event.presenter';

describe(AddEventPresenterImpl.name, () => {
  const now = new Date('2022-12-11 12:05');
  let mockEventsRepository: Mock<EventsRepository>;
  let mockCurrentDate: Mock<CurrentDate>;
  let sut: AddEventPresenterImpl;

  beforeEach(() => {
    mockEventsRepository = mock<EventsRepository>();
    mockEventsRepository.saveEvent.mockReturnValue();

    mockCurrentDate = mock<CurrentDate>();
    mockCurrentDate.value.mockReturnValue(now);

    sut = new AddEventPresenterImpl(mockEventsRepository, mockCurrentDate);
  });

  test('should define the initial view model', () => {
    const viewModel = sut.initialViewModel();

    expect(viewModel.date).toEqual(now);
    expect(viewModel.durationMinutes).toBe(5);
    expect(viewModel.type).toBe('anxiety');
    expect(viewModel.level).toBe(1);
    expect(viewModel.minLevel).toBe(0);
    expect(viewModel.maxLevel).toBe(10);
    expect(viewModel.thoughtsPlaceholder).toBe(
      'Décrivez ce que vous avez ressenti, vos pensées, vos émotions...'
    );
    expect(viewModel.thoughts).toBe('');
  });

  test('should add a new event', async () => {
    const inputs: AddNewEventInputs = {
      type: 'anxiety',
      date: now,
      level: 5,
      durationMinutes: 55,
      thoughts: 'Thoughts',
    };

    await sut.addNewEvent(inputs);

    expect(mockEventsRepository.saveEvent).toHaveBeenCalledWith({
      date: now,
      type: EventType.ANXIETY,
      level: 5,
      durationMinutes: 55,
      thoughts: 'Thoughts',
    });
  });
});

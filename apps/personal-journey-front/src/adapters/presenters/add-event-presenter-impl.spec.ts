import { Mock, mock } from 'ts-jest-mocker';
import { AddEventPresenterImpl } from './add-event-presenter-impl';
import { EventsRepository } from '../../domain/events.repository';
import { CurrentDate } from './current-date';

describe('AddEventPresenterImpl', () => {
  const now = new Date('2022-12-11 12:05');
  let mockEventsRepository: Mock<EventsRepository>;
  let mockCurrentDate: Mock<CurrentDate>;
  let sut: AddEventPresenterImpl;

  beforeEach(() => {
    mockEventsRepository = mock<EventsRepository>();

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
    expect(viewModel.thoughtsPlaceholder).toBe('Describe how you feel');
    expect(viewModel.thoughts).toBe('');
  });
});

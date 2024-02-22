import {
  AddEventPresenter,
  AddEventViewModel,
  AddNewEventInputs,
} from '../../adapters/presenters/add-event/add-event.presenter';

export class DummyAddEventPresenter implements AddEventPresenter {
  initialViewModel(): AddEventViewModel {
    return {
      date: new Date('1985-10-20 10:15'),
      durationMinutes: 6,
      type: 'depression',
      level: 5,
      minLevel: 0,
      maxLevel: 10,
      thoughtsPlaceholder: 'Describe...',
      thoughts: '',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addNewEvent(inputs: AddNewEventInputs): Promise<void> {
    // Nothing to do
  }
}

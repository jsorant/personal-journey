import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';

export class DummyPresenter implements AddEventPresenter {
  public readonly viewModel: AddEventViewModel = {
    date: new Date('2020-12-25 10:15'),
    durationMinutes: 6,
    type: 'depression',
    level: 7,
    minLevel: 0,
    maxLevel: 100,
    thoughtsPlaceholder: 'Describe...',
    thoughts: '',
  };

  initialViewModel(): AddEventViewModel {
    return this.viewModel;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addNewEvent(date: Date, thoughts: string): Promise<void> {
    // Nothing to do
  }
}

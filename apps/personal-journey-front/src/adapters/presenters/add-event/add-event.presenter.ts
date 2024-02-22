export interface AddEventPresenter {
  initialViewModel(): AddEventViewModel;

  addNewEvent(inputs: AddNewEventInputs): Promise<void>;
}

export interface AddNewEventInputs {
  readonly type: 'anxiety' | 'depression';
  readonly date: Date;
  readonly level: number;
  readonly durationMinutes: number;
  readonly thoughts: string;
}

export interface AddEventViewModel {
  readonly date: Date;
  readonly durationMinutes: number;
  readonly type: 'anxiety' | 'depression';
  readonly level: number;
  readonly minLevel: number;
  readonly maxLevel: number;
  readonly thoughtsPlaceholder: string;
  readonly thoughts: string;
}

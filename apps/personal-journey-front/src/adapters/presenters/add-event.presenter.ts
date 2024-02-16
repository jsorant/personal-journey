export interface AddEventPresenter {
  initialViewModel(): AddEventViewModel;

  addNewEvent(thoughts: string): Promise<void>;
}

export interface AddEventViewModel {
  date: Date;
  durationMinutes: number;
  type: 'anxiety' | 'depression';
  level: number;
  minLevel: number;
  maxLevel: number;
  thoughtsPlaceholder: string;
  thoughts: string;
}

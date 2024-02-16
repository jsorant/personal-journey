import { Injectable } from '@angular/core';
import { AddEventPresenter, AddEventViewModel } from './add-event.presenter';

@Injectable({
  providedIn: 'root',
})
export class AddEventPresenterImpl implements AddEventPresenter {
  addNewEvent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  initialViewModel(): AddEventViewModel {
    return {
      date: new Date(),
      durationMinutes: 5,
      type: 'anxiety',
      level: 7,
      minLevel: 0,
      maxLevel: 10,
      thoughtsPlaceholder: 'Describe how you feel',
      thoughts: '',
    };
  }
}
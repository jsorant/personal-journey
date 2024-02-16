import { TestBed } from '@angular/core/testing';
import { Event } from '../../adapters/presenters/event';
import { EventItemComponent } from './event-item.component';

const event: Event = {
  date: new Date('2022-01-05 08:50'),
  thoughts: 'Cold',
};

describe('EventItemComponent', () => {
  let fixture: any;
  let comp: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [EventItemComponent],
    });
    fixture = TestBed.createComponent(EventItemComponent);
    comp = fixture.componentInstance;
  });

  it('should display an event', () => {
    comp.event = event;
    fixture.detectChanges();

    cy.get('#event-label').should('exist');
    shouldMatch(event);
  });
});
function shouldMatch(event: Event) {
  cy.get('#event-label').should(
    'contain.text',
    event.date.toLocaleDateString()
  );
  cy.get('#event-label').should(
    'contain.text',
    event.date.toLocaleTimeString()
  );
  cy.get('#event-label').should('contain.text', event.thoughts);
}

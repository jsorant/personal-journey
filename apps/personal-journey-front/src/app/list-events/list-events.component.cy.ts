import { TestBed } from '@angular/core/testing';
import { ListEventsComponent } from './list-events.component';
import {
  Event,
  ListEventsPresenter,
} from '../../adapters/presenters/list-events.presenter';
import { ListEventsView } from '../../adapters/presenters/list-events.view';

const event1 = {
  date: new Date('2022-01-05 08:50'),
  thoughts: 'Cold',
};
const event2 = {
  date: new Date('2022-01-06 10:50'),
  thoughts: 'Freezing',
};
const event3 = {
  date: new Date('2022-01-07 23:50'),
  thoughts: 'Sleepy',
};

class DummyListEventsPresenter implements ListEventsPresenter {
  view: ListEventsView | undefined = undefined;
  events: Event[] = [];

  setView(view: ListEventsView): void {
    this.view = view;
  }
  initialEvents(): Event[] {
    return [...this.events];
  }
}

describe('ListEventsComponent', () => {
  let presenter: DummyListEventsPresenter;

  beforeEach(() => {
    presenter = new DummyListEventsPresenter();
    TestBed.overrideComponent(ListEventsComponent, {
      add: {
        imports: [],
        providers: [{ provide: 'ListEventsPresenter', useValue: presenter }],
      },
    });
  });

  it('should list no events', () => {
    cy.mount(ListEventsComponent);

    cy.get('#list-events-empty-label').should('be.visible');
    cy.get('#list-events-empty-label').should(
      'contain.text',
      'No events recorded yet.'
    );
  });

  it('should list one event', () => {
    presenter.events = [event1];
    cy.mount(ListEventsComponent);

    cy.get('#events-list').children().should('have.length', 1);
    cy.get('#list-events-empty-label').should('not.exist');
  });

  it('should list many events', () => {
    presenter.events = [event1, event2, event3];
    cy.mount(ListEventsComponent);

    cy.get('#events-list').children().should('have.length', 3);
    expectContainsEvent('#event-0', event1);
    expectContainsEvent('#event-1', event2);
    expectContainsEvent('#event-2', event3);
  });

  it('should update events', () => {
    presenter.events = [event1];
    cy.mount(ListEventsComponent).then(() => {
      cy.get('#events-list').children().should('have.length', 1);
      expectContainsEvent('#event-0', event1);

      presenter.view!.eventsUpdated([event1, event2, event3]);

      cy.get('#events-list').children().should('have.length', 3);
      expectContainsEvent('#event-0', event1);
      expectContainsEvent('#event-1', event2);
      expectContainsEvent('#event-2', event3);
    });
  });
});

function expectContainsEvent(eventId: string, event: Event) {
  cy.get(eventId).should('contain.text', event.date.toLocaleDateString());
  cy.get(eventId).should('contain.text', event.date.toLocaleTimeString());
  cy.get(eventId).should('contain.text', event.thoughts);
}

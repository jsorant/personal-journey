import { TestBed } from '@angular/core/testing';
import { ListEventsComponent } from './list-events.component';
import { ListEventsPresenter } from '../../adapters/presenters/list-events.presenter';
import { ListEventsView } from '../../adapters/presenters/list-events.view';
import { Event } from '../../adapters/presenters/event';

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

  getEvents(): Event[] {
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
    cy.get('#event-0').should('exist');
    cy.get('#event-1').should('exist');
    cy.get('#event-2').should('exist');
  });

  /*
  it.skip('should update events', () => {
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

   */
});

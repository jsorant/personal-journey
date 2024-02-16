import { AddEventComponent } from './add-event.component';
import { TestBed } from '@angular/core/testing';
import { TimeHelper } from '../helpers/time.helper';
import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';

class DummyPresenter implements AddEventPresenter {
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

describe('AddEventComponent', () => {
  let presenter: DummyPresenter;

  beforeEach(() => {
    presenter = new DummyPresenter();
    TestBed.overrideComponent(AddEventComponent, {
      add: {
        imports: [],
        providers: [{ provide: 'AddEventPresenter', useValue: presenter }],
      },
    });
  });

  it('should initialize with default values', () => {
    cy.mount(AddEventComponent);

    cy.get('#add-event-date').should(
      'have.value',
      TimeHelper.toHtmlDateInputValue(presenter.viewModel.date)
    );
    cy.get('#add-event-time').should(
      'have.value',
      TimeHelper.toHtmlTimeInputValue(presenter.viewModel.date)
    );
    cy.get('#add-event-duration').should(
      'have.value',
      presenter.viewModel.durationMinutes
    );
    cy.get('#add-event-type-anxiety')
      .should('not.be.checked')
      .and('have.value', 'anxiety');
    cy.get('#add-event-type-depression')
      .should('be.checked')
      .and('have.value', 'depression');
    cy.get('#add-event-level').should('have.value', presenter.viewModel.level);
    cy.get('#add-event-level').should(
      'have.attr',
      'min',
      presenter.viewModel.minLevel
    );
    cy.get('#add-event-level').should(
      'have.attr',
      'max',
      presenter.viewModel.maxLevel
    );
    cy.get('#add-event-thoughts').should(
      'have.attr',
      'placeholder',
      presenter.viewModel.thoughtsPlaceholder
    );
    cy.get('#add-event-thoughts').should(
      'have.value',
      presenter.viewModel.thoughts
    );
  });

  it('should add an event', () => {
    cy.mount(AddEventComponent);
    cy.spy(presenter, 'addNewEvent');

    cy.get('#add-event-thoughts').type("I'm feeling cold");
    cy.get('#add-event-date').type('2019-11-11');
    cy.get('#add-event-time').type('11:11');

    cy.get('#add-event-button')
      .click()
      .then(() => {
        expect(presenter.addNewEvent).to.be.calledOnceWith(
          new Date('2019-11-11 11:11'),
          "I'm feeling cold"
        );
      });
  });
});

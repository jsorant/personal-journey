import { AddEventComponent } from './add-event.component';
import { TestBed } from '@angular/core/testing';
import { InMemoryEventsRepository } from '../../domain/in-memory-events-repository.service';
import { TimeHelper } from '../helpers/time.helper';
import { DummyPresenter } from './dummy.presenter';

describe('AddEventComponent', () => {
  let presenter: DummyPresenter;

  beforeEach(() => {
    presenter = new DummyPresenter();
    TestBed.overrideComponent(AddEventComponent, {
      add: {
        imports: [],
        providers: [
          { provide: 'EventsRepository', useClass: InMemoryEventsRepository },
          { provide: 'AddEventPresenter', useValue: presenter },
        ],
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

    cy.get('#add-event-button')
      .click()
      .then(() => {
        expect(presenter.addNewEvent).to.be.calledOnceWith("I'm feeling cold");
      });
  });
});

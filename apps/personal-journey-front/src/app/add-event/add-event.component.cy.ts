import { AddEventComponent } from './add-event.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';

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
  let fixture: ComponentFixture<AddEventComponent>;

  beforeEach(() => {
    presenter = new DummyPresenter();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatLabel,
        MatFormField,
        MatInput,
      ],
      providers: [
        provideAnimations(),
        { provide: 'AddEventPresenter', useValue: presenter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventComponent);
    fixture.detectChanges();
  });

  it('should initialize with default values', () => {
    cy.get('#add-event-date').should('have.value', '12/25/2020');
    cy.get('#add-event-time').should('have.value', '10:15');
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
    cy.spy(presenter, 'addNewEvent');

    cy.get('#add-event-thoughts').type("I'm feeling cold");
    cy.get('#add-event-date').type('2019-11-11');
    cy.get('#add-event-time').type('11:11');

    cy.get('#add-event-duration').type('8');

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

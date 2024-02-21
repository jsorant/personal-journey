import { AddEventComponent } from './add-event.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AddEventPresenter,
  AddEventViewModel,
} from '../../adapters/presenters/add-event.presenter';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  matInputShouldHavePlaceholder,
  matInputShouldHaveValue,
  matSelectShouldHaveText,
  matSliderShouldHaveMinMaxStep,
  matSliderThumbShouldHaveValue,
} from '../cypress/mat-input.cy';
import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatButton } from '@angular/material/button';

class DummyPresenter implements AddEventPresenter {
  public readonly viewModel: AddEventViewModel = {
    date: new Date('2020-12-25 10:15'),
    durationMinutes: 6,
    type: 'depression',
    level: 70,
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
  let loader: HarnessLoader;

  beforeEach(async () => {
    presenter = new DummyPresenter();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelect,
        MatOption,
        MatSlider,
        MatSliderThumb,
        MatSliderModule,
        MatButton,
      ],
      providers: [
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: 'AddEventPresenter', useValue: presenter },
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });
  //TODO
  it.only('should initialize with default values', async () => {
    await matInputShouldHaveValue('12/25/2020', '#add-event-date', loader);

    //await matInputShouldHaveValue('10:15', '#add-event-time');

    await matInputShouldHaveValue(
      presenter.viewModel.durationMinutes.toString(),
      '#add-event-duration',
      loader
    );

    await matSelectShouldHaveText('Depression', '#add-event-type', loader);
    /*await matInputShouldHaveValue(
      presenter.viewModel.level.toString(),
      '#add-event-level'
    );*/

    await matSliderShouldHaveMinMaxStep(
      presenter.viewModel.minLevel,
      presenter.viewModel.maxLevel,
      1,
      '#add-event-level',
      loader
    );

    await matSliderThumbShouldHaveValue(
      presenter.viewModel.level,
      '#add-event-level-thumb',
      loader
    );

    await matInputShouldHaveValue(
      presenter.viewModel.thoughts,
      '#add-event-thoughts',
      loader
    );

    await matInputShouldHavePlaceholder(
      presenter.viewModel.thoughtsPlaceholder,
      '#add-event-thoughts',
      loader
    );

    /*
    cy.get('#add-event-date').should('have.value', '12/25/2020');

    cy.get('#add-event-time').should('have.value', '10:15');

    cy.get('#add-event-duration').should(
      'have.value',
      presenter.viewModel.durationMinutes
    );

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

     */
  });

  it('should add an event', () => {
    cy.spy(presenter, 'addNewEvent');

    /*
    const select = await loader.getHarness(
      MatSelectHarness.with({ selector: '#add-event-type' })
    );
    console.log(await select.getValueText());

    expect(await select.getValueText()).to.eq('Depression');

    await select.open();

    const bugOption = await select.getOptions({
      isSelected: true,
    });
    console.log(await bugOption.at(0).getText());
    console.log(bugOption);
    */

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

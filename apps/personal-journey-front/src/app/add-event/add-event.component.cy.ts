import { AddEventComponent } from './add-event.component';
import { DummyAddEventPresenter } from '../../tests-utils/presenters/dummy-add-event.presenter';
import {
  AddEventViewModel,
  AddNewEventInputs,
} from '../../adapters/presenters/add-event/add-event.presenter';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import {
  MatSlider,
  MatSliderModule,
  MatSliderThumb,
} from '@angular/material/slider';
import { MatButton } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import * as matUtils from '../../tests-utils/cypress-utils/material-utils.cy';

describe('AddEventComponent', () => {
  let presenter: DummyAddEventPresenter;
  let initialViewModel: AddEventViewModel;
  let fixture: ComponentFixture<AddEventComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    presenter = new DummyAddEventPresenter();
    initialViewModel = presenter.initialViewModel();

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

  it('should initialize with default values', async () => {
    await matUtils.matInputShouldHaveValue(
      initialViewModel.date.toLocaleDateString('fr'),
      '#add-event-date',
      loader
    );

    //TODO
    //await matInputShouldHaveValue('10:15', '#add-event-time');

    await matUtils.matInputShouldHaveValue(
      initialViewModel.durationMinutes.toString(),
      '#add-event-duration',
      loader
    );

    await matUtils.matSelectShouldHaveText(
      AddEventComponent.DEPRESSION_TYPE_TEXT,
      '#add-event-type',
      loader
    );

    await matUtils.matSliderShouldHaveMinMaxStep(
      initialViewModel.minLevel,
      initialViewModel.maxLevel,
      1,
      '#add-event-level',
      loader
    );

    await matUtils.matSliderThumbShouldHaveValue(
      initialViewModel.level,
      '#add-event-level-thumb',
      loader
    );

    await matUtils.matInputShouldHaveValue(
      initialViewModel.thoughts,
      '#add-event-thoughts',
      loader
    );

    await matUtils.matInputShouldHavePlaceholder(
      initialViewModel.thoughtsPlaceholder,
      '#add-event-thoughts',
      loader
    );
  });

  it('should add an event', async () => {
    const addNewEventSpy = cy.stub(presenter, 'addNewEvent');

    await matUtils.openMatSelectAndClickOnOption(
      AddEventComponent.ANXIETY_TYPE_TEXT,
      '#add-event-type',
      loader
    );

    await matUtils.setMatDatePickerInputValueTo(
      '2022-12-10',
      '#add-event-date',
      loader
    );

    /*
    const harness: MyHarness = await loader.getHarness(
      MyHarness.with({ selector: '#add-event-time' })
    );



    await harness.setValue('16:14');    */

    await matUtils.setMatSliderThumbValueTo(
      2,
      '#add-event-level-thumb',
      loader
    );

    await matUtils.setMatInputValueTo('45', '#add-event-duration', loader);

    await matUtils.setMatInputValueTo(
      'Some thoughts',
      '#add-event-thoughts',
      loader
    );

    await matUtils.clickOnMatButton('#add-event-button', loader);

    const expected: AddNewEventInputs = {
      type: 'anxiety',
      date: new Date('2022-12-12'),
      durationMinutes: 45,
      level: 2,
      thoughts: 'Some thoughts',
    };
    expect(addNewEventSpy).to.have.been.calledOnceWith(expected);
  });
});

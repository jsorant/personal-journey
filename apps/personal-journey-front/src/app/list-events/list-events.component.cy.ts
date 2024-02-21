import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventsComponent } from './list-events.component';
import { ListEventsPresenter } from '../../adapters/presenters/list-events.presenter';
import {
  eventViewModel1,
  eventViewModel2,
  eventViewModel3,
  eventWithoutThoughtsViewModel,
} from '../../tests/view-model-events';
import { CommonModule, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { EventViewModel } from '../../adapters/presenters/event-view-model';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatListHarness,
  MatListItemHarness,
} from '@angular/material/list/testing';

class DummyListEventsPresenter implements ListEventsPresenter {
  events: EventViewModel[] = [];

  getEvents(): EventViewModel[] {
    return [...this.events];
  }
}

describe('ListEventsComponent', () => {
  let presenter: DummyListEventsPresenter;
  let fixture: ComponentFixture<ListEventsComponent>;
  let loader: HarnessLoader;

  async function initializeComponentWithEvents(events: EventViewModel[]) {
    presenter = new DummyListEventsPresenter();
    presenter.events = events;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        DatePipe,
      ],
      providers: [
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: 'ListEventsPresenter', useValue: presenter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListEventsComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }

  it('should list no events', async () => {
    await initializeComponentWithEvents([]);

    cy.get('#list-events-empty-label').should('be.visible');
    cy.get('#list-events-empty-label').should(
      'contain.text',
      'No events recorded yet.'
    );
  });

  it('should not display no events if there are events', async () => {
    await initializeComponentWithEvents([eventViewModel1]);

    cy.get('#list-events-empty-label').should('not.exist');
  });

  it('should list many events', async () => {
    await initializeComponentWithEvents([
      eventViewModel1,
      eventViewModel2,
      eventViewModel3,
    ]);

    const harness = await loader.getHarness(
      MatListHarness.with({ selector: '#events-list' })
    );

    const list = await harness.getItems();
    expect(list.length).to.eq(3);
  });

  it('should display events details', async () => {
    await initializeComponentWithEvents([
      eventViewModel1,
      eventViewModel2,
      eventViewModel3,
    ]);

    const harness = await loader.getHarness(
      MatListItemHarness.with({ selector: '#event-0' })
    );

    expect(await harness.hasIcon()).to.be.true;
    expect(await harness.getTitle()).to.eq('Depressive situation');
    expect(await harness.getSecondaryText()).to.contain('Lorem ipsum dolor');
    expect(await harness.getTertiaryText()).to.eq('5 Jan 2022 at 08:50');
  });

  it('should display an event without thoughts', async () => {
    await initializeComponentWithEvents([eventWithoutThoughtsViewModel]);

    const harness = await loader.getHarness(
      MatListItemHarness.with({ selector: '#event-0' })
    );

    expect(await harness.getTitle()).to.be.not.empty;
    expect(await harness.getSecondaryText()).to.be.not.empty;
    expect(await harness.getTertiaryText()).to.be.empty;
  });
});

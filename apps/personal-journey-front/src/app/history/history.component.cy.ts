import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { HistoryPresenter } from '../../adapters/presenters/history/history.presenter';
import {
  eventViewModel1,
  eventViewModel2,
  eventViewModel3,
  eventWithoutThoughtsViewModel,
} from '../../tests-utils/view-model-events';
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

class DummyHistoryPresenter implements HistoryPresenter {
  events: EventViewModel[] = [];

  getEvents(): EventViewModel[] {
    return [...this.events];
  }
}

describe(HistoryComponent.name, () => {
  let presenter: DummyHistoryPresenter;
  let fixture: ComponentFixture<HistoryComponent>;
  let loader: HarnessLoader;

  async function initializeComponentWithEvents(events: EventViewModel[]) {
    presenter = new DummyHistoryPresenter();
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
        { provide: 'HistoryPresenter', useValue: presenter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }

  it('should list no events', async () => {
    await initializeComponentWithEvents([]);

    cy.get('#list-events-empty-label').should('be.visible');
    cy.get('#list-events-empty-label').should(
      'contain.text',
      'Aucun évènement enregistré'
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

  it('should display an event without thoughts', async () => {
    await initializeComponentWithEvents([eventWithoutThoughtsViewModel]);

    const harness = await loader.getHarness(
      MatListItemHarness.with({ selector: '#event-0' })
    );

    expect(await harness.getTitle()).to.be.not.empty;
    expect(await harness.getSecondaryText()).to.be.not.empty;
    expect(await harness.getTertiaryText()).to.be.empty;
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
    expect(await harness.getTitle()).to.eq('Moment dépressif');
    expect(await harness.getSecondaryText()).to.contain('Lorem ipsum dolor');
    console.log(await harness.getTertiaryText());
    expect(await harness.getTertiaryText()).to.eq(
      'mer. 5 janvier 2022  à  08:50'
    );
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriggerThoughtsComponent } from './trigger-thoughts.component';

describe('TriggerThoughtsComponent', () => {
  let component: TriggerThoughtsComponent;
  let fixture: ComponentFixture<TriggerThoughtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerThoughtsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TriggerThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

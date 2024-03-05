import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriggerNeedsComponent } from './trigger-needs.component';

describe('TriggerNeedsComponent', () => {
  let component: TriggerNeedsComponent;
  let fixture: ComponentFixture<TriggerNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerNeedsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TriggerNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

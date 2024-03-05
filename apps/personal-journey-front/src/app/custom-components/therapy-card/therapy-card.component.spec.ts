import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TherapyCardComponent } from './therapy-card.component';

describe('TherapyCardComponent', () => {
  let component: TherapyCardComponent;
  let fixture: ComponentFixture<TherapyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

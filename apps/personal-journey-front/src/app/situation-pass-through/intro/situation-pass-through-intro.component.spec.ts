import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SituationPassThroughIntroComponent } from './situation-pass-through-intro.component';

describe('SituationPassThroughIntroComponent', () => {
  let component: SituationPassThroughIntroComponent;
  let fixture: ComponentFixture<SituationPassThroughIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituationPassThroughIntroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SituationPassThroughIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

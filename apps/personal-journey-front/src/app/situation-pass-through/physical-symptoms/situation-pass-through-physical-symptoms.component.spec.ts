import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SituationPassThroughPhysicalSymptomsComponent } from './situation-pass-through-physical-symptoms.component';

describe('SituationPassThroughPhysicalSymptomsComponent', () => {
  let component: SituationPassThroughPhysicalSymptomsComponent;
  let fixture: ComponentFixture<SituationPassThroughPhysicalSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituationPassThroughPhysicalSymptomsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SituationPassThroughPhysicalSymptomsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SituationPassThroughComponent } from './situation-pass-through.component';

describe(SituationPassThroughComponent.name, () => {
  let component: SituationPassThroughComponent;
  let fixture: ComponentFixture<SituationPassThroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituationPassThroughComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SituationPassThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

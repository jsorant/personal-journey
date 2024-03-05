import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysicalSymptomsComponent } from './physical-symptoms.component';

describe('PhysicalSymptomsComponent', () => {
  let component: PhysicalSymptomsComponent;
  let fixture: ComponentFixture<PhysicalSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalSymptomsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhysicalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

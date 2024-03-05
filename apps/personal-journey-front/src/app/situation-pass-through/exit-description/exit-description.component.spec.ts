import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExitDescriptionComponent } from './exit-description.component';

describe('ExitDescriptionComponent', () => {
  let component: ExitDescriptionComponent;
  let fixture: ComponentFixture<ExitDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExitDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

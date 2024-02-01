import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerCardComponent } from './power-card.component';

describe('PowerCardComponent', () => {
  let component: PowerCardComponent;
  let fixture: ComponentFixture<PowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

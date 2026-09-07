import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraticComponent } from './quadratic';

describe('QuadraticComponent', () => {
  let component: QuadraticComponent;
  let fixture: ComponentFixture<QuadraticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraticComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

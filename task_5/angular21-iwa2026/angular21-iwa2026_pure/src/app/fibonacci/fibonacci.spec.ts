import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibonacciComponent } from './fibonacci';

describe('FibonacciComponent', () => {
  let component: FibonacciComponent;
  let fixture: ComponentFixture<FibonacciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FibonacciComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FibonacciComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fibonacci.html',
  styleUrl: './fibonacci.css',
})
export class FibonacciComponent {
  position = signal<number | null>(null);
  result = signal<number | null>(null);
  error = signal<string>('');
  isCalculating = signal(false);

  calculateFibonacci(): void {
    this.error.set('');
    this.result.set(null);

    const pos = this.position();

    if (pos === null || pos === undefined) {
      this.error.set('Please enter a position');
      return;
    }

    if (!Number.isInteger(pos) || pos < 0) {
      this.error.set('Please enter a non-negative integer');
      return;
    }

    if (pos > 100) {
      this.error.set('Position must be 100 or less');
      return;
    }

    try {
      this.isCalculating.set(true);
      const fibResult = this.calculateFibonacciNumber(pos);
      this.result.set(fibResult);
    } finally {
      this.isCalculating.set(false);
    }
  }

  private calculateFibonacciNumber(n: number): number {
    if (n <= 1) {
      return n;
    }

    let a = 0;
    let b = 1;
    let c = 0;

    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }

    return b;
  }

  reset(): void {
    this.position.set(null);
    this.result.set(null);
    this.error.set('');
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.calculateFibonacci();
    }
  }
}

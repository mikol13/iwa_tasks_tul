import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quadratic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quadratic.html',
  styleUrl: './quadratic.css',
})
export class QuadraticComponent {
  // Input coefficients
  a = signal<number | null>(null);
  b = signal<number | null>(null);
  c = signal<number | null>(null);

  // Results
  delta = signal<number | null>(null);
  roots = signal<number[] | null>(null);
  resultMessage = signal<string>('');
  error = signal<string>('');
  isCalculating = signal(false);

  /**
   * Solves the quadratic equation ax² + bx + c = 0
   */
  solve(): void {
    this.error.set('');
    this.delta.set(null);
    this.roots.set(null);
    this.resultMessage.set('');

    // Validate inputs
    const coeffA = this.a();
    const coeffB = this.b();
    const coeffC = this.c();

    if (coeffA === null || coeffB === null || coeffC === null) {
      this.error.set('Please enter all three coefficients');
      return;
    }

    if (!Number.isFinite(coeffA) || !Number.isFinite(coeffB) || !Number.isFinite(coeffC)) {
      this.error.set('Please enter valid numbers');
      return;
    }

    try {
      this.isCalculating.set(true);
      this.findZeroPlaces(coeffA, coeffB, coeffC);
    } finally {
      this.isCalculating.set(false);
    }
  }

  /**
   * Finds the roots of the quadratic equation
   * Handles special cases where a=0 (linear equation)
   */
  private findZeroPlaces(a: number, b: number, c: number): void {
    // Special case: a = 0 (not a quadratic, but linear or constant)
    if (a === 0) {
      if (b === 0) {
        if (c === 0) {
          this.resultMessage.set('Every x is a solution (infinite solutions)');
          this.roots.set([]);
        } else {
          this.resultMessage.set('No solution exists');
          this.roots.set([]);
        }
      } else {
        // Linear equation: bx + c = 0
        const root = -c / b;
        this.resultMessage.set('Linear equation (a=0): One solution');
        this.roots.set([root]);
      }
      return;
    }

    // Calculate discriminant (delta)
    const discriminant = b * b - 4 * a * c;
    this.delta.set(discriminant);

    if (discriminant > 0) {
      // Two distinct real roots
      const sqrtDelta = Math.sqrt(discriminant);
      const root1 = (-b + sqrtDelta) / (2 * a);
      const root2 = (-b - sqrtDelta) / (2 * a);
      this.resultMessage.set('Two distinct real roots');
      this.roots.set([root1, root2]);
    } else if (discriminant === 0) {
      // One repeated real root
      const root = -b / (2 * a);
      this.resultMessage.set('One repeated real root (equal roots)');
      this.roots.set([root]);
    } else {
      // No real roots (complex roots)
      this.resultMessage.set('No real roots (complex roots exist)');
      this.roots.set([]);
    }
  }

  /**
   * Resets all inputs and results
   */
  reset(): void {
    this.a.set(null);
    this.b.set(null);
    this.c.set(null);
    this.delta.set(null);
    this.roots.set(null);
    this.resultMessage.set('');
    this.error.set('');
  }

  /**
   * Handle Enter key press to solve
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.solve();
    }
  }
}

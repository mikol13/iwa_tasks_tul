import { Component, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-calculator',
  imports: [
    FormField,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  // Angular signals approach shown in the slides.
  operationDataInputsModel = signal({
    a: 0,
    b: 0,
  });

  operationDataInputsForm = form(this.operationDataInputsModel);

  protected readonly additionResult = computed(() => {
    const data = this.operationDataInputsModel();
    return data.a + data.b;
  });

  // Event-binding approach shown in the slides.
  result: number | null = null;
  errorMessage = '';

  addition(c: number, d: number): void {
    this.showResult(c + d, 'addition');
  }

  subtraction(c: number, d: number): void {
    this.showResult(c - d, 'subtraction');
  }

  multiplication(c: number, d: number): void {
    this.showResult(c * d, 'multiplication');
  }

  division(c: number, d: number): void {
    if (d === 0) {
      this.result = null;
      this.errorMessage = 'Cannot divide by zero.';
      return;
    }

    this.showResult(c / d, 'division');
  }

  private showResult(value: number, operation: string): void {
    this.errorMessage = '';
    this.result = value;
    console.log(`${operation} operation: result=${value}`);
  }
}


